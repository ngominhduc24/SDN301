import { Button, Result } from "antd"
import ModalCustom from "../ModalCustom"

const ExpiredPremium = ({ open, onCancel }) => {

  return (
    <ModalCustom
      open={open}
      onCancel={onCancel}
      title="Thông báo hết hạn Premium"
    >
      <Result
        title="Gói Premium của bạn đã hết hạn"
        extra={
          <Button
            type="primary"
            onClick={() => onCancel()}
          >
            Trờ về trang chủ
          </Button>
        }
      />
    </ModalCustom>
  )
}

export default ExpiredPremium