import { HubConnectionBuilder } from "@microsoft/signalr"
import { Avatar, Col, Divider, Drawer, Dropdown, Layout, Menu, Row } from "antd"
import React, { useContext, useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import STORAGE, { clearStorage, getStorage, setStorage } from "src/lib/storage"
import { StoreContext } from "src/lib/store"
import {
  default as UseWindowSize,
  default as useWindowSize,
} from "src/lib/useWindowSize"
import { hasPermission } from "src/lib/utils"
import { setUserInfo } from "src/redux/appGlobal"
import { setOpenChangePassModal, setOpenLoginModal } from "src/redux/loginModal"
import ROUTER from "src/router"
import AuthService from "src/services/AuthService"
import LayoutCommon from "../Common/Layout"
import LayoutAdminCommon from "../Common/LayoutAdmin"
import Footer from "../Footer"
import SvgIcon from "../SvgIcon"
import BreadcrumbHome from "./BreadcrumbHome/BreadcrumbHome"
import MenuItemBreadcrumb, {
  MenuItemAdmin,
  MenuItemTopAdmin,
  MenuItemUser,
} from "./MenuItems"
import ChangePasswordModal from "./component/ChangePassword/ChangePasswordModal"
import LayoutAdmin from "./component/LayoutAdmin"
import LayoutUser from "./component/LayoutUser"
import LoginModal from "./component/LoginModal"
import Notification from "./component/Notification"
import RegisterModal from "./component/RegisterModal"
import { CustomMenuStyled, LayoutStyled, StyleMenuAccount } from "./styled"
import "./styles.scss"
import { setConductMeetings } from "src/redux/socketState"
import LayoutBackgroundCommon from "../Common/Layout/LayoutBackgroundCommon"
import { setVotingModal } from "src/redux/voting"
import { MenuFoldOutlined, MenuOutlined, UserOutlined } from "@ant-design/icons"
import Anonymous from "./component/Anonymous/Anonymous"
import { SubTableHeader } from "../TableCustom/styled"
const { Header, Content } = Layout

const MainLayout = ({ children, isAdmin }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const [collapseMenu, setCollapseMenu] = useState(false)

  const { openLoginModal, openChangePassModal } = useSelector(
    state => state.loginModal,
  )
  const { listTabs, userInfo } = useSelector(state => state?.appGlobal)
  const isLogin = getStorage(STORAGE.TOKEN)
  let isUser = location.pathname.includes(ROUTER.CA_NHAN)
  const [open, setOpen] = useState(false)
  const [selectedKey, setSelectedKey] = useState(
    getStorage(STORAGE.KEY_MENU_ACTIVE) || ["/"],
  )
  const [menuAdmin, setMenuAdmin] = useState([])
  const [menuUser, setMenuUser] = useState([])
  const [openRegisterModal, setOpenRegisterModal] = useState(false)
  const [openModalVoting, setOpenModalVoting] = useState({})

  const handleLogout = async () => {
    if (isLogin) {
      await AuthService.logout()
      await clearStorage()
      await dispatch(setUserInfo({}))
      return navigate(ROUTER?.DANG_NHAP)
    }
  }

  const onClickMenu = key => {
    if (key?.key === "dang-xuat") {
      handleLogout()
    } else {
      setStorage(STORAGE.KEY_MENU_ACTIVE, key.keyPath)
      setSelectedKey(key.key.keyPath)
      if (!key.key.includes("subkey")) navigate(key.key)
    }
    setOpen(false)
  }
  const filterMenu = data =>
    data?.filter(o => {
      if (!!isLogin && o?.key === ROUTER.DANG_NHAP) return false
      if (o?.children) {
        if (filterMenu(o?.children)?.length)
          o.children = filterMenu(o?.children)
        else delete o?.children
      }
      return !o?.hideOnMenu
    })
  const menuAccount = (
    <StyleMenuAccount>
      <div className="menu-account">
        <Menu className="dropdown-option">
          <div className="account-infor">
            {!!menuAdmin.length && (
              <Menu.Item
                key="1"
                onClick={() => {
                  let startPage = undefined
                  if (!!menuAdmin && !!menuAdmin[0]) {
                    startPage =
                      menuAdmin[0]?.children?.[0]?.key || menuAdmin[0]?.key
                  } else if (!!(menuAdmin[0]?.key?.charAt(0) === "/")) {
                    startPage = menuAdmin[0]?.key
                  }
                  navigate(!!menuAdmin?.length ? startPage : ROUTER.HOME)
                }}
              >
                <div className="btn-function strok-btn-function">
                  <SvgIcon name="user-info" />
                  <span className="fw-400">Quản trị hệ thống</span>
                </div>
              </Menu.Item>
            )}
            {/* {!!isLogin && (
              <Menu.Item
                key="2"
                onClick={() => {
                  let startPage = undefined
                  if (!!menuUser && !!menuUser[0]) {
                    startPage =
                      menuUser[0]?.children?.[0]?.key || menuUser[0]?.key
                  } else if (!!(menuUser[0]?.key?.charAt(0) === "/")) {
                    startPage = menuUser[0]?.key
                  }
                  navigate(!!menuUser?.length ? startPage : ROUTER.HOME)
                }}
              >
                <div className="btn-function strok-btn-function">
                  <SvgIcon name="user-setting" />
                  <span className="fw-400">Cá nhân</span>
                </div>
              </Menu.Item>
            )} */}
            {!!menuUser?.find(i => i?.key === ROUTER.THONG_TIN_TAI_KHOAN) && (
              <Menu.Item
                key="3"
                onClick={() => {
                  navigate(ROUTER.PROFILE)
                }}
              >
                <div className="btn-function strok-btn-function">
                  <SvgIcon name="user-info" />
                  <span className="fw-400">Thông tin cá nhân</span>
                </div>
              </Menu.Item>
            )}
            <Menu.Item
              key="4"
              onClick={() => {
                navigate(ROUTER.DOI_MAT_KHAU)
              }}
            >
              <div className="btn-function strok-btn-function">
                <SvgIcon name="reset-pass" />
                <span className="fw-400">Đổi mật khẩu</span>
              </div>
            </Menu.Item>
            <Menu.Item key="5" style={{ color: "#ED1117" }}>
              <div
                className="btn-logout"
                onClick={e => {
                  e?.stopPropagation()
                  handleLogout()
                }}
              >
                <SvgIcon name="logoutIcon" />
                Đăng xuất
              </div>
            </Menu.Item>
          </div>
        </Menu>
      </div>
    </StyleMenuAccount>
  )

  useEffect(() => {
    let key = location?.pathname
    setSelectedKey([key])
  }, [location])

  useEffect(() => {
    if (!!isLogin) {
      setMenuAdmin(MenuItemAdmin())
      setMenuUser(MenuItemUser())
    }
  }, [listTabs])

  const isMobile = useWindowSize.isMobile() || false
  const isTablet = useWindowSize.isTablet() || false
  const [menuMobile, setMenuMobile] = useState()
  return (
    <LayoutStyled shadow={!!isAdmin || !!isUser}>
      <Header className={`header-background`}>
        <div className="d-flex-start">
          <div className="w-100">
            {React.createElement(
              !!isAdmin || !!isUser
                ? LayoutAdminCommon
                : !!isTablet
                ? LayoutAdminCommon
                : LayoutCommon,
              {
                children: (
                  <Row
                    gutter={36}
                    className=" pt-5 pb-5 d-flex align-items-center justify-content-space-between"
                    style={{
                      margin: "auto",
                    }}
                  >
                    <Col
                      className={`d-flex-center justify-content-flex-start nowrap`}
                      style={{
                        whiteSpace: "nowrap",
                        height: "40px",
                        paddingLeft: 0,
                        flex: 1,
                        width: 0,
                      }}
                      flex={"auto"}
                    >
                      {!!isLogin &&
                        React.createElement(
                          !!isMobile ? MenuFoldOutlined : Col,
                          {
                            span: 0,
                            onClick: () => setOpen(pre => !pre),
                            className:
                              !!isMobile && "mr-10 white-icon mobile-icon",
                          },
                        )}
                      <span
                        className={`fw-600 d-flex-center h-100pe ${
                          !!isMobile ? "fs-14" : "fs-20 mr-24"
                        }`}
                      >
                        <span
                          onClick={() => {
                            navigate(ROUTER.HOME)
                          }}
                          className={`fw-600 d-flex-center pointer h-100pe ${
                            !!isMobile ? "fs-14" : "fs-20"
                          }`}
                        >
                          {/* <img src={logoHeader1} className="logo" alt="logo" />
                          <img
                            src={logoHeader2}
                            className=" mr-50"
                            alt="logo"
                          /> */}
                          {!!isAdmin && (
                            <button
                              className="btn-colapse-menu"
                              onClick={e => {
                                e?.stopPropagation()
                                setCollapseMenu(pre => !pre)
                              }}
                            >
                              <MenuOutlined
                                className=" fs-17 fw-600"
                                style={{ color: "#154398" }}
                              />
                            </button>
                          )}
                          <div className="logo-text text-uppercase pointer">
                            HỆ THỐNG QUẢN LÝ CỬA HÀNG NẾN THƠM
                          </div>
                        </span>
                      </span>
                      {!isTablet && <CustomMenuStyled></CustomMenuStyled>}
                    </Col>
                    <Col style={{ width: "auto" }}>
                      <Row
                        gutter={30}
                        className="align-items-center layout-action"
                      >
                        {!!isLogin ? (
                          <div className="d-flex justify-content-flex-end align-items-center">
                            <Notification />

                            {!isMobile && (
                              <Dropdown
                                overlay={menuAccount}
                                overlayStyle={{ minWidth: "200px" }}
                              >
                                <Row gutter={5} className="pointer ">
                                  <Col>
                                    <div className="account-infor-avatar">
                                      <Avatar
                                        src={userInfo?.Avatar}
                                        size={32}
                                        className="style-avt mr-8"
                                        icon={
                                          <div>
                                            <SvgIcon name="user-header" />
                                          </div>
                                        }
                                      />
                                      <div className="mr-8 max-line1">
                                        <div
                                          className=" max-line1"
                                          style={{
                                            maxWidth: 180,
                                            color: "#333",
                                          }}
                                          title={userInfo?.FullName}
                                        >
                                          {/* {userInfo?.FullName} */}
                                          <span>MR A</span>
                                        </div>
                                        <div
                                          className="max-line1 fs-12"
                                          title={userInfo?.RoleName}
                                        >
                                          {/* {
                                          ROLE_NAME.find(
                                            i =>
                                              i.value === userInfo?.AccountType,
                                          ).title
                                        } */}
                                          {userInfo?.RoleName}
                                        </div>
                                      </div>
                                      <SvgIcon name="arrow-down-primary" />
                                    </div>
                                  </Col>
                                </Row>
                              </Dropdown>
                            )}
                          </div>
                        ) : (
                          !isMobile && (
                            <div className="d-flex align-items-center h-100 ">
                              <Row
                                // onClick={() => navigate(ROUTER.DANG_NHAP)}
                                onClick={() => navigate(ROUTER.DANG_NHAP)}
                                className="align-items-center pointer login-item"
                              >
                                <SvgIcon
                                  name="user_login"
                                  className="login-icon"
                                />
                                <span className="login-item_text">
                                  Đăng nhập
                                </span>
                              </Row>
                            </div>
                          )
                        )}
                      </Row>
                    </Col>
                    {/* <Col>
                      <img src={logo2} alt="logo" />
                    </Col> */}
                  </Row>
                ),
              },
            )}
          </div>
        </div>
      </Header>
      <BreadcrumbHome className="breadcrumb-custom" />
      <Layout>
        <Content className="site-layout-background ">
          <LayoutBackgroundCommon>
            {isAdmin ? (
              <>
                <LayoutAdmin
                  collapseMenu={collapseMenu}
                  setCollapseMenu={setCollapseMenu}
                  children={children}
                  menuAdmin={menuAdmin}
                  selectedKey={selectedKey}
                />
              </>
            ) : isUser ? (
              <LayoutUser
                children={children}
                selectedKey={selectedKey}
                userInfo={userInfo}
              />
            ) : (
              <Anonymous children={children} />
            )}
          </LayoutBackgroundCommon>
          {!isAdmin && !isUser && <Footer />}
        </Content>
      </Layout>
      <Drawer
        title=""
        placement="left"
        onClose={() => setOpen(false)}
        open={open}
        className="menu-custom"
      >
        <div>
          <Row gutter={[8, 8]} className="infor-mobile">
            <Col span={6}>
              <div className="text-center">
                <Avatar
                  src={userInfo?.Avatar}
                  size={74}
                  icon={<UserOutlined style={{ fontSize: "36px" }} />}
                />
              </div>
            </Col>
            <Col span={18}>
              <div className="sumary-infor-user">
                {!!userInfo?.FullName && (
                  <div
                    className="fullname max-line2 mb-8 fs-16 fw-600"
                    style={{
                      lineHeight: 1.4,
                      color: "#262626",
                    }}
                  >
                    {userInfo?.FullName}
                  </div>
                )}
                {!!userInfo?.Username && (
                  <SubTableHeader
                    style={{
                      color: "#545454",
                    }}
                  >
                    {userInfo?.Username}
                  </SubTableHeader>
                )}
              </div>
            </Col>
          </Row>
          <Divider className="mb-0" />
        </div>
        <Menu
          onClick={key => onClickMenu(key)}
          selectedKeys={selectedKey}
          mode="inline"
          items={filterMenu(menuMobile)}
        />
      </Drawer>
      {!!openLoginModal && (
        <LoginModal
          openLoginModal={openLoginModal}
          handleCancel={() => dispatch(setOpenLoginModal(false))}
          handleRegister={() => setOpenRegisterModal(true)}
          // setOpenForgetPassModal={() => setOpenForgetPassModal(true)}
        />
      )}
      {!!openChangePassModal && (
        <ChangePasswordModal
          open={openChangePassModal}
          onCancel={() => dispatch(setOpenChangePassModal(false))}
        />
      )}
      {!!openRegisterModal && (
        <RegisterModal
          open={openRegisterModal}
          handleCancel={() => setOpenRegisterModal(false)}
          handleLogin={() => dispatch(setOpenLoginModal(true))}
        />
      )}
    </LayoutStyled>
  )
}

export default MainLayout

