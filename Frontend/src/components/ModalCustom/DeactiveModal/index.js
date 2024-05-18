import { useDispatch } from "react-redux"
import ModalCustom from ".."
import { useNavigate } from "react-router-dom"
import globalSlice from "src/redux/globalSlice"
import { Button } from "antd"
import socket from "src/utils/socket"

const DeactiveModal = ({ open, onCancel }) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    dispatch(globalSlice.actions.setUser({}))
    socket.disconnect()
    onCancel()
    navigate('/')
  }

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
            onClick={() => handleLogout()}
          >
            ĐÓNG
          </Button>
        </div>
      }
    >
      <p className="fs-18 fw-600">Tài khoản của bạn bị cấm vì vi phạm các điều khoản và quyền riêng tư!</p>
    </ModalCustom>
  )
}

export default DeactiveModal