import { Col, Divider, Image, Row } from "antd"
import moment from "moment"
import { useEffect, useState } from "react"
import CB1 from "src/components/Modal/CB1"
import CustomModal from "src/components/Modal/CustomModal"
import Button from "src/components/MyButton/Button"
import Notice from "src/components/Notice"
import styled from "styled-components"
import ModalInsertUpdate from "./InsertUpdate"
import { FAILBACK } from "src/constants/constants"
import AdminServices from "src/services/AdminService"
import STORAGE, { getStorage } from "src/lib/storage"

const StyledUserDetail = styled.div`
  .img-user {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .account-name {
    text-align: center;
    font-size: 24px;
    font-weight: bold;
  }
  .position {
    text-align: center;
  }
  .div-divider {
    display: flex;
    justify-content: center;
    align-items: center;
    .ant-divider-horizontal {
      width: 50%;
      min-width: 50%;
    }
  }
`
const UserDetail = ({ open, onCancel, onOk, listButtonShow, userId }) => {
  const [loading, setLoading] = useState(false)
  const [openInsert, setOpenInsert] = useState(false)
  const [customerInfo, setCustomerInfo] = useState(false)
  const [userInfo, setUserInfo] = useState({})
  // const UserID = getStorage(STORAGE.USER_ID)
  useEffect(() => {
    if(userId){
      getUserDetail(userId)
    }
    
  }, [userId])

  const getUserDetail = async (id) => {
    try {
      setLoading(true)
      const res = await AdminServices.getManagerById(id)
      setUserInfo(res)
    } catch (error) {
      console.log("error");
    }finally{
      setLoading(false)
    }
  }
  // const getUserDetail = async () => {
  //   try {
  //     setLoading(true)
  //     const res = await UserService.detailUser(open?.UserID)
  //     if (res?.isError) return
  //     setCustomerInfo(res?.Object)
  //   } finally {
  //     setLoading(false)
  //   }
  // }
  const footer = (
    <div className="d-flex justify-content-space-between align-item-center">
      <div>
        {/* {!!listButtonShow?.IsUpdate && (
          <Button
            loading={loading}
            btntype="primary"
            onClick={() => {
              CB1({
                title: `Bạn có chắc chắn muốn Reset mật khẩu tài khoản này không?`,
                icon: "warning-usb",
                okText: "Đồng ý",
                onOk: async close => {
                  // onReset(customerInfo?.UserID)
                  close()
                },
              })
            }}
          >
            Reset mật khẩu
          </Button>
        )} */}
      </div>
      <div className="d-flex justify-content-flex-end">
        {/* {!!listButtonShow?.IsUpdate && (
          <Button
            loading={loading}
            btntype="primary"
            onClick={() => {
              setOpenInsert(customerInfo)
            }}
          >
            Sửa
          </Button>
        )} */}
        {/* {!!listButtonShow?.IsDelete && (
          <Button
            loading={loading}
            onClick={() => {
              CB1({
                title: `Bạn có chắc chắn muốn xóa tài khoản này không?`,
                icon: "warning-usb",
                okText: "Đồng ý",
                onOk: async close => {
                  // onDeleteUser(customerInfo?.UserID)
                  close()
                },
              })
            }}
          >
            Xóa
          </Button>
        )} */}
      </div>
    </div>
  )

  // const onDeleteUser = async UserID => {
  //   try {
  //     const res = await UserService.deleteUser(UserID)
  //     if (res?.isError) return
  //     Notice({ msg: "Xóa người dùng thành công !" })
  //     onCancel()
  //     onOk()
  //   } finally {
  //   }
  // }
  // const onReset = async UserID => {
  //   const res = await UserService.resetPassword({ UserID })
  //   if (res?.isError) return
  //   Notice({ msg: "Reset mật khẩu thàng công !" })
  // }
  return (
    <CustomModal
      footer={footer}
      open={!!open}
      onCancel={onCancel}
      title="Chi tiết nhân viên"
    >
      <StyledUserDetail>
        <Row gutter={[20, 8]}>
          <Col span={10}>
            <Image
              src={customerInfo?.Avatar}
              fallback={FAILBACK}
              alt={"ảnh tài khoản"}
              className="img-user"
            />
          </Col>
          <Col span={14}>
            <Col span={24}>
              <div className="account-name">{userInfo?.fullname}</div>
            </Col>
            <Col span={24}>
              <div className="mb-12 text-center ">
                <span className="fw-600 ">Nhóm quyền:</span>{" "}
                {/* {userInfo?.role
                  ? userInfo?.role?.map(item => item?.role)?.join()
                  : ""} */}
                {userInfo?.role}
              </div>
            </Col>
            <Col span={24}>
              <div className="div-divider">
                <Divider />
              </div>
            </Col>
            <Row>
              <Col span={12}>
                <div className="mb-12">
                  <span className="fw-600 ">Họ tên:</span>{" "}
                  {userInfo?.fullname}
                </div>
              </Col>

              <Col span={12}>
                <div className="mb-12">
                  <span className="fw-600 ">Trạng thái:</span>{" "}
                  {!!userInfo?.status
                    ? "Đang hoạt động"
                    : "Không hoạt động"}
                </div>
              </Col>

              <Col span={12}>
                <div className="mb-12">
                  <span className="fw-600 ">Số điện thoại:</span>{" "}
                  {userInfo?.phone}
                </div>
              </Col>

              <Col span={12}>
                <div className="mb-12">
                  <span className="fw-600 ">Email:</span> {userInfo?.email}
                </div>
              </Col>

              <Col span={12}>
                <div className="mb-12">
                  <span className="fw-600 ">Ngày sinh:</span>{" "}
                  {userInfo?.dob
                    ? moment(userInfo?.dob)?.format("DD/MM/YYYY")
                    : ""}
                </div>
              </Col>

            </Row>
          </Col>
        </Row>
      </StyledUserDetail>

      {!!openInsert && (
        <ModalInsertUpdate
          open={openInsert}
          detailInfo={userInfo}
          onOk={() => {
            onOk()
            // getUserDetail()
          }}
          onCancel={() => {
            setOpenInsert(false)
          }}
        />
      )}
    </CustomModal>
  )
}

export default UserDetail

