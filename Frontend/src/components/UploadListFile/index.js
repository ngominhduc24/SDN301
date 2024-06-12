import { Upload } from "antd"
import SvgIcon from "src/components/SvgIcon"

function UploadListFile({ getFileList, ...props }) {
  const uploadFileProps = {
    name: "file",
    multiple: true,
    onChange(info) {
      getFileList(info.fileList)
    },
    beforeUpload() {
      return false
    },
  }

  return (
    <Upload.Dragger {...uploadFileProps} {...props}>
      <p className="d-flex justify-content-center">
        <SvgIcon name="cloud-upload" />
        <span style={{ marginLeft: 8 }}>
          Kéo thả file đính kèm hoặc Click để
        </span>
        <span style={{ color: "#0747A6", marginLeft: "5px", fontSize: 15 }}>
          Chọn file
        </span>
      </p>
    </Upload.Dragger>
  )
}

export default UploadListFile
