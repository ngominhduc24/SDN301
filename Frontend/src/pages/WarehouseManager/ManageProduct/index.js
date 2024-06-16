import { Col, Row, Space } from "antd"
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
import ModalViewProgram from "./components/ModalViewProgram"
import moment from "moment"
import SpinCustom from "src/components/Spin"

const ManageProduct = () => {
  const [bookings, setBookings] = useState([])
  const [total, setTotal] = useState(0)
  const [buttonShow, setButtonShow] = useState()
  const [openInsertUpdateBooking, setOpenInsertUpdateBooking] = useState(false)
  const [openViewBooking, setOpenViewBooking] = useState(false)
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

  useEffect(() => {}, [pagination])

  const listBtn = record => [
    {
      isEnable: true,
      name: "Duyệt chương trình",
      icon: "eye",
      // onClick: () => approveMeet(record),
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
      key: "StoreID",
      width: 60,
      render: (_, record, index) => (
        <div className="text-center">{index + 1}</div>
      ),
    },
    {
      title: "Tên cửa hàng",
      dataIndex: "StoreName",
      width: 200,
      key: "StoreName",
    },
    {
      title: "Địa chỉ cửa hàng",
      dataIndex: "Address",
      width: 200,
      key: "Address",
      render: (_, record) => (
        <span>{moment(record?.StartDate).format("DD/MM/YYYY HH:mm")}</span>
      ),
    },
    {
      title: "Số điện thoại",
      dataIndex: "PhoneNumber",
      width: 120,
      key: "PhoneNumber",
      render: (_, record) => <span>{userInfo?.FullName}</span>,
    },
    {
      title: "Email",
      dataIndex: "Email",
      width: 120,
      align: "center",
      key: "Email",
    },
    {
      title: "Thời gian làm việc",
      dataIndex: "OperatingHours",
      width: 120,
      key: "OperatingHours",
      render: (_, record) => <span>{userInfo?.FullName}</span>,
    },
    {
      title: "Trạng thái hoạt động",
      dataIndex: "Status",
      align: "center",
      width: 100,
      key: "Status",
      render: (_, record) => (
        <span
          className={[
            "no-color",
            record?.Status === 1 ? "blue-text" : "red-text",
          ].join(" ")}
        >
          {record?.Status === 1 ? "Đang hoạt động" : "Dừng Hoạt Động"}
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
  const fakeData = [
    {
      StoreID: 1,
      StoreName: "user1",
      Address: "User One",
      Email: "user1@example.com",
      PhoneNumber: "1234567890",
      OperatingHours: "",
      Status: 1,
    },
    {
      StoreID: 2,
      StoreName: "user2",
      Address: "User One",
      Email: "user1@example.com",
      PhoneNumber: "1234567890",
      OperatingHours: "",
      Status: 1,
    },
  ]

  return (
    <SpinCustom spinning={loading}>
      <div className="title-type-1 d-flex justify-content-space-between align-items-center mt-12 mb-30">
        <div>Quản lý tổng sản phẩm</div>
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
            rowKey="BookingID"
            columns={column}
            textEmpty="Chưa có cửa hàng nào"
            dataSource={fakeData}
            scroll={{ x: "800px" }}
            onRow={record => {
              return {
                onClick: () => {
                  setOpenViewBooking(record)
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
        />
      )}
      {!!openViewBooking && (
        <ModalViewProgram
          open={openViewBooking}
          // onOk={() => getListBookings()}
          // handleDeleteBooking={handleDeleteBooking}
          onCancel={() => setOpenViewBooking(false)}
          buttonShow={buttonShow}
        />
      )}
    </SpinCustom>
  )
}

export default ManageProduct

