import { Col, Row, Modal } from "antd"
import Button from "src/components/MyButton/Button"

const ModalViewStore = ({ visible, onCancel, store }) => {
  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      title="Chi tiết cửa hàng"
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
                  <strong>Tên cửa hàng:</strong> {store?.name}
                </Col>
                <Col span={24}>
                  <strong>Địa chỉ:</strong> {store?.location}
                </Col>
                <Col span={24}>
                  <strong>Số điện thoại:</strong> {store?.phone}
                </Col>
                <Col span={24}>
                  <strong>Email:</strong> {store?.email}
                </Col>
                <Col span={24}>
                  <strong>Quản lý:</strong> {store?.manager}
                </Col>
              </Row>
            </Col>
            <Col span={12} className="mt-40">
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <strong>Trạng thái:</strong> {store?.status}
                </Col>
                <Col span={24}>
                  <strong>Ngày tạo:</strong> {store?.createdAt}
                </Col>
                <Col span={24}>
                  <strong>Ngày cập nhật:</strong> {store?.updatedAt}
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </div>
    </Modal>
  )
}

export default ModalViewStore

