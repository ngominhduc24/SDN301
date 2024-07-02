import { UserOutlined } from "@ant-design/icons"
import { Anchor, Avatar, Col, Divider, Row, Space, Tooltip, Switch } from "antd"
import { useEffect, useState } from "react"
import { FloatActionWrapper } from "src/components/FloatAction/styles"
import CB1 from "src/components/Modal/CB1"
import Button from "src/components/MyButton/Button"
import ButtonCircle from "src/components/MyButton/ButtonCircle"
import Notice from "src/components/Notice"
import SpinCustom from "src/components/Spin"
import TableCustom from "src/components/Table/CustomTable"
import {
  MainTableData,
  MainTableHeader,
  SubTableData,
  SubTableHeader,
} from "src/components/Table/CustomTable/styled"
import Search from "./components/Search"
import ImportUser from "./modal/ImportUser"
import ModalInsertUpdate from "./modal/InsertUpdate"
import UserDetail from "./modal/UserDetail"
import { ListUserStyled } from "./styled"
import { useSelector } from "react-redux"
import ManagerService from "src/services/ManagerService"
import STORAGE, { deleteStorage, getStorage } from "src/lib/storage"

const ManageUser = () => {
  const [dataSource, setDataSource] = useState([])
  const [total, setTotal] = useState(0)
  const [pagination, setPagination] = useState({
    PageSize: 20,
    CurrentPage: 1,
    TextSearch: "",
  })

  const [loading, setLoading] = useState(false)
  const [openInsertUpdate, setOpenInsertUpdate] = useState(false)
  const [openImportUser, setOpenImportUser] = useState(false)
  const [detailInfo, setDetailInfo] = useState()
  const [selectedNode, setSelectedNode] = useState()
  const [selectedUser, setSelectedUser] = useState()
  const [openModalUserDetail, setOpenModalUserDetail] = useState(false)

  const columns = [
    {
      title: "STT",
      dataIndex: "Index",
      key: "Index",
      width: 60,
      align: "center",
      render: (value, record, idx) => idx + 1,
    },
    {
      title: "Ảnh",
      dataIndex: "Avatar",
      key: "Avatar",
      render: value => <Avatar src={value} icon={<UserOutlined />} size={40} />,
      width: 60,
      align: "center",
    },
    {
      title: (
        <>
          <MainTableHeader>Tài khoản</MainTableHeader>
          <SubTableHeader>Họ tên</SubTableHeader>
        </>
      ),
      dataIndex: "fullname",
      key: "fullname",
      align: "center",
      render: (val, record) => (
        <>
          <MainTableData>{record?.UserName}</MainTableData>
          <SubTableData>{val}</SubTableData>
        </>
      ),
    },
    {
      title: (
        <>
          <MainTableHeader>Email</MainTableHeader>
          <SubTableHeader>Số điện thoại</SubTableHeader>
        </>
      ),
      dataIndex: "email",
      key: "email",
      align: "center",
      render: (val, record) => (
        <>
          <MainTableData>{val}</MainTableData>
          <SubTableData>{record?.PhoneNumber}</SubTableData>
        </>
      ),
    },
    {
      title: (
        <>
          <MainTableHeader>Ngày sinh</MainTableHeader>
        </>
      ),
      dataIndex: "dob",
      key: "dob",
      align: "center",
      render: val => <MainTableData>{val}</MainTableData>,
    },
    {
      title: (
        <>
          <MainTableHeader>Lương</MainTableHeader>
        </>
      ),
      dataIndex: "salary",
      key: "salary",
      align: "center",
      render: val => <MainTableData>{val}</MainTableData>,
    },
    {
      title: "Nhóm quyền",
      dataIndex: "role",
      key: "role",
      width: 180,
      render: text => (
        <Tooltip title={text}>
          <span>{text}</span>
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
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 160,
      render: text => (
        <div className="d-flex justify-content-center align-items-center mh-36">
          <div className="text-center">
            {text === "active" ? "Đang hoạt động" : "Dừng hoạt động"}
          </div>
        </div>
      ),
    },
    {
      title: "Chức năng",
      align: "center",
      key: "Action",
      width: 100,
      render: (_, record) => <Space>{renderListButton(record)}</Space>,
    },
  ]

  const renderListButton = record => (
    {
      isEnable: true,
      name: "Xem sản phẩm ",
      icon: "eye",
      onClick: () => {
        setSelectedUser(record)
        setOpenModalUserDetail(true)
        console.log("Products:", record)
      },
    },
    (
      <Space>
        <ButtonCircle
          title="Cập nhật"
          iconName="edit"
          onClick={e => {
            setOpenInsertUpdate(true)
            setDetailInfo(record)
          }}
        />

        <ButtonCircle
          title="Reset mật khẩu"
          iconName="reset-pass"
          style={{ background: "#fff" }}
          onClick={e => {
            CB1({
              title: `Bạn có chắc chắn muốn Reset mật khẩu tài khoản ${record?.UserName} không?`,
              icon: "warning-usb",
              okText: "Đồng ý",
              onOk: async close => {
                // onReset(record?.UserID)
                close()
              },
            })
          }}
        />
      </Space>
    )
  )

  const toggleStatus = async (userId, checked) => {
    setLoading(true)
    try {
      const updatedStatus = checked ? "active" : "inactive"
      await ManagerService.updateStatusStaff(userId, { status: updatedStatus })
      const updatedDataSource = dataSource.map(user =>
        user._id === userId ? { ...user, status: updatedStatus } : user,
      )
      setDataSource(updatedDataSource)
      Notice({
        isSuccess: true,
        msg: "Cập nhật trạng thái thành công",
      })
    } catch (error) {
      Notice({
        isSuccess: true,
        msg: "Cập nhật trạng thái thất bại",
      })
    } finally {
      setLoading(false)
    }
  }

  const getAllUser = async () => {
    try {
      setLoading(true)
      const res = await ManagerService.getListStaff()
      console.log(res)
      setDataSource(res)
      setTotal(res?.length)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getAllUser()
  }, [pagination])

  return (
    <ListUserStyled>
      <div>
        <Search setPagination={setPagination} pagination={pagination} />
        <Divider className="mv-16" />
        <div className="title-type-1 d-flex justify-content-space-between align-items-center pb-16 pt-0 mb-16">
          <div className="fs-24">Danh sách nhân viên</div>
          <Row gutter={[16, 16]}>
            <Col>
              <Button
                btntype="primary"
                className="btn-hover-shadow"
                onClick={() => setOpenInsertUpdate(selectedNode || true)}
              >
                Thêm nhân viên
              </Button>
            </Col>

            <Col>
              <Button
                // onClick={exportUser}
                className="btn-hover-shadow"
                btntype="third"
              >
                Xuất Excel
              </Button>
            </Col>
          </Row>
        </div>
      </div>
      <Anchor
        affix={false}
        getContainer={() => document.getElementById("body-admin-scroll")}
      >
        <Row gutter={[16, 16]}>
          <Col style={{ width: 0 }} flex="auto">
            <SpinCustom spinning={loading}>
              <TableCustom
                isPrimary
                onRow={record => {
                  return {
                    onClick: () => {
                      setOpenModalUserDetail(record)
                    },
                  }
                }}
                className="mb-6"
                dataSource={dataSource}
                columns={columns}
                textEmpty="Không có nhân viên"
                rowKey="_id"
                sticky={{ offsetHeader: -12 }}
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
            </SpinCustom>
          </Col>
        </Row>
      </Anchor>
      {!!openInsertUpdate && (
        <ModalInsertUpdate
          open={openInsertUpdate}
          detailInfo={detailInfo}
          onOk={getAllUser}
          onCancel={() => {
            setDetailInfo(undefined)
            setOpenInsertUpdate(false)
          }}
        />
      )}
      {!!openImportUser && (
        <ImportUser
          open={openImportUser}
          onOk={getAllUser}
          onCancel={() => setOpenImportUser(false)}
        />
      )}
      {!!openModalUserDetail && (
        <UserDetail
          onOk={getAllUser}
          open={!!openModalUserDetail}
          data={openModalUserDetail}
          onCancel={() => setOpenModalUserDetail(undefined)}
        />
      )}
    </ListUserStyled>
  )
}

export default ManageUser
