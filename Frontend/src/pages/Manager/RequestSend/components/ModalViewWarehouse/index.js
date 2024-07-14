import { Col, Row, Modal } from "antd"
import Button from "src/components/MyButton/Button"

const ModalViewWarehouse = ({ visible, onCancel, warehouse }) => {
  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      title="Chi tiết kho"
      width="70vw"
      footer={
        <div className="lstBtn d-flex-sb">
          <div className="lstBtn-right d-flex-end">
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
      <div className="mr-16 ml-16 flex">
        <Col offset={4}>
          <Row gutter={[16, 16]}>
            <Col span={12} className="mt-40">
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <strong>Tên kho:</strong> {warehouse?.name}
                </Col>
                <Col span={24}>
                  <strong>Địa chỉ:</strong> {warehouse?.location}
                </Col>
                <Col span={24}>
                  <strong>Số điện thoại:</strong> {warehouse?.phone}
                </Col>
                <Col span={24}>
                  <strong>Email:</strong> {warehouse?.email}
                </Col>
                <Col span={24}>
                  <strong>Quản lý:</strong> {warehouse?.manager}
                </Col>
              </Row>
            </Col>
            <Col span={12} className="mt-40">
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <strong>Loại kho:</strong> {warehouse?.inventoryType}
                </Col>
                <Col span={24}>
                  <strong>Trạng thái:</strong> {warehouse?.status}
                </Col>
                <Col span={24}>
                  <strong>Ngày tạo:</strong> {warehouse?.createdAt}
                </Col>
                <Col span={24}>
                  <strong>Ngày cập nhật:</strong> {warehouse?.updatedAt}
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </div>
    </Modal>
  )
}

export default ModalViewWarehouse

