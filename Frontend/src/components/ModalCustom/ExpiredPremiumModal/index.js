import { Button } from "antd"
import ModalCustom from ".."

const ExpiredPremiumModal = ({ open, onCancel }) => {
  return (
    <ModalCustom
      open={open}
      onCancel={onCancel}
      title={<div className="text-center">THÔNG BÁO</div>}
      width="40vw"
      footer={
        <div className="d-flex-end">
          <Button
            className="greendBorder small"
            onClick={() => onCancel()}
          >
            ĐÓNG
          </Button>
        </div>
      }
    >
      <p className="fs-18 fw-600">Gói Premium của bạn đã hết hạn. Hãy mua Premium để có thêm nhiều trải nghiệm đọc truyện.</p>
    </ModalCustom>
  )
}

export default ExpiredPremiumModal