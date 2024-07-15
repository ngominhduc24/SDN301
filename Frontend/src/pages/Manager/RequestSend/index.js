import { Col, Row, Space, Tooltip, Modal, Switch } from "antd"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Button from "src/components/MyButton/Button"
import ButtonCircle from "src/components/MyButton/ButtonCircle"
import Notice from "src/components/Notice"
import TableCustom from "src/components/Table/CustomTable"
import SearchAndFilter from "./components/SearchAndFilter"
import ModalViewDetailRequest from "./components/ModalViewDetailRequest"
import moment from "moment"
import SpinCustom from "src/components/Spin"
import WarehouseManagerService from "src/services/WarehouseManagerService"
import ManagerService from "src/services/ManagerService"
import InsertUpdateRequest from "./components/InsertUpdateRequest"
import ModalViewWarehouse from "./components/ModalViewWarehouse"
import ModalViewStore from "./components/ModalViewStore"
import STORAGE, { getStorage, setStorage } from "src/lib/storage"
import UpdateInvoice from "./components/UpdateRequest"
import dayjs from "dayjs"
import {
  MainTableData,
  MainTableHeader,
  SubTableData,
  SubTableHeader,
} from "src/components/Table/CustomTable/styled"
import UpdateRequest from "./components/UpdateRequest"

const ManagerRequestSend = () => {
  const [request, setRequest] = useState([])
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [loading, setLoading] = useState(false)
  const [openInsertUpdateRequest, setOpenInsertUpdateRequest] = useState(false)
  const [openUpdateRequest, setOpenUpdateRequest] = useState(false)
  const [openViewRequest, setOpenViewRequest] = useState(false)
  const [selectedWarehouse, setSelectedWarehouse] = useState(null)
  const [selectedStore, setSelectedStore] = useState(null)
  const [openViewWarehouse, setOpenViewWarehouse] = useState(false)
  const [openViewStore, setOpenViewStore] = useState(false)
  const { userInfo } = useSelector(state => state.appGlobal)
  const [shopId, setShopId] = useState(null)
  const [infoWareHouse, setInfoWareHouse] = useState(null)
  const managerId = localStorage.getItem(STORAGE.USER_ID)
  const [pagination, setPagination] = useState({
    PageSize: 10,
    CurrentPage: 1,
    TextSearch: "",
    ApproveStatus: 0,
    Status: 0,
  })

  useEffect(() => {
    getAllShopRequest()
    getWarehouseInfo()
  }, [pagination])

  const getWarehouseInfo = async () => {
    try {
      setLoading(true)
      const res = await WarehouseManagerService.getInfoWareHouse()
      if (res?.isError) return
      setInfoWareHouse(res)
    } catch (error) {
      console.error("Error fetching warehouse info:", error)
    } finally {
      setLoading(false)
    }
  }
  const getAllShopRequest = async () => {
    try {
      setLoading(true)
      const managerRequest = await ManagerService.getRequestShop(
        "666da2c059207cb17349144a",
      )

      console.log("API Response:", managerRequest)
      if (managerRequest?.isError) {
        console.error("Error fetching warehouse info:", managerRequest.message)
        return
      }
      setRequest(managerRequest)
      setShopId("666da2c059207cb17349144a")
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
        name: "Xem chi tiết yêu cầu",
        icon: "eye",
        onClick: () => {
          setSelectedRequest(record)
          setOpenViewRequest(true)
          console.log("Products:", record)
        },
      },
    ]

    if (record.status !== "rejected" && record.status !== "completed") {
      buttons.push({
        isEnable: true,
        name: "Chỉnh sửa",
        icon: "edit-green",
        onClick: () => {
          setSelectedRequest(record)
          setOpenUpdateRequest(true)
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
          <MainTableHeader>Tên kho đến</MainTableHeader>
          <SubTableHeader>Số điện thoại</SubTableHeader>
          <SubTableHeader>Email</SubTableHeader>
        </>
      ),
      // dataIndex: ["from", "name"],
      width: 300,
      align: "center",
      // key: "from_name",
      render: (val, record) => (
        <>
          <MainTableData>{/* {val} */} Tổng kho đến</MainTableData>
          <SubTableData>{record.from?.phone}</SubTableData>
          <SubTableData>{record.from?.email}</SubTableData>
        </>
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
          <SubTableData>{record.to?.phone}</SubTableData>
          <SubTableData>{record.to?.email}</SubTableData>
        </>
      ),
    },
    {
      title: "Sản phẩm yêu cầu",
      dataIndex: "details",
      width: 200,
      align: "center",
      key: "details",
      render: details => (
        <div>
          {details.map(item => (
            <div key={item._id}>{item.productId.name}</div>
          ))}
        </div>
      ),
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
      title: "Trạng thái yêu cầu",
      dataIndex: "status",
      align: "center",
      width: 150,
      key: "status",
      render: (_, record) => (
        <span
          className={[
            "no-color",
            record?.status === "pending" ? "blue-text" : "",
            record?.status === "completed" ? "green-text" : "",
            record?.status === "rejected" ? "red" : "",
            record?.status === "accepted" || record?.status === "updated"
              ? "blue-text"
              : "", // Đặt màu xanh cho trạng thái "accepted" và "updated"
          ].join(" ")}
        >
          {record?.status === "pending"
            ? "Đang chờ xác nhận"
            : record?.status === "completed"
            ? "Đã hoàn thành"
            : record?.status === "rejected"
            ? "Đã hủy"
            : record?.status === "accepted"
            ? "Đã chấp nhận"
            : record?.status === "updated"
            ? "Đã cập nhật"
            : "Không xác định"}
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
        <div>Yêu cầu tạo hóa đơn đến kho</div>
        <div>
          <Button
            btntype="third"
            onClick={() => setOpenInsertUpdateRequest(true)}
          >
            Tạo mới yêu cầu hóa đơn
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
            textEmpty="Chưa có yêu cầu nào"
            dataSource={request}
            scroll={{ x: "800px" }}
            pagination={{
              hideOnSinglePage: request.length <= 10,
              current: pagination?.CurrentPage,
              pageSize: pagination?.PageSize,
              responsive: true,
              total: request.length,
              locale: { items_per_page: "" },
              showSizeChanger: request.length > 10,
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
      {!!openViewRequest && selectedRequest && (
        <ModalViewDetailRequest
          open={openViewRequest}
          visible={openViewRequest}
          onCancel={() => setOpenViewRequest(false)}
          data={selectedRequest}
          onOk={() => getAllShopRequest()}
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
      {!!openInsertUpdateRequest && (
        <InsertUpdateRequest
          managerId={managerId}
          id={shopId}
          open={openInsertUpdateRequest}
          onCancel={() => setOpenInsertUpdateRequest(false)}
          onOk={() => getAllShopRequest()}
        />
      )}
      {!!openUpdateRequest && selectedRequest && (
        <UpdateRequest
          open={openUpdateRequest}
          onCancel={() => setOpenUpdateRequest(false)}
          onOk={() => getAllShopRequest()}
          request={selectedRequest}
          managerId={managerId}
          id={shopId}
        />
      )}
    </SpinCustom>
  )
}

export default ManagerRequestSend

