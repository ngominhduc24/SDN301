import { UserOutlined } from "@ant-design/icons"
import { Anchor, Avatar, Col, Divider, Row, Space, Tooltip } from "antd"
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
import TreeAnchor from "./components/TreeAnchor"
import ImportUser from "./modal/ImportUser"
import ModalInsertUpdate from "./modal/InsertUpdate"
import UserDetail from "./modal/UserDetail"
import { ListUserStyled } from "./styled"
import { getListComboByKey } from "src/lib/utils"
import { SYSTEM_KEY } from "src/constants/constants"
import { useSelector } from "react-redux"

const ManageUser = () => {
  const [dataSource, setDataSource] = useState([])
  const [total, setTotal] = useState([])
  const { listSystemKey } = useSelector(state => state.appGlobal)
  const [pagination, setPagination] = useState({
    PageSize: 20,
    CurrentPage: 1,
    TextSearch: "",
  })

  const [loading, setLoading] = useState(false)
  const [openInsertUpdate, setOpenInsertUpdate] = useState(false)
  const [openImportUser, setOpenImportUser] = useState(false)
  const [detailInfo, setDetailInfo] = useState()
  const [listButtonShow, setListButtonShow] = useState()
  const [selectedNode, setSelectedNote] = useState()
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
      dataIndex: "FullName",
      key: "FullName",
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
      dataIndex: "PhoneNumber",
      key: "PhoneNumber",
      align: "center",
      render: (val, record) => (
        <>
          <MainTableData>{record?.Email}</MainTableData>
          <SubTableData>{val}</SubTableData>
        </>
      ),
    },
    {
      title: "Nhóm quyền",
      dataIndex: "RoleName",
      key: "RoleName",
      width: 180,
      render: text => (
        <Tooltip
          title={
            text?.length
              ? text?.map((i, idx) => (
                  <span key={`RoleNametooltip${idx}`}>
                    {i}
                    {!!(idx > 0 && idx < text?.length - 1) && " | "}
                  </span>
                ))
              : ""
          }
        >
          <div className="max-line2">
            {text?.length &&
              text?.map((i, idx) => (
                <span key={`RoleName${idx}`}>
                  {!!(idx > 0) && " | "}
                  {i}
                </span>
              ))}
          </div>
        </Tooltip>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "Status",
      key: "Status",
      width: 160,
      render: (text, record) => (
        <div className="d-flex justify-content-center align-items-center mh-36">
          <div className="text-center">
            {text === 1 ? "Đang hoạt động" : "Dừng hoạt động"}
          </div>
          <FloatActionWrapper size="small" className="float-action__wrapper">
            {renderListButton(record)}
          </FloatActionWrapper>
        </div>
      ),
    },
  ]
  useEffect(() => {
    if (!!selectedNode?.DepartmentID) {
      // getAllUser()
    }
  }, [pagination])
  useEffect(() => {
    setPagination(pre => ({ ...pre, CurrentPage: 1 }))
  }, [selectedNode])
  // const onReset = async UserID => {
  //   const res = await UserService.resetPassword({ UserID: UserID })
  //   if (res?.isError) return
  //   Notice({ msg: "Reset mật khẩu thàng công !" })
  // }
  const renderListButton = record => (
    <Space>
      {!!listButtonShow?.IsUpdate && (
        <ButtonCircle
          title="Cập nhật"
          iconName="edit"
          onClick={() => {
            setOpenInsertUpdate(true)
            setDetailInfo(record)
          }}
        />
      )}
      {!!listButtonShow?.IsDelete && (
        <ButtonCircle
          title="Xóa"
          iconName="bin"
          onClick={() => {
            CB1({
              title: `Bạn có chắc chắn muốn xoá người dùng
              <strong> ${record?.UserName}</strong> không?`,
              icon: "warning-usb",
              okText: "Đồng ý",
              onOk: async close => {
                // onDeleteUser(record?.UserID)
                close()
              },
            })
          }}
        />
      )}
      {!!listButtonShow?.IsResetPass && (
        <ButtonCircle
          title="Reset mật khẩu"
          iconName="reset-pass"
          style={{ background: "#fff" }}
          onClick={() =>
            CB1({
              title: `Bạn có chắc chắn muốn Reset mật khẩu tài khoản ${record?.UserName} không?`,
              icon: "warning-usb",
              okText: "Đồng ý",
              onOk: async close => {
                // onReset(record?.UserID)
                close()
              },
            })
          }
        />
      )}
    </Space>
  )

  // const onDeleteUser = async UserID => {
  //   try {
  //     const res = await UserService.deleteUser({ UserID })
  //     if (res?.isError) return
  //     Notice({ msg: "Xóa người dùng thành công !" })
  //     getAllUser()
  //   } finally {
  //   }
  // }

  // const getAllUser = async () => {
  //   try {
  //     setLoading(true)
  //     const res = await UserService.getAllUserByDept({
  //       ...pagination,
  //       DepartmentID: selectedNode?.DepartmentID,
  //     })
  //     setListButtonShow(res?.Object?.ButtonShows)
  //     setDataSource(res?.Object?.lt || [])
  //     setTotal(res?.Object?.Total || [])
  //     // setDataSource(
  //     //   res?.Object?.Data?.length
  //     //     ? res?.Object?.Data?.map(i => ({
  //     //         ...i,
  //     //         UserInfoOutputList: i?.UserInfoOutputList,
  //     //       }))
  //     //     : [],
  //     // )
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  const fakeData = [
    {
      UserID: 1,
      UserName: "user1",
      FullName: "User One",
      Email: "user1@example.com",
      PhoneNumber: "1234567890",
      RoleName: ["Admin", "User"],
      Status: 1,
    },
    {
      UserID: 2,
      UserName: "user2",
      FullName: "User Two",
      Email: "user2@example.com",
      PhoneNumber: "1234567890",
      RoleName: ["User"],
      Status: 0,
    },
    // Add more fake data if needed
  ]
  // const exportUser = async () => {
  //   try {
  //     const res = await UserService.exportUser({
  //       DepartmentID: selectedNode?.DepartmentID,
  //     })
  //     const href = URL.createObjectURL(res)
  //     const link = document.createElement("a")
  //     link.href = href
  //     link.setAttribute("download", "danh sách nhân viên.xlsx") //or any other extension
  //     document.body.appendChild(link)
  //     link.click()
  //     // clean up "a" element & remove ObjectURL
  //     document.body.removeChild(link)
  //     URL.revokeObjectURL(href)
  //   } finally {
  //   }
  // }
  return (
    <ListUserStyled>
      <div>
        <Search setPagination={setPagination} pagination={pagination} />
        <Divider className="mv-16" />
        <div className="title-type-1 d-flex justify-content-space-between align-items-center pb-16 pt-0 mb-16">
          <div className="fs-24">Danh sách nhân viên</div>
          <Row gutter={[16, 16]}>
            {!!listButtonShow?.IsInsert && (
              <Col>
                <Button
                  btntype="primary"
                  className="btn-hover-shadow"
                  onClick={() => setOpenInsertUpdate(selectedNode || true)}
                >
                  Thêm nhân viên
                </Button>
              </Col>
            )}
            {!!listButtonShow?.IsExcel && (
              <Col>
                <Button
                  // onClick={exportUser}
                  className="btn-hover-shadow"
                  btntype="third"
                >
                  Xuất Excel
                </Button>
              </Col>
            )}
          </Row>
        </div>
      </div>
      <Anchor
        affix={false}
        getContainer={() => document.getElementById("body-admin-scroll")}
      >
        <Row gutter={[16, 16]}>
          <Col style={{ width: 300 }}>
            <TreeAnchor
              selectedNode={selectedNode}
              setSelectedNote={setSelectedNote}
              keyId={2}
            />
          </Col>
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
                dataSource={fakeData}
                columns={columns}
                textEmpty="Không có nhân viên"
                rowKey="UserID"
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
              {/* {dataSource?.length > 0 &&
                dataSource?.map(i => (
                  <div key={`anchor-item${i?.DepartmentID}`}>
                    <div
                      id={i?.DepartmentID}
                      className="fs-16 fw-600 mt-10 mb-10"
                    >
                      {i?.DepartmentName}
                    </div>
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
                      dataSource={i?.UserInfoOutputList}
                      columns={columns}
                      textEmpty="Không có nhân viên"
                      pagination={false}
                      rowKey="UserID"
                      sticky={{ offsetHeader: -12 }}
                      scroll={{ x: "800px" }}
                    />
                  </div>
                ))} */}
            </SpinCustom>
          </Col>
        </Row>
      </Anchor>
      {!!openInsertUpdate && (
        <ModalInsertUpdate
          open={openInsertUpdate}
          detailInfo={detailInfo}
          // onOk={getAllUser}
          onCancel={() => {
            setDetailInfo(undefined)
            setOpenInsertUpdate(false)
          }}
        />
      )}

      {!!openImportUser && (
        <ImportUser
          open={openImportUser}
          onCancel={() => setOpenImportUser(false)}
          // onOk={getAllUser}
          department={selectedNode}
        />
      )}

      {!!openModalUserDetail && (
        <UserDetail
          open={openModalUserDetail}
          onCancel={() => setOpenModalUserDetail(false)}
          onOk={() => setPagination(pre => ({ ...pre }))}
          department={selectedNode}
          listButtonShow={listButtonShow}
        />
      )}
    </ListUserStyled>
  )
}

export default ManageUser
