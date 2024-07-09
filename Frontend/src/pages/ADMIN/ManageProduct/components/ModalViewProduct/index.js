import { Col, Modal, Row, Tooltip } from "antd"
import moment from "moment"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import CB1 from "src/components/Modal/CB1"
import CustomModal from "src/components/Modal/CustomModal"
import Button from "src/components/MyButton/Button"
import Notice from "src/components/Notice"
import InsertUpdateProduct from "../InsertUpdateProduct"

const ModalViewProduct = ({ open, onCancel, onOk, data }) => {
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [openInsertUpdateProduct, setOpenInsertUpdateProduct] = useState(false)
  
  const [pagination, setPagination] = useState({
    PageSize: 10,
    CurrentPage: 1,
    TextSearch: "",
    ApproveStatus: 0,
    Status: 0,
  })

  useEffect(() => {}, [pagination])

  const renderFooter = () => (
    <div className="lstBtn-right d-flex-end">
      <Button btntype="primary" onClick={() => handleInsertUpdateProducts()}>
        Chỉnh sửa
      </Button>
      <Button
        btntype="primary"
        onClick={() => {
          setOpenInsertUpdateProduct(false)
        }}
      >
        Đóng
      </Button>
    </div>
  )

  const showDeleteConfirmation = record => {
    CB1({
      record,
      title: `Phòng họp đang có chương trình họp sắp hoặc đang diễn ra, bạn chắc chắn muốn xóa?`,
      icon: "warning-usb",
      okText: "Có",
      cancelText: "Không",
      onOk: async close => {
        // await handleDeleteBooking(record)
        close()
      },
    })
  }
  const handleInsertUpdateProducts = async () => {
    setOpenInsertUpdateProduct(true)
  }
  return (
    // <CustomModal
    //   open={open}
    //   onCancel={onCancel}
    //   title="Chi tiết sản phẩm"
    //   width="70vw"
    //   footer={renderFooter()}
    // >
    //   <div className="d-flex-center">
    //     <Row>
    //       <Col span={12}>
    //         <Row>
    //           <Col span={9}>
    //             <div className="mb-10">
    //               <strong>Tên sản phẩm: </strong>
    //             </div>
    //           </Col>
    //           <Col span={15}>
    //             <div>{data?.name}</div>
    //           </Col>
              
    //           <Col span={9}>
    //             <div className="mb-10">
    //               <strong>Mô tả: </strong>
    //             </div>
    //           </Col>
    //           <Col span={15}>
    //             <div>{data?.description}</div>
    //           </Col>
    //           <Col span={9}>
    //             <div className="mb-10">
    //               <strong>Giá: </strong>
    //             </div>
    //           </Col>
    //           <Col span={15}>
    //             <div>{data?.price}</div>
    //           </Col>
    //           <Col span={9}>
    //             <div className="mb-10">
    //               <strong>Phân loại: </strong>
    //             </div>
    //           </Col>
    //           <Col span={15}>
    //             <div>{data?.categoryId}</div>
    //           </Col>
    //           <Col span={9}>
    //             <div className="mb-10">
    //               <strong>Ảnh: </strong>
    //             </div>
    //           </Col>
    //           <Col span={15}>
    //             <div>{data?.image}</div>
    //           </Col>
    //           <Col span={9}>
    //             <div className="mb-10">
    //               <strong>Trạng thái hoạt động: </strong>
    //             </div>
    //           </Col>
    //           <Col span={15}>
    //             <div>{data?.status}</div>
    //           </Col>
    //         </Row>
    //       </Col>
    //     </Row>
    //   </div>
    // </CustomModal>
    <Modal
    visible={open}
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
              <strong>Tên sản phẩm:</strong> {data?.name}
            </Col>
            <Col span={24}>
              <strong>Mô tả:</strong>{" "}
              <Tooltip title={data?.description}>
                <span>
                  {data?.description?.length > 100
                    ? `${data?.description.substring(
                        0,
                        100,
                      )}...`
                    : data?.description}
                </span>
              </Tooltip>
            </Col>
            <Col span={24}>
              <strong>Giá:</strong> {data?.price}
            </Col>
            <Col span={24}>
              <strong>Phân loại:</strong> {data?.categoryId}
            </Col>
            <Col span={24}>
              <strong>Trạng thái:</strong>{" "}
              <span
                className={
                  data?.status === "active" ? "blue-text" : "red-text"
                }
              >
                {data?.status === "active"
                  ? "Đang hoạt động"
                  : "Dừng hoạt động"}
              </span>
            </Col>
          </Row>
        </Col>
        {/* Product Image */}
        <Col span={12} style={{ textAlign: "center" }}>
          <img
            src={data?.image}
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
