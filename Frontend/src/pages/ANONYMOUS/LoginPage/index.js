import { Checkbox, Col, Divider, Form, Input, Row } from "antd"
import { useContext, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Router, useNavigate } from "react-router-dom"
import Button from "src/components/MyButton/Button"
import STORAGE, { getStorage, setStorage } from "src/lib/storage"
import { StoreContext } from "src/lib/store"
import {
  setIsAdmin,
  setIsRepresentative,
  setIsUser,
  setListTabs,
  setUserInfo,
} from "src/redux/appGlobal"

import ROUTER from "src/router"
import AuthService from "src/services/AuthService"
import { StyleLoginPage } from "./styled"
import { hasPermission } from "src/lib/utils"
import { MenuItemAdmin, MenuItemUser } from "src/components/Layouts/MenuItems"
import { setOpenChangePassModal } from "src/redux/loginModal"
import login from "src/assets/images/modalLogin/login.png"
import useWindowSize from "src/lib/useWindowSize"
import { jwtDecode } from "jwt-decode"

const LoginPage = () => {
  const isLogin = getStorage(STORAGE.TOKEN)
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const userInfo = getStorage(STORAGE.USER_INFO)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { routerStore } = useContext(StoreContext)
  const isLaptop = useWindowSize.isLaptop() || false
  const isDesktop = useWindowSize.isDesktop() || false
  const isMobile = useWindowSize.isMobile() || false
  const isTablet = useWindowSize.isTablet() || false
  const [routerBeforeLogin, setRouterBeforeLogin] = routerStore

  useEffect(() => {
    if (!!isLogin) {
      // loginSuccsess(userInfo)
    }
  }, [])

  // const comeStartPage = async isAdmin => {
  //   if (!!isMobile) navigate(ROUTER.HOME)
  //   else {
  //     const resp = await RoleService.getListTab()
  //     if (resp.isError) return
  //     dispatch(setListTabs(resp.Object || []))
  //     const menu = isAdmin
  //       ? MenuItemAdmin()
  //       : MenuItemUser()?.filter(i => i.key !== ROUTER.HOME)
  //     const menuAdmin = menu
  //       ?.filter(x => hasPermission(x?.tabid, [...resp.Object]))
  //       .map(i => ({
  //         ...i,
  //         children: i?.children?.filter(x =>
  //           hasPermission(x?.tabid, [...resp.Object]),
  //         ),
  //       }))
  //     let startPage = "/"
  //     if (!!menuAdmin && !!menuAdmin[0]) {
  //       startPage = menuAdmin[0]?.children?.[0]?.key || menuAdmin[0]?.key
  //     } else if (!!(menuAdmin[0]?.key?.charAt(0) === "/")) {
  //       startPage = menuAdmin[0]?.key
  //     }
  //     navigate(startPage)
  //   }
  // }
  const onLogin = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      const res = await AuthService.login({ ...values })
      const decodedToken = jwtDecode(res?.token)
      const userID = decodedToken.payload.id;
      console.log("id: ", decodedToken.payload.id);
      setStorage(STORAGE.USER_ID, userID);
      setStorage(STORAGE.TOKEN, res?.token)
      setStorage(STORAGE.USER_INFO, decodedToken.payload)
      console.log("Dispatching user info:", decodedToken.payload)
      dispatch(setUserInfo(decodedToken.payload))
      setRouterBeforeLogin(undefined)
      loginSuccess(decodedToken.payload)
    } finally {
      setLoading(false)
    }
  }

  const loginSuccess = data => {
    if (routerBeforeLogin) navigate(routerBeforeLogin)

    if (data?.role === "ADMIN") {
      dispatch(setIsAdmin(true))
      navigate(ROUTER.DASHBOARD)
    } else if (data?.role === "STAFF") {
      navigate(ROUTER.STAFF_DASHBOARD)
    } else if (data?.role === "MANAGER") {
      navigate(ROUTER.MANAGER_MANAGE_STAFF)
    } else if (data?.role === "WAREHOUSE MANAGER") {
      navigate(ROUTER.WAREHOUSE_MANAGER_DASHBOARD)
    }
    if (data?.IsFirstLogin) {
      dispatch(setOpenChangePassModal(true))
    }
  }
  return (
    <div>
      <StyleLoginPage>
        <div className="d-flex-center">
          <div style={{ maxWidth: isMobile ? "330px" : "1000px" }}>
            <Row className="d-flex-center">
              <Col className="content-wrap" span={24}>
                <Row gutter={[16, 16]} justify="center" align="middle">
                  <Col lg={10} md={12} sm={20} xs={20}>
                    <div className="d-flex flex-column justify-content-center h-100">
                      <div className="text-center mb-30">
                        <div
                          style={{
                            fontSize: isMobile || isTablet ? "22px" : "28px",
                          }}
                          className=" fw-600 title-form"
                        >
                          Đăng nhập
                        </div>
                      </div>
                      <div className="pl-20 pr-20">
                        <Form form={form} layout="vertical">
                          <Form.Item
                            label="Tài khoản"
                            required
                            rules={[
                              {
                                required: true,
                                message: "Thông tin không được để trống!",
                              },
                            ]}
                            name="email"
                          >
                            <Input placeholder="Nhập tài khoản" />
                          </Form.Item>
                          <Form.Item
                            label="Mật khẩu"
                            rules={[
                              {
                                required: true,
                                message: "Bạn chưa nhập mật khẩu!",
                              },
                              // {
                              //   pattern: getRegexPassword(),
                              //   message:
                              //     "Mật khẩu có chứa ít nhất 8 ký tự, trong đó có ít nhất một số và bao gồm cả chữ thường và chữ hoa và ký tự đặc biệt, ví dụ @, #, ?, !.",
                              // },
                            ]}
                            name="password"
                          >
                            <Input.Password placeholder="Nhập mật khẩu" />
                          </Form.Item>
                          <Form.Item name="remember" valuePropName="checked">
                            <Checkbox
                              onChange={val =>
                                localStorage.setItem(
                                  STORAGE.REMEMBER_LOGIN,
                                  JSON.stringify(val.target.checked),
                                )
                              }
                              value={getStorage(STORAGE.REMEMBER_LOGIN)}
                            >
                              Duy trì đăng nhập
                            </Checkbox>
                          </Form.Item>

                          {/* <Row className="d-flex justify-content-flex-end">
                  <Link
                    onClick={() => {
                      setOpenForgetPassModal()
                      handleCancel()
                    }}
                    className="forget-pass"
                  >
                    <i>Quên mật khẩu?</i>
                  </Link>
                </Row> */}
                          <Row>
                            <Button
                              loading={loading}
                              btntype="primary"
                              className="btn-login"
                              type="submit"
                              htmlType="submit"
                              onClick={onLogin}
                            >
                              Đăng nhập
                            </Button>
                          </Row>
                          {/* <Divider className="mt-10 mb-10 fs-13">Hoặc</Divider>
                          <Row>
                            <Button
                              loading={loading}
                              btntype="third"
                              className="btn-login"
                              type="submit"
                              htmlType="submit"
                              onClick={() => navigate(ROUTER.DANG_KY)}
                            >
                              Đăng ký
                            </Button>
                          </Row> */}
                        </Form>
                      </div>
                    </div>
                  </Col>
                  {!isMobile && !isTablet && (
                    <Col lg={10} md={12} sm={20} xs={20}>
                      <div
                        style={{ width: "500px", height: "500px" }}
                        className="d-flex justify-content-center"
                      >
                        <img
                          style={{
                            maxWidth: "100%",
                          }}
                          src={login}
                          alt="login"
                        />
                      </div>
                    </Col>
                  )}
                  {/* <Col lg={10} md={12} sm={20} xs={20}>
                    <div className="d-flex justify-content-center">
                      <img
                        style={{ maxWidth: "100%", height: "auto" }}
                        src={login}
                        alt="login"
                      />
                    </div>
                  </Col> */}
                </Row>
              </Col>
            </Row>
          </div>
        </div>
      </StyleLoginPage>
    </div>
  )
}

export default LoginPage

