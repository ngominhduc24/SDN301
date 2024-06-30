import { Col, Row, Space, Tooltip } from "antd"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import CB1 from "src/components/Modal/CB1"
import Button from "src/components/MyButton/Button"
import ButtonCircle from "src/components/MyButton/ButtonCircle"
import Notice from "src/components/Notice"
import TableCustom from "src/components/Table/CustomTable"
import { SYSTEM_KEY } from "src/constants/constants"
import { getListComboByKey } from "src/lib/utils"
import SearchAndFilter from "./components/SearchAndFilter"
import InsertUpdateProgram from "./components/InsertUpdateProgram"
import moment from "moment"
import SpinCustom from "src/components/Spin"
import AdminServices from "src/services/AdminService"
import ModalViewStore from "./components/ModalViewStore"

const ManageStore = () => {
  const [stores, setStores] = useState([]);
  const [total, setTotal] = useState(0)
  const [buttonShow, setButtonShow] = useState()
  const [openInsertUpdateBooking, setOpenInsertUpdateBooking] = useState(false)
  const [openViewStore, setOpenViewStore] = useState(false)
  const [openViewManager, setOpenViewManager] = useState(false)
  const [selectedStore, setSelectedStore] = useState(null)
  const [selectedManager, setSelectedManager] = useState(null)
  const [loading, setLoading] = useState(false)
  const { listSystemKey } = useSelector(state => state.appGlobal)
  const { userInfo } = useSelector(state => state.appGlobal)
  const [pagination, setPagination] = useState({
    PageSize: 10,
    CurrentPage: 1,
    TextSearch: "",
    ApproveStatus: 0,
    Status: 0,
  })

  useEffect(() => {getAllShops()}, [pagination])

  const getAllShops = async() => {
    try {
      setLoading(true);
      const shopList = await AdminServices.getAllStores()
      if(shopList?.isError){
        console.error("Error fetching store list", shopList.message)
        return;
      }
     setStores(shopList);
     setTotal(shopList.length);
    } catch (error) {
      console.log("error");
    }finally{
      setLoading(false);
    }
  }

  const listBtn = record => [
    {
      isEnable: true,
      name: "Xem cửa hàng",
      icon: "eye",
      onClick: () => {setSelectedStore(record);
        console.log('store', record);
        setOpenViewStore(true);
    }
    },
    {
      isEnable: true,
      name: "Chỉnh sửa",
      icon: "edit-green",
      onClick: () => setOpenInsertUpdateBooking(record),
    },
    {
      isEnable: true,
      name: "Xóa",
      icon: "delete-red-row",
      onClick: () =>
        CB1({
          record,
          title: `bạn chắc chắn muốn xóa?`,
          icon: "warning-usb",
          okText: "Có",
          cancelText: "Không",
          onOk: async close => {
            // handleDeleteBooking(record)
            close()
          },
        }),
    },
  ]

  const column = [
    {
      title: "STT",
      key: "_id",
      width: 60,
      render: (_, record, index) => (
        <div className="text-center">{index + 1}</div>
      ),
    },
    {
      title: "Tên cửa hàng",
      dataIndex: "name",
      width: 200,
      key: "storeName",
    },
    {
      title: "Địa chỉ cửa hàng",
      dataIndex: "location",
      width: 200,
      key: "address",
      // render: (_, record) => (
      //   <span>{moment(record?.StartDate).format("DD/MM/YYYY HH:mm")}</span>
      // ),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      width: 120,
      key: "phoneNumber",
    },
    {
      title: "Email",
      dataIndex: "email",
      width: 120,
      align: "center",
      key: "email",
    },
    {
      title: "Manager",
      dataIndex: ["manager", "email"],
      width: 120,
      key: "managerEmail",
      render: (text, record) => (
        <Tooltip title="Click to view manager details">
          <span
            className="link"
            onClick={() => {
              setSelectedManager(record.manager)
              setOpenViewManager(true)
            }}
          >
            {text}
          </span>
        </Tooltip>
      ),
    },
    {
      title: "Trạng thái hoạt động",
      dataIndex: "status",
      align: "center",
      width: 100,
      key: "status",
      render: (_, record) => (
        <span
          className={[
            "no-color",
            record?.status === "open" ? "blue-text" : "red-text",
          ].join(" ")}
        >
          {record?.status === "open" ? "Đang mở cửa" : "Đóng cửa"}
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
  // const fakeData = [
  //   {
  //     StoreID: 1,
  //     StoreName: "user1",
  //     Address: "User One",
  //     Email: "user1@example.com",
  //     PhoneNumber: "1234567890",
  //     OperatingHours: "",
  //     Status: 1,
  //   },
  //   {
  //     StoreID: 2,
  //     StoreName: "user2",
  //     Address: "User One",
  //     Email: "user1@example.com",
  //     PhoneNumber: "1234567890",
  //     OperatingHours: "",
  //     Status: 1,
  //   },
  // ]

  return (
    <SpinCustom spinning={loading}>
      <div className="title-type-1 d-flex justify-content-space-between align-items-center mt-12 mb-30">
        <div>Quản lý cửa hàng</div>
        <div>
          <Button
            btntype="third"
            onClick={() => setOpenInsertUpdateBooking(true)}
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
            rowKey="_id"
            columns={column}
            textEmpty="Chưa có cửa hàng nào"
            dataSource={stores}
            scroll={{ x: "800px" }}
            onRow={record => {
              return {
                onClick: () => {
                  setOpenViewStore(record)
                },
              }
            }}
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
      {!!openInsertUpdateBooking && (
        <InsertUpdateProgram
          open={openInsertUpdateBooking}
          // onOk={() => getListBookings()}
          onCancel={() => setOpenInsertUpdateBooking(false)}
          onOk={() => getAllShops()}
        />
      )}
      {!!openViewStore && (
        <ModalViewStore
          open={openViewStore}
          // onOk={() => getListBookings()}
          // handleDeleteBooking={handleDeleteBooking}
          onCancel={() => setOpenViewStore(false)}
          store={selectedStore}
          buttonShow={buttonShow}
        />
      )}
    </SpinCustom>
  )
}

export default ManageStore

