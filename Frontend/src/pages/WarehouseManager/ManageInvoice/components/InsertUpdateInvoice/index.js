import {
  Col,
  Form,
  Row,
  Select,
  Space,
  Tabs,
  Tooltip,
  InputNumber,
  Modal,
} from "antd"
import { useEffect, useState } from "react"
import CustomModal from "src/components/Modal/CustomModal"
import { PatentRegistrationChildBorder, StylesTabPattern } from "./styled"
import TableCustom from "src/components/Table/CustomTable"
import CB1 from "src/components/Modal/CB1"
import ButtonCircle from "src/components/MyButton/ButtonCircle"
import Button from "src/components/MyButton/Button"
import WarehouseManagerService from "src/services/WarehouseManagerService"
import Notice from "src/components/Notice"
import ModalViewProduct from "./components/modal/ModalViewProduct"
const { Option } = Select

const InsertUpdateInvoice = ({ open, onCancel, onOk, id }) => {
  const [form] = Form.useForm()
  const [wareHouseProductsIn, setWareHouseProductsIn] = useState([])
  const [selectedProducts, setSelectedProducts] = useState([])
  const [openViewProducts, setOpenViewProducts] = useState(false)
  const [selectedProductView, setSelectedProductView] = useState(null)
  const [stateBody, setStateBody] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [imageModalVisible, setImageModalVisible] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [pagination, setPagination] = useState({
    PageSize: 10,
    CurrentPage: 1,
    TextSearch: "",
    ApproveStatus: 0,
    Status: 0,
  })

  const [shopList, setShopList] = useState([]) // State to hold shop list
  const [selectedShop, setSelectedShop] = useState(null) // State to hold selected shop

  const listBtn = record => [
    {
      isEnable: true,
      name: "Xem sản phẩm ",
      icon: "eye",
    },
    {
      isEnable: true,
      name: "Xóa",
      icon: "delete-red-row",
      onClick: () =>
        CB1({
          record,
          title: `Bạn chắc chắn muốn xóa?`,
          icon: "warning-usb",
          okText: "Có",
          cancelText: "Không",
          onOk: close => {
            handleRemoveProduct(record)
            close()
          },
        }),
    },
  ]

  const columns = [
    {
      title: "STT",
      key: "ProductID",
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
      render: (_, record) => (
        <InputNumber
          min={0}
          defaultValue={record.quantity}
          onChange={value => handleQuantityChange(record.productId._id, value)}
        />
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
      title: "Trạng thái hoạt động",
      dataIndex: ["status"],
      align: "center",
      width: 100,
      key: "Status",
      render: status => (
        <span className={status === "active" ? "blue-text" : "red-text"}>
          {status === "active" ? "Đang hoạt động" : "Dừng Hoạt Động"}
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

  const handleRemoveProduct = record => {
    setSelectedProducts(prev =>
      prev.filter(item => item.productId._id !== record.productId._id),
    )
    setStateBody(prev =>
      prev.filter(item => item.productId !== record.productId._id),
    )
  }

  const handleProductChange = value => {
    const selected = wareHouseProductsIn.find(
      product => product.productId._id === value,
    )
    if (selected) {
      setSelectedProducts(prev => [...prev, { ...selected, quantity: 0 }])
      setStateBody(prev => [
        ...prev,
        { productId: selected.productId._id, quantity: 0 },
      ])
    }
  }

  const handleShopChange = value => {
    const selected = shopList.find(shop => shop.id === value)
    setSelectedShop(selected)
  }

  const handleQuantityChange = (productId, quantity) => {
    setStateBody(prev =>
      prev.map(item =>
        item.productId === productId ? { ...item, quantity } : item,
      ),
    )
  }

  const getProductsInWarehouse = async () => {
    try {
      setLoading(true)
      const warehouseProductsInRes =
        await WarehouseManagerService.getListProductsWarehouse(id)
      if (warehouseProductsInRes?.isError) {
        console.error(
          "Error fetching warehouse info:",
          warehouseProductsInRes.message,
        )
        return
      }
      setWareHouseProductsIn(warehouseProductsInRes)
      setTotal(warehouseProductsInRes.length)
    } catch (error) {
      console.error("Error in getWarehouseInfo:", error)
    } finally {
      setLoading(false)
    }
  }

  const getShopList = async () => {
    try {
      setLoading(true)
      const shopListRes = await WarehouseManagerService.getShopList()
      if (shopListRes?.isError) {
        console.error("Error fetching shop list:", shopListRes.message)
        return
      }
      setShopList(shopListRes)
      console.log(shopListRes)
    } catch (error) {
      console.error("Error in getShopList:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getProductsInWarehouse()
    getShopList()
  }, [id])

  const addProductsToWarehouse = async () => {
    try {
      setLoading(true)
      const response = await WarehouseManagerService.addProductsToWarehouse(
        id,
        stateBody,
      )
      if (response?.isError) {
        console.error("Lỗi khi thêm sản phẩm vào kho:", response.message)
        return
      }
      getProductsInWarehouse()
      onOk()
      onCancel()
      Notice({
        msg: "Thêm thành công.",
      })
    } catch (error) {
      console.error("Lỗi trong quá trình thêm sản phẩm vào kho:", error)
    } finally {
      setLoading(false)
    }
  }

  const renderFooter = () => (
    <div className="lstBtn d-flex-sb">
      <div className="lstBtn-right d-flex-end">
        <Button
          btntype="primary"
          className="ml-8 mt-12 mb-12"
          loading={loading}
          onClick={addProductsToWarehouse}
        >
          Lưu
        </Button>
        <Button btntype="third" className="ml-8 mt-12 mb-12" onClick={onCancel}>
          Đóng
        </Button>
      </div>
    </div>
  )

  return (
    <div>
      <CustomModal
        open={open}
        onCancel={onCancel}
        onOk={onOk}
        title={"Thêm mới sản phẩm"}
        width="90vw"
        footer={renderFooter()}
      >
        <StylesTabPattern className="mr-12 ml-12">
          <Tabs type="card" defaultActiveKey="1">
            <Tabs.TabPane key="1" tab="Sản phẩm">
              <PatentRegistrationChildBorder>
                <Form form={form} onFinish={addProductsToWarehouse}>
                  <Row gutter={16} style={{ marginBottom: 16 }}>
                    <Col span={12}>
                      <Select
                        showSearch
                        placeholder="Chọn sản phẩm"
                        optionFilterProp="children"
                        onChange={handleProductChange}
                        style={{ width: "100%" }}
                      >
                        {wareHouseProductsIn.map(product => (
                          <Option
                            key={product.productId._id}
                            value={product.productId._id}
                          >
                            {product.productId.name}
                          </Option>
                        ))}
                      </Select>
                    </Col>
                    <Col span={12}>
                      <Select
                        showSearch
                        placeholder="Chọn shop"
                        optionFilterProp="children"
                        onChange={handleShopChange}
                        style={{ width: "100%" }}
                      >
                        {shopList.map(shop => (
                          <Option key={shop._id} value={shop._id}>
                            {shop.name}
                          </Option>
                        ))}
                      </Select>
                    </Col>
                  </Row>
                  <TableCustom
                    isPrimary
                    rowKey={record => record.productId._id}
                    columns={columns}
                    dataSource={selectedProducts}
                    scroll={{ x: "800px" }}
                    pagination={{
                      hideOnSinglePage: total <= 10,
                      current: pagination?.CurrentPage,
                      pageSize: pagination?.PageSize,
                      responsive: true,
                      total: total,
                      locale: { items_per_page: "" },
                      showSizeChanger: total > 10,
                      pageSizeOptions: ["10", "20", "50", "100"],
                    }}
                  />
                </Form>
              </PatentRegistrationChildBorder>
            </Tabs.TabPane>
          </Tabs>
        </StylesTabPattern>
        <ModalViewProduct
          visible={openViewProducts}
          onCancel={() => setOpenViewProducts(false)}
          product={selectedProductView}
        />
      </CustomModal>
      <Modal
        visible={imageModalVisible}
        onCancel={() => setImageModalVisible(false)}
        footer={null}
      >
        <img src={selectedImage} alt="Selected" style={{ width: "100%" }} />
      </Modal>
    </div>
  )
}

export default InsertUpdateInvoice

