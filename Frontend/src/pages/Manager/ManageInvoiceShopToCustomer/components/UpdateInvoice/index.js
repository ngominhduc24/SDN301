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
  Card,
  Typography,
  Input,
} from "antd"
import { useEffect, useState } from "react"
import CustomModal from "src/components/Modal/CustomModal"
import { PatentRegistrationChildBorder, StylesTabPattern } from "./styled"
import TableCustom from "src/components/Table/CustomTable"
import CB1 from "src/components/Modal/CB1"
import ButtonCircle from "src/components/MyButton/ButtonCircle"
import ManagerService from "src/services/ManagerService"
import Button from "src/components/MyButton/Button"
import Notice from "src/components/Notice"
import ModalViewProduct from "./components/modal/ModalViewProduct"
import STORAGE, { getStorage, setStorage } from "src/lib/storage"
import ModalNoteStatus from "../ModalNoteStatus"
const { Option } = Select

const UpdateInvoice = ({ open, onCancel, onOk, id, invoice }) => {
  const [form] = Form.useForm()
  const [wareHouse, setWareHouse] = useState({})
  const [wareHouseProductsIn, setWareHouseProductsIn] = useState([])
  const [selectedProducts, setSelectedProducts] = useState([])
  const [openViewProducts, setOpenViewProducts] = useState(false)
  const [selectedProductView, setSelectedProductView] = useState(null)
  const [stateBody, setStateBody] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [imageModalVisible, setImageModalVisible] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [cancelModalVisible, setCancelModalVisible] = useState(false)
  const [pagination, setPagination] = useState({
    PageSize: 10,
    CurrentPage: 1,
    TextSearch: "",
    ApproveStatus: 0,
    Status: 0,
  })
  const { Title, Text } = Typography
  const [note, setNote] = useState("")
  const [discount, setDiscount] = useState(0)
  const [shippingCharge, setShippingCharge] = useState(0)
  const managerId = localStorage.getItem(STORAGE.USER_ID)

  useEffect(() => {
    getProductShop()
    console.log("invoice ne", invoice)
  }, [id])
  useEffect(() => {
    if (open && invoice) {
      form.setFieldsValue({
        note: invoice.note,
        discount: invoice.discount,
        shippingCharge: invoice.shipping_charge,
      })
      setNote(invoice.note)
      setDiscount(invoice.discount)
      setShippingCharge(invoice.shipping_charge)
      setStateBody(
        invoice.details.map(item => ({
          productId: item.productId._id,
          quantity: item.quantity,
        })),
      )
      setSelectedProducts(
        invoice.details.map(item => ({
          ...item,
          quantity: item.quantity,
        })),
      )
    }
  }, [open, invoice, form])

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

  const handleQuantityChange = (productId, quantity) => {
    setStateBody(prev =>
      prev.map(item =>
        item.productId === productId ? { ...item, quantity } : item,
      ),
    )
  }
  const handleNoteChange = e => {
    setNote(e.target.value)
  }

  const handleDiscountChange = value => {
    setDiscount(value)
  }

  const handleShippingChargeChange = value => {
    setShippingCharge(value)
  }

  const getProductShop = async () => {
    try {
      setLoading(true)
      const warehouseProductsInRes = await ManagerService.getListProductsInShop(
        id,
      )
      if (warehouseProductsInRes?.isError) {
        console.error(
          "Error fetching warehouse info:",
          warehouseProductsInRes.message,
        )
        return
      }
      setWareHouseProductsIn(warehouseProductsInRes || [])
      setTotal(warehouseProductsInRes.length)
    } catch (error) {
      console.error("Error in getWarehouseInfo:", error)
    } finally {
      setLoading(false)
    }
  }

  const updateInvoice = async () => {
    try {
      setLoading(true)
      const invoiceData = {
        from: id,
        to: null,
        details: stateBody.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
        note: note,
        discount: discount,
        shipping_charge: shippingCharge,
        created_by: managerId,
      }
      console.log(invoiceData)
      const response = await ManagerService.updateInfoInvoice(
        invoice?._id,
        invoiceData,
      )
      if (response?.isError) {
        console.error("Error creating invoice:", response.message)
        return
      }
      onOk()
      onCancel()
      Notice({
        isSuccess: true,
        msg: "Chỉnh sửa đơn hàng thành công",
      })
    } catch (error) {
      console.error("Error in createInvoice:", error)
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
          onClick={updateInvoice}
        >
          Lưu
        </Button>
        <Button
          btntype="danger"
          className="ml-8 mt-12 mb-12"
          loading={loading}
          onClick={() => {
            setCancelModalVisible(true)
          }}
        >
          Hủy Đơn Hàng
        </Button>
        <Button btntype="third" className="ml-8 mt-12 mb-12" onClick={onCancel}>
          Đóng
        </Button>
      </div>
    </div>
  )
  const items = [
    {
      key: 1,
      label: <div>Sản phẩm</div>,
      children: (
        <PatentRegistrationChildBorder>
          <Form form={form}>
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
            </Row>
            {selectedProducts && (
              <TableCustom
                isPrimary
                rowKey={record =>
                  record.productId ? record.productId._id : record.key
                }
                columns={columns}
                dataSource={
                  selectedProducts.length > 0 ? selectedProducts : undefined
                }
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
            )}
          </Form>
        </PatentRegistrationChildBorder>
      ),
    },
    {
      key: 2,
      label: <div>Ghi chú</div>,
      children: (
        <Card>
          <Form form={form} layout="vertical">
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item name="note" label="Ghi chú">
                  <Input.TextArea
                    onChange={handleNoteChange}
                    rows={4}
                    placeholder="Nhập ghi chú"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="discount" label="Chiết khấu (%)">
                  <InputNumber
                    min={0}
                    value={discount}
                    onChange={handleDiscountChange}
                    placeholder="Chiết khấu"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="shippingCharge" label="Phí vận chuyển">
                  <InputNumber
                    min={0}
                    value={shippingCharge}
                    onChange={handleShippingChargeChange}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      ),
    },
  ]
  return (
    <div>
      <CustomModal
        open={open}
        onCancel={onCancel}
        onOk={onOk}
        title={"Chỉnh sửa hóa đơn"}
        width="90vw"
        footer={renderFooter()}
      >
        <StylesTabPattern className="mr-12 ml-12">
          <Tabs type="card" defaultActiveKey="1" items={items} />
        </StylesTabPattern>
        <ModalViewProduct
          visible={openViewProducts}
          onCancel={() => setOpenViewProducts(false)}
          product={selectedProductView}
        />
      </CustomModal>
      <ModalNoteStatus
        visible={cancelModalVisible}
        onCancel={onCancel}
        invoice={invoice}
        onOk={onOk}
      />
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

export default UpdateInvoice

