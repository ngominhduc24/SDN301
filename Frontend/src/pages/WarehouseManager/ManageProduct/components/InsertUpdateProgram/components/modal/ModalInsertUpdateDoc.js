import { Checkbox, Form, Input, Select, Upload, message } from "antd"
import { useEffect, useState } from "react"
import FlInput from "src/components/FloatingLabel/Input"
import FlSelect from "src/components/FloatingLabel/Select"
import { RedStar } from "src/components/FloatingLabel/styled"
import CustomModal from "src/components/Modal/CustomModal"
import Button from "src/components/MyButton/Button"
import SvgIcon from "src/components/SvgIcon"
import TinyEditor from "src/components/TinyEditor"
import { getRegexNumber } from "src/lib/stringsUtils"
import { normFile } from "src/lib/utils"
import BookingService from "src/services/BookingService"
import FileService from "src/services/FileService"

const { Option } = Select

const ModalInsertUpdateDoc = ({
  open,
  onCancel,
  onOk,
  documents,
}) => {
  const [formDoc] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [isOnline, setIsOnline] = useState(false)
  const [deleteDocs, setDeleteDocs] = useState([])
  const [roleGroupDocuments, setRoleGroupDocuments] = useState([])

  const handleBeforeUpload = async (file, type) => {
    let isAllowedType
    if (type === "app" || type === "share") {
      isAllowedType = file.type.includes("application")
      if (!isAllowedType) {
        message.error("Yêu cầu chọn file tài liệu (doc, docx, pdf, xls, xlsx)")
      }
    } else if (type === "audio") {
      isAllowedType = file.type.includes("audio")
      if (!isAllowedType) {
        message.error("Yêu cầu chọn file audio (mpeg, mp3, wav)")
      }
    }
    return isAllowedType ? false : Upload.LIST_IGNORE
  }

  const getListRoleGroupDocuments = async () => {
    try {
      setLoading(true)
      const res = await BookingService.getListRoleGroupDocument({
        TextSearch: "",
      })
      if (res?.isError) return
      setRoleGroupDocuments(res?.Object?.ltData)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getListRoleGroupDocuments()
  }, [])

  useEffect(() => {
    if (open?.Type === 2) {
      setIsOnline(open?.IsOnline)
      formDoc.setFieldsValue({
        ...open,
        DocumentFolderID: open?.DocumentParentID,
        FileApp: open?.FileApp?.map(i => ({
          url: i?.FileUrl,
          name: i?.FileName,
          ObjectFileID: i?.ObjectFileID,
        })),
        FileShare: open?.FileShare?.map(i => ({
          url: i?.FileUrl,
          name: i?.FileName,
          ObjectFileID: i?.ObjectFileID,
        })),
        FileAudio: open?.FileAudio?.map(i => ({
          url: i?.FileUrl,
          name: i?.FileName,
          ObjectFileID: i?.ObjectFileID,
        })),
      })
    } else if (open?.Type === 1) {
      formDoc.setFieldValue("DocumentFolderID", open?.DocumentFolderID)
    }
  }, [open])

  const handleUploadFile = async listFileForms => {
    for (const item of listFileForms) {
      const files = item?.file?.filter(i => !i?.url)
      if (!!deleteDocs.length) {
        let formData = new FormData()
        deleteDocs.map(i => formData.append("DeleteFileList", i?.ObjectFileID))
        const res = await FileService.uploadFileList(formData)
      }
      if (!!files && !!files.length) {
        let formData = new FormData()
        formData.append("GuidID", item?.id)
        item.file.forEach(i => {
          if (!i?.url)
            return formData.append("InsertFileList", i?.originFileObj)
        })
        const res = await FileService.uploadFileList(formData)
      }
    }
  }

  const handleInsertUpdateDoc = async () => {
    try {
      setLoading(true)
      const values = await formDoc.validateFields()
      const { FileApp, FileShare, FileAudio, SortOrder, ...remainValues } =
        values
      const body = {
        ...remainValues,
        BookingID: open?.BookingID,
        isOnline: isOnline,
        SortOrder: !!SortOrder ? +SortOrder : undefined,
      }
      const res = !!open?.isEdit
        ? await BookingService.updateDocument({
          ...body,
          DocumentID: open?.DocumentID,
        })
        : await BookingService.insertDocument(body)
      if (res?.isError) return
      const listFileForms = []
      Object.keys(values).forEach(item => {
        if (item.includes("File")) {
          listFileForms.push({
            id: !!open?.isEdit ? open[`${item}ID`] : res?.Object[item],
            name: item,
            file: values[item],
          })
        }
      })
      await handleUploadFile(listFileForms)
      onOk()
      onCancel()
    } finally {
      setLoading(false)
    }
  }

  return (
    <CustomModal
      open={open}
      onCancel={onCancel}
      title="Thêm tài liệu"
      footer={
        <div className="d-flex-end">
          <Button
            btntype="primary"
            onClick={() => handleInsertUpdateDoc()}
            loading={loading}
          >
            Lưu
          </Button>
        </div>
      }
    >
      <Form form={formDoc}>
        <Form.Item
          name="DocumentName"
          className="mb-24"
          rules={[{ required: true, message: "Vui lòng nhập tên tài liệu" }]}
        >
          <FlInput isRequired label="Tên tài liệu" />
        </Form.Item>

        <Form.Item name="Content" className="mb-24">
          <Input.TextArea placeholder="Nội dung" />
          {/* <TinyEditor /> */}
        </Form.Item>

        <Form.Item
          name="FileApp"
          className="mb-24"
          rules={[
            {
              required: formDoc.getFieldValue("FileApp") ? false : true,
              message: "Hãy chọn file tải lên",
            },
          ]}
          getValueFromEvent={normFile}
          valuePropName="fileList"
        >
          <Upload.Dragger
            beforeUpload={file => handleBeforeUpload(file, "app")}
            accept=".doc, .docx, .pdf, .xls, .xlsx"
            id="FileApp"
            className="pointer"
            multiple="true"
            onRemove={file => {
              if (!!file?.ObjectFileID) {
                setDeleteDocs([...deleteDocs, file])
              }
            }}
          >
            <div className="d-flex-center" style={{ height: "100%" }}>
              <div className="mr-8">
                <SvgIcon name="cloud-upload" />
              </div>
              <div>
                <span>
                  File hiện trên app <RedStar>*</RedStar>
                </span>
              </div>
            </div>
            <div>
              Hỗ trợ up lên file ".doc, .docx, .pdf, .xls, .xlsx". Dung lượng
              tối đa là 100MB, bắt buộc
            </div>
          </Upload.Dragger>
        </Form.Item>

        <Form.Item
          name="FileShare"
          className="mb-24"
          getValueFromEvent={normFile}
          valuePropName="fileList"
        >
          <Upload.Dragger
            beforeUpload={file => handleBeforeUpload(file, "share")}
            id="FileShare"
            accept=".doc, .docx, .pdf, .xls, .xlsx"
            className="pointer"
            multiple="true"
            onRemove={file => {
              if (!!file?.ObjectFileID) {
                setDeleteDocs([...deleteDocs, file])
              }
            }}
          >
            <div className="d-flex-center" style={{ height: "100%" }}>
              <div className="mr-8">
                <SvgIcon name="cloud-upload" />
              </div>
              <div>
                <span>File chia sẻ</span>
              </div>
            </div>
            <div>
              Hỗ trợ up lên file ".doc, .docx, .pdf, .xls, .xlsx". Dung lượng
              tối đa là 100MB
            </div>
          </Upload.Dragger>
        </Form.Item>

        <Form.Item
          name="FileAudio"
          className="mb-24"
          getValueFromEvent={normFile}
          valuePropName="fileList"
        >
          <Upload.Dragger
            beforeUpload={file => handleBeforeUpload(file, "audio")}
            previewFile={true}
            id="FileAudio"
            className="pointer"
            accept="audio/*"
            showUploadList={{ showPreviewIcon: true, showRemoveIcon: true }}
            multiple="true"
            onRemove={file => {
              if (!!file?.ObjectFileID) {
                setDeleteDocs([...deleteDocs, file])
              }
            }}
          >
            <div className="d-flex-center" style={{ height: "100%" }}>
              <div className="mr-8">
                <SvgIcon name="cloud-upload" />
              </div>
              <div>
                <span>File audio</span>
              </div>
            </div>
            <div>
              Hỗ trợ up lên file ".mp3, .wav". Dung lượng tối đa là 100MB
            </div>
          </Upload.Dragger>
        </Form.Item>

        <Form.Item name="TypeDocument" className="mb-24">
          <FlInput label="Loại tài liệu" />
        </Form.Item>

        <Form.Item
          name="DocumentFolderID"
          rules={[{ required: true, message: "Hãy chọn thư mục" }]}
        >
          <FlSelect
            label="Thư mục"
            isRequired
            disabled={!!open?.DocumentFolderID ? true : false}
          >
            {documents.map(
              i =>
                i?.Type === 1 && (
                  <Option key={i?.DocumentFolderID} value={i?.DocumentFolderID}>
                    {i?.DocumentName}
                  </Option>
                ),
            )}
          </FlSelect>
        </Form.Item>

        <Form.Item
          name="DocumentRoleGroupID"
          rules={[{ required: true, message: "Hãy chọn thư mục" }]}
        >
          <FlSelect label="Chọn nhóm" isRequired>
            {roleGroupDocuments.map(i => (
              <Option
                key={i?.DocumentRoleGroupID}
                value={i?.DocumentRoleGroupID}
              >
                {i?.DocumentRoleGroupName}
              </Option>
            ))}
          </FlSelect>
        </Form.Item>

        <Form.Item
          name="SortOrder"
          className="mb-24"
          rules={[
            { pattern: getRegexNumber(), message: "Bạn phải nhập vào 1 số" },
          ]}
        >
          <FlInput label="STT hiển thị" />
        </Form.Item>

        <Checkbox
          className="mb-8"
          checked={!!isOnline}
          onChange={e => setIsOnline(e.target.checked)}
        >
          Online
        </Checkbox>
      </Form>
    </CustomModal>
  )
}

export default ModalInsertUpdateDoc
