import CustomModal from "src/components/Modal/CustomModal"
import ContentViewPDF from "src/components/Modal/ModalViewPDF/Content"
import Button from "src/components/MyButton/Button"

const ModalViewPdf = ({ open, onCancel }) => {
  return (
    <CustomModal
      open={open}
      onCancel={onCancel}
      title={`Tài liệu ${open?.FileName}`}
      footer={
        <div className="d-flex-end">
          <Button btntype="primary" onClick={() => onCancel()}>
            Đóng
          </Button>
        </div>
      }
    >
      {!!open && <ContentViewPDF fileUrl={open?.FileUrl} />}
    </CustomModal>
  )
}

export default ModalViewPdf

