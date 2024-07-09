import { Col, Row, Modal, Tooltip, Input, Select } from "antd"
import Button from "src/components/MyButton/Button"
import { useEffect, useState } from "react"
import Notice from "src/components/Notice"
import CB1 from "src/components/Modal/CB1"
import ManagerService from "src/services/ManagerService"
const { TextArea } = Input
const { Option } = Select

const ModalNoteStatus = ({ visible, onCancel, invoice, onOk }) => {
  const [loading, setLoading] = useState(false)
  const [cancelReason, setCancelReason] = useState("")
  const fixedReasons = [
    "Không đúng số lượng sản phẩm",
    "Sản phẩm lỗi",
    "Đổi địa điểm cửa hàng đến",
    "Trong quá trình giao hàng xảy ra lỗi",
    "Lý do khác",
  ]

  const cancelInvoice = async () => {
    try {
      setLoading(true)
      const body = {
        status: "cancelled",
        note: "/ Lý do hủy đơn bên kho: " + cancelReason,
      }
      console.log(body)
      const response = await ManagerService.updateInfoInvoice(
        invoice?._id,
        body,
      )
      if (response?.isError) {
        console.error("Error creating invoice:", response.message)
        return
      }
      onOk()
      onCancel()
      Notice({
        isSuccess: true,
        msg: "Hủy đơn hàng thành công",
      })
    } catch (error) {
      console.error("Error in createInvoice:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleReasonChange = value => {
    setCancelReason(value)
  }

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      title="Lý do hủy đơn"
      width="70vw"
      footer={
        <div className="lstBtn d-flex-sb">
          <div className="lstBtn-right d-flex-end">
            <Button
              btntype="danger"
              className="ml-8 mt-12 mb-12"
              loading={loading}
              onClick={() => {
                CB1({
                  title: "Bạn chắc chắn muốn hủy đơn hàng này không?",
                  icon: "warning-usb",
                  okText: "Có",
                  cancelText: "Không",
                  onOk: close => {
                    cancelInvoice()
                    close()
                  },
                })
              }}
            >
              Hủy Đơn Hàng
            </Button>
            <Button
              btntype="third"
              className="ml-8 mt-12 mb-12"
              onClick={onCancel}
            >
              Đóng
            </Button>
          </div>
        </div>
      }
    >
      <Row gutter={16} className="mr-12 ml-12">
        <Col span={24}>
          <Select
            style={{ width: "100%", marginBottom: 16 }}
            placeholder="Chọn lý do hủy đơn"
            onChange={handleReasonChange}
          >
            {fixedReasons.map(reason => (
              <Option key={reason} value={reason}>
                {reason}
              </Option>
            ))}
          </Select>
        </Col>
        <Col span={24}>
          <TextArea
            rows={4}
            placeholder="Nhập lý do hủy đơn"
            value={cancelReason}
            onChange={e => setCancelReason(e.target.value)}
          />
        </Col>
      </Row>
    </Modal>
  )
}

export default ModalNoteStatus
