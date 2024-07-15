import { Col, Row, Space, Tooltip, Modal } from "antd"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import CB1 from "src/components/Modal/CB1"
import Button from "src/components/MyButton/Button"
import ButtonCircle from "src/components/MyButton/ButtonCircle"
import Notice from "src/components/Notice"
import TableCustom from "src/components/Table/CustomTable"
import SearchAndFilter from "../SearchAndFilter"
import moment from "moment"
import SpinCustom from "src/components/Spin"
import ModalViewProduct from "../ModalViewProduct"
import ModalNoteStatus from "../ModalNoteStatus"
import ManagerService from "src/services/ManagerService"
import ModalAcceptRequest from "../ModalAcceptRequest"
const ModalViewDetailRequest = ({ visible, onCancel, data, open, onOk }) => {
  const [openViewProducts, setOpenViewProducts] = useState(false)
  const [total, setTotal] = useState(0)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [loading, setLoading] = useState(false)
  const [imageModalVisible, setImageModalVisible] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const { userInfo } = useSelector(state => state.appGlobal)
  const [cancelModalVisible, setCancelModalVisible] = useState(false)
  const [modalAcceptVisible, setModalAcceptVisible] = useState(false)

  const [pagination, setPagination] = useState({
    PageSize: 10,
    CurrentPage: 1,
    TextSearch: "",
    ApproveStatus: 0,
    Status: 0,
  })

  useEffect(() => {
    console.log(data)
    console.log(open)
  }, [pagination])

  const listBtn = record => [
    {
      isEnable: true,
      name: "Xem sản phẩm ",
      icon: "eye",
      onClick: () => {
        setSelectedProduct(record)
        setOpenViewProducts(true)
        console.log("Products:", record)
      },
    },
  ]

  const column = [
    {
      title: "STT",
      key: ["productId", "_id"],
      width: 60,
      render: (text, row, idx) => (
        <div className="text-center">
          {idx + 1 + pagination.PageSize * (pagination.CurrentPage - 1)}
        </div>
      ),
    },
    {
      title: "Tên sản phẩm",
      dataIndex: ["productId", "name"],
      width: 200,
      key: "name",
    },
    {
      title: "Mô tả",
      dataIndex: ["productId", "description"],
      width: 200,
      key: "description",
      render: text => (
        <Tooltip title={text}>
          <span>
            {text.length > 100 ? `${text.substring(0, 100)}...` : text}
          </span>
        </Tooltip>
      ),
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      width: 120,
      key: "quantity",
    },
    {
      title: "Số lượng cập nhật",
      dataIndex: "updateQuantity",
      width: 120,
      key: "updateQuantity",
    },
    {
      title: "Trạng thái hoạt động",
      dataIndex: ["productId", "status"],
      align: "center",
      width: 100,
      key: "status",
      render: (_, record) => (
        <span
          className={[
            "no-color",
            record?.product?.status === "active" ? "blue-text" : "red-text",
          ].join(" ")}
        >
          {record?.product?.status === "active"
            ? "Đang hoạt động"
            : "Dừng Hoạt Động"}
        </span>
      ),
    },
    {
      title: "Ảnh",
      dataIndex: ["productId", "image"],
      width: 120,
      key: "image",
      render: text => (
        <img
          src={text}
          alt="product"
          style={{ width: 50, height: 50, cursor: "pointer" }}
          onClick={() => {
            setSelectedImage(text)
            setImageModalVisible(true)
          }}
        />
      ),
    },
    {
      title: "Chức năng",
      align: "center",
      key: "Action",
      width: 100,
      render: (_, record) => (
        <Space>
          {listBtn(record).map(
            (i, idx) =>
              !!i?.isEnable && (
                <ButtonCircle
                  key={idx}
                  title={i.name}
                  iconName={i.icon}
                  onClick={i.onClick}
                />
              ),
          )}
        </Space>
      ),
    },
  ]

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      title="Chi tiết hóa đơn"
      width="120vw"
      footer={
        <div className="lstBtn d-flex-sb">
          <div className="lstBtn-right d-flex-end">
            {data.status !== "cancelled" && data.status !== "completed" && (
              <>
                <Button
                  btntype="danger"
                  className="ml-8 mt-12 mb-12"
                  loading={loading}
                  onClick={() => {
                    setCancelModalVisible(true)
                  }}
                >
                  Hủy Yêu cầu
                </Button>
                <Button
                  btntype="third"
                  className="ml-8 mt-12 mb-12"
                  loading={loading}
                  onClick={() => {
                    // updateStatusRequest()
                    setModalAcceptVisible(true)
                  }}
                >
                  Xác nhận yêu cầu
                </Button>
              </>
            )}
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
      <SpinCustom spinning={loading}>
        <div className="mr-12 ml-12">
          <div className="title-type-1 d-flex justify-content-space-between align-items-center mt-12 mb-30">
            <div>Xem chi tiết Yêu cầu</div>
          </div>
          <SearchAndFilter
            pagination={pagination}
            setPagination={setPagination}
          />
          <Row>
            <Col span={24} className="mt-30 mb-20">
              <TableCustom
                isPrimary
                rowKey="ProductId"
                columns={column}
                textEmpty="Chưa có sản phẩm nào trong yêu cầu"
                dataSource={data?.details}
                scroll={{ x: "800px" }}
                pagination={{
                  hideOnSinglePage: total <= 10,
                  current: pagination?.CurrentPage,
                  pageSize: pagination?.PageSize,
                  responsive: true,
                  total: total,
                  locale: { items_per_page: "" },
                  showSizeChanger: total > 10,
                  onChange: (CurrentPage, PageSize) =>
                    setPagination({
                      ...pagination,
                      CurrentPage,
                      PageSize,
                    }),
                }}
              />
            </Col>
          </Row>
          <Modal
            visible={imageModalVisible}
            footer={null}
            onCancel={() => setImageModalVisible(false)}
          >
            <img alt="product" style={{ width: "100%" }} src={selectedImage} />
          </Modal>
          {!!openViewProducts && selectedProduct && (
            <ModalViewProduct
              visible={openViewProducts}
              onCancel={() => setOpenViewProducts(false)}
              product={selectedProduct}
            />
          )}
          <ModalNoteStatus
            visible={cancelModalVisible}
            onCancel={onCancel}
            request={data}
            onOk={onOk}
          />
          <ModalAcceptRequest
            visible={modalAcceptVisible}
            onCancel={onCancel}
            request={data}
            onOk={onOk}
          />
        </div>
      </SpinCustom>
    </Modal>
  )
}

export default ModalViewDetailRequest

