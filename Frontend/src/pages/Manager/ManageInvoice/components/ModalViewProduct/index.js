import { Col, Row, Modal, Tooltip } from "antd"
import Button from "src/components/MyButton/Button"

const ModalViewProduct = ({ visible, onCancel, product }) => {
  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      title="Chi tiết sản phẩm"
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
        <Row gutter={[16, 16]}>
          {/* Product Details */}
          <Col span={12} className="mt-40">
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <strong>Tên sản phẩm:</strong> {product?.product?.name}
              </Col>
              <Col span={24}>
                <strong>Mô tả:</strong>{" "}
                <Tooltip title={product?.product?.description}>
                  <span>
                    {product?.product?.description?.length > 100
                      ? `${product?.product?.description.substring(0, 100)}...`
                      : product?.product?.description}
                  </span>
                </Tooltip>
              </Col>
              <Col span={24}>
                <strong>Số lượng:</strong> {product?.quantity}
              </Col>
              <Col span={24}>
                <strong>Trạng thái:</strong>{" "}
                <span
                  className={
                    product?.product?.status === "active"
                      ? "blue-text"
                      : "red-text"
                  }
                >
                  {product?.product?.status === "active"
                    ? "Đang hoạt động"
                    : "Dừng hoạt động"}
                </span>
              </Col>
            </Row>
          </Col>
          {/* Product Image */}
          <Col span={12} style={{ textAlign: "center" }}>
            <img
              src={product?.product?.image}
              alt="product"
              style={{ width: "80%", height: "auto", maxHeight: "400px" }}
            />
          </Col>
        </Row>
      </div>
    </Modal>
  )
}

export default ModalViewProduct

