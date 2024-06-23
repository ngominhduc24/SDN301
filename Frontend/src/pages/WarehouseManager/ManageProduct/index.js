import { Col, Row, Space, Tooltip, Modal } from "antd"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import CB1 from "src/components/Modal/CB1"
import Button from "src/components/MyButton/Button"
import ButtonCircle from "src/components/MyButton/ButtonCircle"
import Notice from "src/components/Notice"
import TableCustom from "src/components/Table/CustomTable"
import SearchAndFilter from "./components/SearchAndFilter"
import InsertUpdateProduct from "./components/InsertUpdateProduct"
import ModalViewProduct from "./components/ModalViewProduct"
import moment from "moment"
import SpinCustom from "src/components/Spin"
import WarehouseManagerService from "src/services/WarehouseManagerService"
import UpdateProduct from "./components/UpdateProduct"
const ManageProduct = () => {
  const [wareHouseProducts, setWareHouseProducts] = useState([])
  const [wareHouseId, setWareHouseId] = useState("")
  const [total, setTotal] = useState(0)
  const [openInsertUpdateProducts, setOpenInsertUpdateProducts] =
    useState(false)
  const [openUpdateProducts, setOpenUpdateProducts] = useState(false)
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
    getWarehouseInfo()
  }, [pagination])

  const getWarehouseInfo = async () => {
    try {
      setLoading(true)
      const warehouseInfoRes = await WarehouseManagerService.getInfoWareHouse()
      console.log("API Response:", warehouseInfoRes)
      if (warehouseInfoRes?.isError) {
        console.error(
          "Error fetching warehouse info:",
          warehouseInfoRes.message,
        )
        return
      }
      const warehouseId = warehouseInfoRes?._id
      const productsRes =
        await WarehouseManagerService.getListProductsWarehouse(warehouseId)
      console.log("Products:", productsRes)
      setWareHouseId(warehouseId)
      setWareHouseProducts(productsRes)
      setTotal(productsRes.length) // Assuming productsRes is an array of products
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
    {
      isEnable: true,
      name: "Chỉnh sửa",
      icon: "edit-green",
      onClick: () => {
        setSelectedProduct(record)
        setOpenUpdateProducts(true)
      },
    },
    // {
    //   isEnable: true,
    //   name: "Xóa",
    //   icon: "delete-red-row",
    //   onClick: () =>
    //     CB1({
    //       record,
    //       title: `bạn chắc chắn muốn xóa?`,
    //       icon: "warning-usb",
    //       okText: "Có",
    //       cancelText: "Không",
    //       onOk: async close => {
    //         // handleDeleteBooking(record)
    //         close()
    //       },
    //     }),
    // },
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
    <SpinCustom spinning={loading}>
      <div className="title-type-1 d-flex justify-content-space-between align-items-center mt-12 mb-30">
        <div>Quản lý tổng sản phẩm</div>
        <div>
          <Button
            btntype="third"
            onClick={() => setOpenInsertUpdateProducts(true)}
          >
            Thêm mới
          </Button>
        </div>
      </div>
      <SearchAndFilter pagination={pagination} setPagination={setPagination} />
      <Row>
        <Col span={24} className="mt-30 mb-20">
          <TableCustom
            isPrimary
            rowKey="ProductId"
            columns={column}
            textEmpty="Chưa có sản phẩm nào trong kho"
            dataSource={wareHouseProducts}
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
      {!!openInsertUpdateProducts && (
        <InsertUpdateProduct
          id={wareHouseId}
          open={openInsertUpdateProducts}
          onCancel={() => setOpenInsertUpdateProducts(false)}
          onOk={() => getWarehouseInfo()}
        />
      )}
      {!!openViewProducts && selectedProduct && (
        <ModalViewProduct
          visible={openViewProducts}
          onCancel={() => setOpenViewProducts(false)}
          product={selectedProduct}
        />
      )}
      {!!openUpdateProducts && selectedProduct && (
        <UpdateProduct
          id={wareHouseId}
          product={selectedProduct}
          open={openUpdateProducts}
          onCancel={() => setOpenUpdateProducts(false)}
          onOk={() => getWarehouseInfo()}
        />
      )}
    </SpinCustom>
  )
}

export default ManageProduct

