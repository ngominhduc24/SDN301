import { Form, Input } from "antd"
import { useEffect, useState } from "react"
import FlInput from "src/components/FloatingLabel/Input"
import CustomModal from "src/components/Modal/CustomModal"
import Button from "src/components/MyButton/Button"
import BookingService from "src/services/BookingService"

const ModalUpdateInsertDocFolder = ({ open, onCancel, onOk }) => {
  const [formDocFolder] = Form.useForm()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!!open?.DocumentFolderID && !!open?.isEdit)
      formDocFolder.setFieldsValue(open)
  }, [open?.DocumentFolderID])

  const handleInsertUpdateDocFolder = async () => {
    try {
      setLoading(true)
      const values = await formDocFolder.validateFields()
      const res =
        !!open?.DocumentFolderID && !!open?.isEdit
          ? await BookingService.updateDocumentFolder({
            ...values,
            DocumentFolderID: open?.DocumentFolderID,
            DocumentParentID: open?.DocumentParentID,
            Level: open?.Level,
            BookingID: open?.BookingID,
          })
          : await BookingService.insertDocumentFolder({
            ...values,
            BookingID: open?.BookingID,
            Level: open?.Level ? open?.Level + 1 : 1,
            DocumentParentID: open?.DocumentFolderID
              ? open?.DocumentFolderID
              : undefined,
          })
      if (res?.isError) return
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
      title="Thêm thư mục tài liệu"
      footer={
        <div className="d-flex-end">
          <Button
            btntype="primary"
            onClick={() => handleInsertUpdateDocFolder()}
            loading={loading}
          >
            Lưu
          </Button>
        </div>
      }
    >
      <Form form={formDocFolder}>
        {
          (!!open?.Level && open?.Level !== 1) &&
          <div>
            <div className="mb-12">
              <b>Tên thư mục</b>
            </div>
            <Form.Item
              name="DocumentName"
              rules={[{ required: true, message: "Vui lòng nhập tên thư mục" }]}
            >
              <FlInput isRequired label="Tên thư mục" />
            </Form.Item>
          </div>
        }
        <div className="mb-12">
          <b>Chi tiết tài liệu</b>
        </div>
        <Form.Item name="Description">
          <FlInput label="Chi tiết thư mục" />
        </Form.Item>
      </Form>
    </CustomModal>
  )
}

export default ModalUpdateInsertDocFolder
