import { Col, Form, Row, Select, Space, Tabs, Tooltip } from "antd"
import { useEffect, useState } from "react"
import CustomModal from "src/components/Modal/CustomModal"
import { PatentRegistrationChildBorder, StylesTabPattern } from "./styled"
import TableCustom from "src/components/Table/CustomTable"
import CB1 from "src/components/Modal/CB1"
import ButtonCircle from "src/components/MyButton/ButtonCircle"
import Button from "src/components/MyButton/Button"
import WarehouseManagerService from "src/services/WarehouseManagerService"

const { Option } = Select

const InsertUpdateProgram = ({ open, onCancel, onOk, id }) => {
  const [form] = Form.useForm()
  const [wareHouseProductsNotIn, setWareHouseProductsNotIn] = useState([])
  const [selectedProducts, setSelectedProducts] = useState([])
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
      dataIndex: ["name"],
      width: 200,
      key: "productName",
    },
    {
      title: "Mô tả",
      dataIndex: ["description"],
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
      dataIndex: ["image"],
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
    setSelectedProducts(prev => prev.filter(item => item._id !== record._id))
  }

  const handleProductChange = value => {
    const selected = wareHouseProductsNotIn.find(
      product => product._id === value,
    )
    if (selected) {
      setSelectedProducts(prev => [...prev, { ...selected, quantity: 0 }])
    }
  }

  const getProductsNotInWarehouse = async () => {
    try {
      setLoading(true)
      const warehouseProductsNotInRes =
        await WarehouseManagerService.getListProductsNotInWarehouse(id)
      if (warehouseProductsNotInRes?.isError) {
        console.error(
          "Error fetching warehouse info:",
          warehouseProductsNotInRes.message,
        )
        return
      }
      setWareHouseProductsNotIn(warehouseProductsNotInRes)
      setTotal(warehouseProductsNotInRes.length)
    } catch (error) {
      console.error("Error in getWarehouseInfo:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getProductsNotInWarehouse()
  }, [pagination])

  const items = [
    {
      key: 1,
      label: <div>Sản phẩm</div>,
      children: (
        <PatentRegistrationChildBorder>
          <Row gutter={16} style={{ marginBottom: 16 }}>
            <Col span={12}>
              <Select
                showSearch
                placeholder="Chọn sản phẩm"
                optionFilterProp="children"
                onChange={handleProductChange}
                style={{ width: "100%" }}
              >
                {wareHouseProductsNotIn.map(product => (
                  <Option key={product._id} value={product._id}>
                    {product.name}
                  </Option>
                ))}
              </Select>
            </Col>
          </Row>
          <TableCustom
            isPrimary
            rowKey="ProductId"
            columns={column}
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
              onChange: (CurrentPage, PageSize) =>
                setPagination({
                  ...pagination,
                  CurrentPage,
                  PageSize,
                }),
            }}
          />
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
          onClick={onOk}
        >
          Lưu
        </Button>
        <Button
          btntype="third"
          className="ml-8 mt-12 mb-12"
          onClick={() => onCancel()}
        >
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
        title={open?.BookingID ? "Chỉnh sửa cửa hàng" : "Thêm mới cửa hàng"}
        width="90vw"
        footer={renderFooter()}
      >
        <StylesTabPattern>
          <Tabs type="card" defaultActiveKey="1" items={items} />
        </StylesTabPattern>
      </CustomModal>
    </div>
  )
}

export default InsertUpdateProgram

