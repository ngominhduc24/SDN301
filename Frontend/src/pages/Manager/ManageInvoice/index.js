import { Col, Row, Space, Tooltip, Modal, Switch } from "antd"
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
import {
  MainTableData,
  MainTableHeader,
  SubTableData,
  SubTableHeader,
} from "src/components/Table/CustomTable/styled"
const ManageInvoiceWarehouse = () => {
  const [invoices, setInvoices] = useState([])
  const [invoiceId, setInvoiceId] = useState("")
  const [total, setTotal] = useState(0)
  const [openInsertUpdateInvoices, setOpenInsertUpdateInvoices] =
    useState(false)
  const [openUpdateInvoices, setOpenUpdateInvoices] = useState(false)
  const [openViewInvoice, setOpenViewInvoice] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState(null)
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
      const warehouseInvoice = await WarehouseManagerService.getAllInvoice()
      console.log("API Response:", warehouseInvoice)
      if (warehouseInvoice?.isError) {
        console.error(
          "Error fetching warehouse info:",
          warehouseInvoice.message,
        )
        return
      }
      setInvoices(warehouseInvoice)
      setInvoiceId(warehouseInvoice?._id)
      setTotal(warehouseInvoice.length)
    } catch (error) {
      console.error("Error in getWarehouseInfo:", error)
    } finally {
      setLoading(false)
    }
  }

  const listBtn = record => [
    {
      isEnable: true,
      name: "Xem chi tiết hóa đơn ",
      icon: "eye",
      onClick: () => {
        setSelectedInvoice(record)
        setOpenViewInvoice(true)
        console.log("Products:", record)
      },
    },
    {
      isEnable: true,
      name: "Chỉnh sửa",
      icon: "edit-green",
      onClick: () => {
        setSelectedInvoice(record)
        setOpenUpdateInvoices(true)
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
  const toggleStatus = async (id, checked) => {
    setLoading(true)
    try {
      const updatedStatus = checked ? "completed" : "cancelled"
      await WarehouseManagerService.updateStatusInvoice(id, {
        status: updatedStatus,
      })
      const updatedInvoices = invoices.map(invoice =>
        invoice._id === id ? { ...invoice, status: updatedStatus } : invoice,
      )
      setInvoices(updatedInvoices)
      Notice({
        isSuccess: true,
        msg: "Cập nhật trạng thái thành công",
      })
    } catch (error) {
      Notice({
        isSuccess: false,
        msg: "Cập nhật trạng thái thất bại",
      })
    } finally {
      setLoading(false)
    }
  }

  const columns = [
    {
      title: "STT",
      key: "_id",
      width: 60,
      render: (_, __, index) => <div className="text-center">{index + 1}</div>,
    },
    {
      title: (
        <>
          <MainTableHeader>Tên kho xuất</MainTableHeader>
          <SubTableHeader>Số điện thoại</SubTableHeader>
          <SubTableHeader>Email</SubTableHeader>
        </>
      ),
      dataIndex: ["from", "name"],
      width: 300,
      align: "center",
      key: "from_name",
      render: (val, record) => (
        <>
          <MainTableData>{val}</MainTableData>
          <SubTableData>{record.from?.phone}</SubTableData>
          <SubTableData>{record.from?.email}</SubTableData>
        </>
      ),
    },
    {
      title: (
        <>
          <MainTableHeader>Tên kho cửa hàng đến</MainTableHeader>
          <SubTableHeader>Số điện thoại</SubTableHeader>
          <SubTableHeader>Email</SubTableHeader>
        </>
      ),
      dataIndex: ["to", "name"],
      width: 300,
      align: "center",
      key: "to_name",
      render: (val, record) => (
        <>
          <MainTableData>{val}</MainTableData>
          <SubTableData>{record.to?.phone}</SubTableData>
          <SubTableData>{record.to?.email}</SubTableData>
        </>
      ),
    },
    {
      title: "Tổng hóa đơn",
      dataIndex: "sub_total",
      width: 200,
      align: "center",
      key: "sub_total",
      render: value =>
        value.toLocaleString("vi-VN", { style: "currency", currency: "VND" }),
    },
    {
      title: "Giảm giá",
      dataIndex: "discount",
      align: "center",
      width: 100,
      key: "discount",
      render: value => `${value}%`,
    },
    {
      title: "Phí vận chuyển",
      align: "center",
      dataIndex: "shipping_charge",
      width: 100,
      key: "shipping_charge",
      render: value =>
        value.toLocaleString("vi-VN", { style: "currency", currency: "VND" }),
    },
    {
      title: "Tổng hóa đơn cuối",
      align: "center",
      dataIndex: "total_price",
      width: 200,
      key: "total_price",
      render: value =>
        value.toLocaleString("vi-VN", { style: "currency", currency: "VND" }),
    },
    {
      title: "Ghi chú",
      dataIndex: "note",
      width: 200,
      key: "note",
      render: text => (
        <Tooltip title={text}>
          <span>
            {text.length > 100 ? `${text.substring(0, 100)}...` : text}
          </span>
        </Tooltip>
      ),
    },
    {
      title: "Action",
      dataIndex: "status",
      width: 120,
      key: "status",
      align: "center",
      render: (_, record) => (
        <Switch
          checked={record.status === "active"}
          onChange={(checked, e) => {
            e.stopPropagation()
            toggleStatus(record._id, checked)
          }}
        />
      ),
    },
    {
      title: "Trạng thái hoá đơn",
      dataIndex: "status",
      align: "center",
      width: 150,
      key: "status",
      render: (_, record) => (
        <span
          className={[
            "no-color",
            record?.status === "pending"
              ? "blue-text"
              : record?.status === "completed"
              ? "green-text"
              : "red-text",
          ].join(" ")}
        >
          {record?.status === "pending"
            ? "Đang chờ xác nhận"
            : record?.status === "completed"
            ? "Đã hoàn thành"
            : "Đã hủy"}
        </span>
      ),
    },
    {
      title: "Chức năng",
      align: "center",
      key: "action",
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
        <div>Quản lý hóa đơn xuất kho</div>
        <div>
          <Button
            btntype="third"
            onClick={() => setOpenInsertUpdateInvoices(true)}
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
            columns={columns}
            textEmpty="Chưa có sản phẩm nào trong kho"
            dataSource={invoices}
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
      {/* {!!openInsertUpdateProducts && (
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
      )} */}
    </SpinCustom>
  )
}

export default ManageInvoiceWarehouse

