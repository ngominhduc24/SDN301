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
  Switch,
} from "antd"
import { useEffect, useState } from "react"
import CustomModal from "src/components/Modal/CustomModal"
import { PatentRegistrationChildBorder, StylesTabPattern } from "./styled"
import TableCustom from "src/components/Table/CustomTable"
import CB1 from "src/components/Modal/CB1"
import ButtonCircle from "src/components/MyButton/ButtonCircle"
import Button from "src/components/MyButton/Button"
import Notice from "src/components/Notice"
import IOSSwitch from "src/components/IOSSwitch"
import WarehouseManagerService from "src/services/WarehouseManagerService"
const { Option } = Select

const UpdateProduct = ({ open, onCancel, onOk, product, id }) => {
  const [imageModalVisible, setImageModalVisible] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState([])
  const [stateBody, setStateBody] = useState({})

  useEffect(() => {
    if (product) {
      setSelectedProduct([product])
      setStateBody({
        [product._id]: {
          quantity: product.quantity,
          status: product.status,
        },
      })
    }
  }, [product])

  const handleQuantityChange = (productId, quantity) => {
    setStateBody(prev => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        quantity: quantity,
      },
    }))
  }

  const toggleStatus = (productId, checked) => {
    setStateBody(prevStatus => ({
      ...prevStatus,
      [productId]: {
        ...prevStatus[productId],
        status: checked ? "active" : "inactive",
      },
    }))
  }

  const column = [
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
          onChange={value => handleQuantityChange(record._id, value)}
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
      dataIndex: "status",
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
      title: "Action",
      dataIndex: "status",
      width: 120,
      key: "status",
      render: (_, record) => (
        <Switch
          checked={stateBody[record._id]?.status === "active"}
          onChange={checked => toggleStatus(record._id, checked)}
        />
      ),
    },
  ]

  const items = [
    {
      key: 1,
      label: <div>Sản phẩm</div>,
      children: (
        <PatentRegistrationChildBorder>
          <TableCustom
            isPrimary
            rowKey="ProductId"
            columns={column}
            dataSource={selectedProduct}
            scroll={{ x: "800px" }}
          />
          <Modal
            visible={imageModalVisible}
            footer={null}
            onCancel={() => setImageModalVisible(false)}
          >
            <img alt="product" style={{ width: "100%" }} src={selectedImage} />
          </Modal>
        </PatentRegistrationChildBorder>
      ),
    },
  ]

  const renderFooter = () => (
    <div className="lstBtn d-flex-sb">
      <div className="lstBtn-right d-flex-end">
        <Button
          btntype="primary"
          className="ml-8 mt-12 mb-12"
          loading={loading}
          onClick={updateProductsToWarehouse}
        >
          Lưu
        </Button>
        <Button btntype="third" className="ml-8 mt-12 mb-12" onClick={onCancel}>
          Đóng
        </Button>
      </div>
    </div>
  )

  const updateProductsToWarehouse = async () => {
    try {
      setLoading(true)
      const response = await WarehouseManagerService.updateProductsToWarehouse(
        id,
        product?.productId?._id,
        stateBody[product._id],
      )
      console.log("Response:", response)
      if (response?.isError) {
        console.error("Lỗi khi cập nhật sản phẩm:", response.message)
        return
      }
      onOk()
      onCancel()
      Notice({
        msg: "Chỉnh sửa thành công.",
      })
    } catch (error) {
      console.error("Lỗi trong quá trình cập nhật sản phẩm:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <CustomModal
      open={open}
      onCancel={onCancel}
      onOk={onOk}
      title={"Chỉnh sửa sản phẩm"}
      width="90vw"
      footer={renderFooter()}
    >
      <StylesTabPattern>
        <Tabs type="card" defaultActiveKey="1">
          {items.map(item => (
            <Tabs.TabPane tab={item.label} key={item.key}>
              {item.children}
            </Tabs.TabPane>
          ))}
        </Tabs>
      </StylesTabPattern>
    </CustomModal>
  )
}

export default UpdateProduct

