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
import WarehouseManagerService from "src/services/WarehouseManagerService"
import ModalViewProduct from "../ModalViewProduct"
import { DownloadOutlined } from "@ant-design/icons"
import { saveAs } from "file-saver"

const ModalViewDetailInvoice = ({ visible, onCancel, data, open }) => {
  const [openViewProducts, setOpenViewProducts] = useState(false)
  const [total, setTotal] = useState(0)
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
      title: "Giá tiền trên từng sản phẩm",
      align: "center",
      dataIndex: ["productId", "price"],
      width: 100,
      key: "price",
      render: value =>
        value.toLocaleString("vi-VN", { style: "currency", currency: "VND" }),
    },

    {
      title: "Số lượng",
      dataIndex: "quantity",
      width: 120,
      key: "quantity",
    },
    {
      title: "Tổng giá",
      align: "center",
      width: 100,
      key: "total_price",
      render: (_, record) => {
        const totalPrice = record.productId.price * record.quantity
        return totalPrice.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        })
      },
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
  const exportInvoice = async id => {
    try {
      const response = await WarehouseManagerService.exportInvoice(id)
      const filePath = response.filePath
      if (filePath) {
        const link = document.createElement("a")
        link.href = filePath
        link.download = `invoice_${id}.pdf`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      } else {
        console.error("No file path returned from the API")
      }
    } catch (error) {
      console.error("Error exporting invoice:", error)
    }
  }
  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      title="Chi tiết hóa đơn"
      width="120vw"
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
            <Button
              className="btn-hover-shadow ml-8 mt-12 mb-12"
              btntype="third"
              icon={<DownloadOutlined />}
              onClick={() => exportInvoice(data?._id)}
            >
              Export Invoice
            </Button>
          </div>
        </div>
      }
    >
      <SpinCustom spinning={loading}>
        <div className="mr-12 ml-12">
          <div className="title-type-1 d-flex justify-content-space-between align-items-center mt-12 mb-30">
            <div>Xem chi tiết Hóa Đơn</div>
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
                textEmpty="Chưa có sản phẩm nào trong hóa đơn"
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
        </div>
      </SpinCustom>
    </Modal>
  )
}

export default ModalViewDetailInvoice
