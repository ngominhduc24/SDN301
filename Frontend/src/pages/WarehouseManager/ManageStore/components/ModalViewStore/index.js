import { Col, Row, Modal, Tooltip, Space } from "antd"
import Button from "src/components/MyButton/Button"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import CB1 from "src/components/Modal/CB1"
import ButtonCircle from "src/components/MyButton/ButtonCircle"
import Notice from "src/components/Notice"
import TableCustom from "src/components/Table/CustomTable"
import SearchAndFilter from "./components/SearchAndFilter"
import moment from "moment"
import SpinCustom from "src/components/Spin"
import WarehouseManagerService from "src/services/WarehouseManagerService"

const ModalViewStore = ({ visible, onCancel, store }) => {
  const [storeProducts, setStoreProducts] = useState([])
  const [total, setTotal] = useState(0)
  const [openViewProducts, setOpenViewProducts] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [loading, setLoading] = useState(false)
  const [imageModalVisible, setImageModalVisible] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const { userInfo } = useSelector(state => state.appGlobal)
  const [pagination, setPagination] = useState({
    PageSize: 10,
    CurrentPage: 1,
    TextSearch: "",
    ApproveStatus: 0,
    Status: 0,
  })

  useEffect(() => {
    getProductInShop()
  }, [pagination])

  const getProductInShop = async () => {
    try {
      setLoading(true)
      const response = await WarehouseManagerService.getListProductsWarehouse(
        store?._id,
      )
      console.log("Products:", response)
      setStoreProducts(response)
      setTotal(response.length)
    } catch (error) {
      console.error("Error in getWarehouseInfo:", error)
    } finally {
      setLoading(false)
    }
  }

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
      render: (_, record, index) => (
        <div className="text-center">{index + 1}</div>
      ),
    },
    {
      title: "Tên sản phẩm",
      dataIndex: ["productId", "name"],
      width: 200,
      key: "productName",
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
      title: "Trạng thái hoạt động",
      dataIndex: ["productId", "status"],
      align: "center",
      width: 100,
      key: "Status",
      render: (_, record) => (
        <span
          className={[
            "no-color",
            record?.productId?.status === "active" ? "blue-text" : "red-text",
          ].join(" ")}
        >
          {record?.productId?.status === "active"
            ? "Đang hoạt động"
            : "Dừng Hoạt Động"}
        </span>
      ),
    },
  ]

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      title="Chi tiết cửa hàng"
      width="80vw"
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
      <Row gutter={[16, 16]} justify="center">
        <Col span={12}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <strong>Tên cửa hàng:</strong> {store?.name}
            </Col>
            <Col span={24}>
              <strong>Địa chỉ:</strong> {store?.location}
            </Col>
            <Col span={24}>
              <strong>Trạng Thái:</strong>{" "}
              <span
                className={store?.status === "open" ? "blue-text" : "red-text"}
              >
                {store?.status === "open" ? "Đang hoạt động" : "Dừng hoạt động"}
              </span>
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <strong>Số điện thoại:</strong> {store?.phone}
            </Col>
            <Col span={24}>
              <strong>Email:</strong> {store?.email}
            </Col>
          </Row>
        </Col>
      </Row>
      <Row gutter={[16, 16]} justify="center">
        <Col span={24}>
          <SpinCustom spinning={loading}>
            <div className="title-type-1 d-flex justify-content-space-between align-items-center mt-12 mb-30">
              <div>Sản phẩm trong cửa hàng</div>
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
                  textEmpty="Chưa có sản phẩm nào trong kho"
                  dataSource={storeProducts}
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
              <img
                alt="product"
                style={{ width: "100%" }}
                src={selectedImage}
              />
            </Modal>
          </SpinCustom>
        </Col>
      </Row>
    </Modal>
  )
}

export default ModalViewStore

