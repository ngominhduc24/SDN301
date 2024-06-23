import { Col, Row, Space, Tooltip, Modal } from "antd"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import CB1 from "src/components/Modal/CB1"
import Button from "src/components/MyButton/Button"
import ButtonCircle from "src/components/MyButton/ButtonCircle"
import Notice from "src/components/Notice"
import TableCustom from "src/components/Table/CustomTable"
import SearchAndFilter from "./components/SearchAndFilter"
import ModalViewManager from "./components/ModalViewManager"
import ModalViewStore from "./components/ModalViewStore"
import moment from "moment"
import SpinCustom from "src/components/Spin"
import WarehouseManagerService from "src/services/WarehouseManagerService"

const ManageStore = () => {
  const [shopList, setShopList] = useState([])
  const [total, setTotal] = useState(0)

  const [openViewStore, setOpenViewStore] = useState(false)
  const [openViewManager, setOpenViewManager] = useState(false)
  const [selectedStore, setSelectedStore] = useState(null)
  const [selectedManager, setSelectedManager] = useState(null)
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
    getShopList()
  }, [pagination])

  const getShopList = async () => {
    try {
      setLoading(true)
      const res = await WarehouseManagerService.getShopList()
      console.log("API Response:", res)
      if (res?.isError) {
        console.error("Error fetching warehouse info:", res.message)
        return
      }
      setShopList(res)
      setTotal(res.length)
    } catch (error) {
      console.error("Error in getWarehouseInfo:", error)
    } finally {
      setLoading(false)
    }
  }

  const listBtn = record => [
    {
      isEnable: true,
      name: "Xem sản phẩm ",
      icon: "eye",
      onClick: () => {
        setSelectedStore(record)
        setOpenViewStore(true)
        console.log("Products:", record)
      },
    },
    // {
    //   isEnable: true,
    //   name: "Chỉnh sửa",
    //   icon: "edit-green",
    //   onClick: () => setOpenInsertUpdateProducts(record),
    // },
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
      key: "name",
    },
    {
      title: "Địa chỉ",
      dataIndex: "location",
      width: 200,
      key: "location",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      width: 120,
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      width: 120,
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
            record.status === "open" ? "blue-text" : "red-text",
          ].join(" ")}
        >
          {record.status === "open" ? "Đang hoạt động" : "Dừng Hoạt Động"}
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

  return (
    <SpinCustom spinning={loading}>
      <div className="title-type-1 d-flex justify-content-space-between align-items-center mt-12 mb-30">
        <div>Xem danh sách các cửa hàng</div>
        <div>
          {/* <Button
            btntype="third"
          >
            Thêm mới
          </Button> */}
        </div>
      </div>
      <SearchAndFilter pagination={pagination} setPagination={setPagination} />
      <Row>
        <Col span={24} className="mt-30 mb-20">
          <TableCustom
            isPrimary
            rowKey="_id"
            columns={column}
            textEmpty="Chưa có sản phẩm nào trong kho"
            dataSource={shopList}
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
      {!!openViewStore && selectedStore && (
        <ModalViewStore
          visible={openViewStore}
          onCancel={() => setOpenViewStore(false)}
          store={selectedStore}
        />
      )}
      {!!openViewManager && selectedManager && (
        <ModalViewManager
          visible={openViewManager}
          onCancel={() => setOpenViewManager(false)}
          manager={selectedManager}
        />
      )}
    </SpinCustom>
  )
}

export default ManageStore

