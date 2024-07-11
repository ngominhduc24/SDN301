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
// import WarehouseManagerService from "src/services/WarehouseManagerService"
import ManagerService from "src/services/ManagerService"
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

const ManageInvoiceManager = () => {
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
  const [managerId, setManagerId] = useState(null)
  const [infoShop, setInfoShop] = useState(null)
  const [pagination, setPagination] = useState({
    PageSize: 10,
    CurrentPage: 1,
    TextSearch: "",
    ApproveStatus: 0,
    Status: 0,
  })

  useEffect(() => {
    getAllInvoice()
    getManagerInfo()
  }, [pagination])

  const getManagerInfo = async () => {
    try {
      setLoading(true)
      const res = await ManagerService.getShop("666da2c059207cb17349144a")
      if (res?.isError) return
      setInfoShop(res)
      setManagerId("666da2c059207cb17349144a")
    } catch (error) {
      console.error("Error fetching warehouse info:", error)
    } finally {
      setLoading(false)
    }
  }

  const getAllInvoice = async () => {
    try {
      setLoading(true)
      const managerInvoice = await ManagerService.getOrdersByShopId(
        "666da2c059207cb17349144a",
      )

      console.log("API Response:", managerInvoice)
      if (managerInvoice?.isError) {
        console.error("Error fetching warehouse info:", managerInvoice.message)
        return
      }
      setInvoices(managerInvoice)
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
    ]

    if (record.status !== "cancelled") {
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
          <MainTableHeader>Tên cửa hàng</MainTableHeader>
          <SubTableHeader>Số điện thoại</SubTableHeader>
          <SubTableHeader>Email</SubTableHeader>
        </>
      ),
      dataIndex: ["from", "name"],
      width: 300,
      align: "center",
      key: "to_name",
      render: (val, record) => (
        <>
          <MainTableData onClick={() => handleViewStore(record)}>
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
          <MainTableHeader>Khách hàng</MainTableHeader>
          <SubTableHeader>Số điện thoại</SubTableHeader>
          <SubTableHeader>Email</SubTableHeader>
        </>
      ),
      dataIndex: ["to", "name"],
      width: 300,
      align: "center",
      key: "from_name",
      render: (val, record) => (
        <>
          <MainTableData onClick={() => handleViewWarehouse(record)}>
            {val}
          </MainTableData>
          <SubTableData>"Khách Hàng"</SubTableData>
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
        <div>Quản lý hóa đơn cửa hàng</div>
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
            textEmpty="Chưa có hóa đơn nào"
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
          onOk={() => getAllInvoice()}
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
          id={managerId}
          open={openInsertUpdateInvoices}
          onCancel={() => setOpenInsertUpdateInvoices(false)}
          onOk={() => getAllInvoice()}
        />
      )}
      {!!openUpdateInvoices && (
        <UpdateInvoice
          open={openUpdateInvoices}
          onCancel={() => setOpenUpdateInvoices(false)}
          onOk={() => getAllInvoice()}
          invoice={selectedInvoice}
          id={managerId}
        />
      )}
    </SpinCustom>
  )
}

export default ManageInvoiceManager

