import { Col, Divider, Form, Row, Upload } from "antd"
import React, { useEffect, useState } from "react"
import RowInfor from "./components/RowInfor"
import Button from "src/components/MyButton/Button"
import UpdatePersonProfile from "./components/UpdatePersonProfile"
import { normFile } from "src/lib/utils"
import { useDispatch, useSelector } from "react-redux"
import { UserOutlined } from "@ant-design/icons"
import SvgIcon from "src/components/SvgIcon"
import { StyleMyAccount } from "./styled"
import STORAGE, { getStorage } from "src/lib/storage"
import { setUserInfo } from "src/redux/appGlobal"
import Notice from "src/components/Notice"
import LayoutCommon from "src/components/Common/Layout"
import useWindowSize from "src/lib/useWindowSize"
import { getListComboByKey } from "src/lib/utils"
import { SYSTEM_KEY } from "src/constants/constants"
import UserService from "src/services/UserService"
import moment from "moment"

const PersonProfile = () => {
  const dispatch = useDispatch()
  const { listSystemKey } = useSelector(state => state.appGlobal)
  const [modalUpdatePersonProfile, setModalUpdatePersonProfile] =
    useState(false)
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState({})
  const [avatarUpload, setAvatarUpload] = useState("")
  const [showCancelButton, setShowCancelButton] = useState(false)
  const userID = getStorage(STORAGE.USER_ID);
console.log("userid: ", userID);
  // const uploadImg = async file => {
  //   try {
  //     setLoading(true)
  //     const formData = new FormData()
  //     formData.append("file", file)
  //     const res = await FileService.uploadFile(formData)
  //     if (res.isError) return
  //     setAvatarUpload(res.Object)
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  //getInfor User
  const getInfo = async () => {
    try {
      setLoading(true)
      // const res = await UserService.getUserById("667a3003848f2fe6f3fa6664")
      const res = await UserService.getUserById(userID)
      console.log('API response:', res) 
      if (res?.isError) return
      setUser(res)
      // console.log('user:', user.email);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getInfo();
  }, []);

  // const changeAvatar = async () => {
  //   try {
  //     setLoading(true)
  //     setShowCancelButton(false)

  //     const res = await UserService.changeAvatar(avatarUpload)
  //     if (res.isError) return

  //     setStorage(STORAGE.USER_INFO, {
  //       ...userInfo,
  //       Avatar: avatarUpload,
  //     })
  //     dispatch(
  //       setUserInfo({
  //         ...userInfo,
  //         Avatar: avatarUpload,
  //       }),
  //     )
  //     Notice({ msg: "Cập nhật thành công!" })
  //     setAvatarUpload("")
  //   } finally {
  //     setLoading(false)
  //   }
  // }
  const cancelUpload = () => {
    setShowCancelButton(false)
    setAvatarUpload("")
  }

  const getMaccanTypeName = code => {
    const selectedOption = getListComboByKey(
      SYSTEM_KEY?.MACCAN_TYPE,
      listSystemKey,
    )?.find(item => +item?.CodeValue === +code)
    return selectedOption ? selectedOption.Description : "Unknown"
  }

  const isMobile = useWindowSize.isMobile() || false
  return (
    <StyleMyAccount>
      <LayoutCommon>
        <div className="account-infor mb-20">
          <div className="title-type-1 mb-20 d-flex-sb">
            Thông tin tài khoản
            <Button
              btntype="primary"
              onClick={() => setModalUpdatePersonProfile(true)}
            >
              Chỉnh sửa
            </Button>
          </div>
          <Row gutter={[16, 16]}>
            <Col
              xs={24}
              sm={6}
              md={6}
              lg={6}
              xl={6}
              xxl={6}
              className="d-flex-center p-24"
            >
              <div style={{ width: "200px", height: "200px" }}>
                <Form.Item
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  name="Avatar2"
                  className="d-flex-center "
                  rules={[
                    () => ({
                      validator(_, value) {
                        if (!!value?.find(i => i?.size > 5 * 1024 * 1024)) {
                          return Promise.reject(
                            new Error("Dung lượng file tối đa 5MB"),
                          )
                        }
                        return Promise.resolve()
                      },
                    }),
                  ]}
                >
                  <Upload
                    beforeUpload={file => {
                      // uploadImg(file)
                      return false
                    }}
                    accept="image/*"
                    multiple={false}
                    maxCount={1}
                    fileList={[]}
                  >
                    <div className="upload-avatar">
                      <div className="d-flex justify-content-center">
                        <div className="wrap-avatar">
                          <div className="user-img-box">
                            {/* {!!avatarUpload || !!userInfo?.Avatar ? (
                              <img
                                className="user-avatar"
                                src={avatarUpload || userInfo?.Avatar}
                                alt="avatar"
                              />
                            ) : (
                              // <div
                              //   className="user-avatar"
                              //   style={{ backgroundColor: "#ddd" }}
                              // >
                              //   <UserOutlined
                              //     style={{ fontSize: "150px", color: "#fff" }}
                              //   />
                              // </div>
                              <div
                                className="user-avatar"
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  backgroundColor: "#ddd",
                                  width: "150px",
                                  height: "150px",
                                  color: "#fff",
                                }}
                              >
                                <UserOutlined style={{ fontSize: "50px" }} />
                              </div>
                            )} */}
                            <div className="camera-icon mr-20">
                              <SvgIcon name="camera" />
                            </div>
                          </div>
                          <div className="d-flex">
                            {!!avatarUpload && (
                              <>
                                <Button
                                  btntype="third"
                                  className="ml-12 mt-8"
                                  style={{ width: 60 }}
                                  onClick={e => {
                                    e.stopPropagation()
                                    cancelUpload()
                                  }}
                                >
                                  Hủy
                                </Button>
                                <Button
                                  btntype="primary"
                                  className="ml-12 mt-8"
                                  style={{ width: 100 }}
                                  onClick={e => {
                                    e.stopPropagation()
                                    // changeAvatar()
                                  }}
                                >
                                  Lưu ảnh
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Upload>
                </Form.Item>
              </div>
            </Col>
            <Col xs={0} sm={0} md={1} lg={1} xl={1} xxl={1}>
              <div className="d-flex-center " style={{ height: "100%" }}>
                <Divider
                  className="p-0 m-0"
                  type="vertical"
                  style={{ height: "120px" }}
                />
              </div>
            </Col>
            <Col xs={24} sm={12} md={12} lg={12} xl={8} xxl={8}>
              <div className={isMobile ? "" : "p-24"}>
                <div className="infor-box">
                  <div className="title-infor"> Họ và tên:</div>
                  <div>{user?.fullname}</div>
                </div>
                {/* <div className="infor-box">
                  <div className="title-infor">Tên tài khoản:</div>
                  <div>{user?.UserName}</div>
                </div> */}

                {/* <div className="infor-box" style={{ flex: 1 }}>
                  <div className="title-infor"> Giới tính:</div>
                  <div>
                    {user?.Sex === 1 ? "Nam" : user?.Sex === 2 ? "Nữ" : ""}
                  </div>
                </div> */}

                <div className="infor-box" style={{ flex: 1 }}>
                  <div className="title-infor">Ngày sinh:</div>
                  <div>
                    {/* {user?.dob
                      ? moment(user?.dob).format("DD/MM/YYYY")
                      : ""} */}
                      {user?.dob}
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={24} sm={12} md={12} lg={12} xl={8} xxl={8}>
              <div className={isMobile ? "" : "p-24"}>
                <div className="infor-box">
                  <div className="title-infor"> Số điện thoại:</div>
                  <div>{user?.phone}</div>
                </div>
                <div className="infor-box">
                  <div className="title-infor"> Email:</div>
                  <div>{user?.email}</div>
                </div>
                {/* <div className={`infor-box ${!!isMobile ? "mb-0" : ""}`}>
                  <div className={`title-infor ${!!isMobile ? "mb-0" : ""}`}>
                    {" "}
                    Địa chỉ:
                  </div>
                  <div>{user?.Address}</div>
                </div> */}
              </div>
            </Col>
          </Row>
        </div>
      </LayoutCommon>

      {!!modalUpdatePersonProfile && (
        <UpdatePersonProfile
          open={modalUpdatePersonProfile}
          onCancel={() => setModalUpdatePersonProfile(false)}
          onOk={() => {getInfo();
            setModalUpdatePersonProfile(false)
          }}
        />
      )}
    </StyleMyAccount>
  )
}

export default PersonProfile

