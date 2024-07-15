import { Col, Row, Space, Tooltip, Modal, Switch } from "antd"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Button from "src/components/MyButton/Button"
import ButtonCircle from "src/components/MyButton/ButtonCircle"
import Notice from "src/components/Notice"
import TableCustom from "src/components/Table/CustomTable"
import SearchAndFilter from "./components/SearchAndFilter"
import ModalViewDetailInvoice from "./components/ModalViewDetailInvoice"
import moment from "moment"
import SpinCustom from "src/components/Spin"
import WarehouseManagerService from "src/services/WarehouseManagerService"
import InsertUpdateInvoice from "./components/InsertUpdateInvoice"
import ModalViewWarehouse from "./components/ModalViewWarehouse"
import ModalViewStore from "./components/ModalViewStore"
import UpdateInvoice from "./components/UpdateInvoice"
import {
  MainTableData,
  MainTableHeader,
  SubTableData,
  SubTableHeader,
} from "src/components/Table/CustomTable/styled"
import { saveAs } from "file-saver"
const ManageInvoiceWarehouse = () => {
  const [invoices, setInvoices] = useState([])
  const [selectedInvoice, setSelectedInvoice] = useState(null)
  const [loading, setLoading] = useState(false)
  const [openInsertUpdateInvoices, setOpenInsertUpdateInvoices] =
    useState(false)
  const [openUpdateInvoices, setOpenUpdateInvoices] = useState(false)
  const [openViewInvoice, setOpenViewInvoice] = useState(false)
  const [selectedWarehouse, setSelectedWarehouse] = useState(null)
  const [selectedStore, setSelectedStore] = useState(null)
  const [openViewWarehouse, setOpenViewWarehouse] = useState(false)
  const [openViewStore, setOpenViewStore] = useState(false)
  const { userInfo } = useSelector(state => state.appGlobal)
  const [wareHouseId, setWareHouseId] = useState(null)
  const [pagination, setPagination] = useState({
    PageSize: 10,
    CurrentPage: 1,
    TextSearch: "",
    ApproveStatus: 0,
    Status: 0,
  })

  useEffect(() => {
    const fetchWarehouseInfoAndInvoices = async () => {
      const warehouseId = await getWarehouseInfo()
      if (warehouseId) {
        setWareHouseId(warehouseId)
        getAllInvoice(warehouseId)
      }
    }
    fetchWarehouseInfoAndInvoices()
  }, [pagination])

  const getWarehouseInfo = async () => {
    try {
      setLoading(true)
      const res = await WarehouseManagerService.getInfoWareHouse()
      if (res?.isError) return
      return res?._id
    } catch (error) {
      console.error("Error fetching warehouse info:", error)
    } finally {
      setLoading(false)
    }
  }

  const getAllInvoice = async warehouseId => {
    try {
      setLoading(true)
      const warehouseInvoice = await WarehouseManagerService.getOrdersByShopId(
        warehouseId,
      )
      console.log("API Response:", warehouseInvoice)
      if (warehouseInvoice?.isError) {
        console.error(
          "Error fetching warehouse info:",
          warehouseInvoice.message,
        )
        return
      }
      setInvoices(warehouseInvoice)
    } catch (error) {
      console.error("Error in getWarehouseInfo:", error)
    } finally {
      setLoading(false)
    }
  }

  const listBtn = record => {
    const buttons = [
      {
        isEnable: true,
        name: "Xem chi tiết hóa đơn",
        icon: "eye",
        onClick: () => {
          setSelectedInvoice(record)
          setOpenViewInvoice(true)
          console.log("Products:", record)
        },
      },
      {
        isEnable: true,
        name: "Xuất hóa đơn",
        icon: "dowload-export",
        onClick: () => exportInvoice(record._id),
      },
    ]

    if (record.status !== "cancelled" && record.status !== "completed") {
      buttons.push({
        isEnable: true,
        name: "Chỉnh sửa",
        icon: "edit-green",
        onClick: () => {
          setSelectedInvoice(record)
          setOpenUpdateInvoices(true)
        },
      })
    }

    return buttons
  }

  const handleViewWarehouse = record => {
    setSelectedWarehouse(record.from)
    setOpenViewWarehouse(true)
  }

  const handleViewStore = record => {
    setSelectedStore(record.to)
    setOpenViewStore(true)
  }

  const exportInvoice = async id => {
    try {
      const response = await WarehouseManagerService.exportInvoice(id)
      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      })
      saveAs(blob, `invoice_${id}.pdf`)
    } catch (error) {
      console.error("Error exporting invoice:", error)
    }
  }

  const columns = [
    {
      title: "STT",
      key: "_id",
      width: 60,
      render: (text, row, idx) => (
        <div className="text-center">
          {idx + 1 + pagination.PageSize * (pagination.CurrentPage - 1)}
        </div>
      ),
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
      width: 250,
      align: "center",
      key: "from_name",
      render: (val, record) => (
        <>
          <MainTableData onClick={() => handleViewWarehouse(record)}>
            {val}
          </MainTableData>
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
      width: 250,
      align: "center",
      key: "to_name",
      render: (val, record) => (
        <>
          <MainTableData onClick={() => handleViewStore(record)}>
            {val}
          </MainTableData>
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
      title: "Ngày tạo",
      dataIndex: "createdAt",
      width: 200,
      align: "center",
      key: "createdAt",
      render: value => moment(value).format("DD-MM-YYYY HH:mm:ss"),
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "updatedAt",
      width: 200,
      align: "center",
      key: "updatedAt",
      render: value => moment(value).format("DD-MM-YYYY HH:mm:ss"),
      // render: value => (
      //   <span>
      //     {value && dayjs(value).isValid()
      //       ? dayjs(value).format("DD/MM/YYYY")
      //       : "N/A"}
      //   </span>
      // ),
    },
    {
      title: "Ghi chú",
      dataIndex: "note",
      width: 150,
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
              : "red",
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
      align: "",
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
            textEmpty="Chưa có hóa đơn nào "
            dataSource={invoices}
            scroll={{ x: "800px" }}
            pagination={{
              hideOnSinglePage: invoices.length <= 10,
              current: pagination?.CurrentPage,
              pageSize: pagination?.PageSize,
              responsive: true,
              total: invoices.length,
              locale: { items_per_page: "" },
              showSizeChanger: invoices.length > 10,
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
      {!!openViewInvoice && selectedInvoice && (
        <ModalViewDetailInvoice
          open={openViewInvoice}
          visible={openViewInvoice}
          onCancel={() => setOpenViewInvoice(false)}
          data={selectedInvoice}
        />
      )}
      {!!openViewWarehouse && selectedWarehouse && (
        <ModalViewWarehouse
          visible={openViewWarehouse}
          onCancel={() => setOpenViewWarehouse(false)}
          warehouse={selectedWarehouse}
        />
      )}
      {!!openViewStore && selectedStore && (
        <ModalViewStore
          visible={openViewStore}
          onCancel={() => setOpenViewStore(false)}
          store={selectedStore}
        />
      )}
      {!!openInsertUpdateInvoices && (
        <InsertUpdateInvoice
          id={wareHouseId}
          open={openInsertUpdateInvoices}
          onCancel={() => setOpenInsertUpdateInvoices(false)}
          onOk={() => getAllInvoice(wareHouseId)}
        />
      )}
      {!!openUpdateInvoices && (
        <UpdateInvoice
          open={openUpdateInvoices}
          onCancel={() => setOpenUpdateInvoices(false)}
          onOk={() => getAllInvoice(wareHouseId)}
          invoice={selectedInvoice}
          id={wareHouseId}
        />
      )}
    </SpinCustom>
  )
}

export default ManageInvoiceWarehouse

