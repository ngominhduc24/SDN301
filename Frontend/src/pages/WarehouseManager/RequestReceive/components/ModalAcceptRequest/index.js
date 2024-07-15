import {
  Col,
  Form,
  Row,
  InputNumber,
  Modal,
  Card,
  Typography,
  Input,
} from "antd"
import Button from "src/components/MyButton/Button"
import { useEffect, useState } from "react"
import Notice from "src/components/Notice"
import CB1 from "src/components/Modal/CB1"
import WarehouseManagerService from "src/services/WarehouseManagerService"
import STORAGE from "src/lib/storage"

const { TextArea } = Input

const ModalAcceptRequest = ({ visible, onCancel, request, onOk }) => {
  const [loading, setLoading] = useState(false)
  const [note, setNote] = useState("")
  const [discount, setDiscount] = useState(0)
  const [shippingCharge, setShippingCharge] = useState(0)
  const { Title, Text } = Typography
  const warehouseManagerId = localStorage.getItem(STORAGE.USER_ID)

  const updateStatusRequest = async () => {
    try {
      setLoading(true)
      const body = {
        status: "accepted",
      }
      console.log(body)
      const response = await WarehouseManagerService.updateStatusRequest(
        request?._id,
        body,
      )
      if (response?.isError) {
        console.error("Error creating invoice:", response.message)
        return
      }
      onOk()
      onCancel()
    } catch (error) {
      console.error("Error in createInvoice:", error)
    } finally {
      setLoading(false)
    }
  }

  const createInvoice = async () => {
    try {
      setLoading(true)
      const invoiceData = {
        from: "6673f4e2269dee716af9db92",
        to: request?.from?._id,
        details: request?.details?.map(item => ({
          productId: item?.productId?._id,
          quantity: item?.quantity,
        })),
        note: note,
        discount: discount,
        shipping_charge: shippingCharge,
        created_by: warehouseManagerId,
      }
      console.log(invoiceData)
      const response = await WarehouseManagerService.createInvoice(invoiceData)
      if (response?.isError) {
        console.error("Error creating invoice:", response.message)
        return
      }
      onOk()
      onCancel()
      Notice({
        isSuccess: true,
        msg: "Tạo hóa đơn thành công",
      })
    } catch (error) {
      console.error("Error in createInvoice:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      title="Tạo hóa đơn từ yêu cầu"
      width="70vw"
      footer={
        <div className="lstBtn d-flex-sb">
          <div className="lstBtn-right d-flex-end">
            <Button
              btntype="third"
              className="ml-8 mt-12 mb-12"
              loading={loading}
              onClick={() => {
                CB1({
                  title: "Bạn chắc chắn muốn tạo đơn hàng này không?",
                  icon: "warning-usb",
                  okText: "Có",
                  cancelText: "Không",
                  onOk: close => {
                    updateStatusRequest()
                    createInvoice()
                    close()
                  },
                })
              }}
            >
              Xác nhận tạo đơn hàng từ yêu cầu
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
      <Card>
        <Form layout="vertical">
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Ghi chú">
                <TextArea
                  rows={4}
                  placeholder="Nhập ghi chú"
                  value={note}
                  onChange={e => setNote(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Chiết khấu (%)">
                <InputNumber
                  min={0}
                  placeholder="Chiết khấu"
                  style={{ width: "100%" }}
                  value={discount}
                  onChange={value => setDiscount(value)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Phí vận chuyển">
                <InputNumber
                  min={0}
                  style={{ width: "100%" }}
                  value={shippingCharge}
                  onChange={value => setShippingCharge(value)}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </Modal>
  )
}

export default ModalAcceptRequest
