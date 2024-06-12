import { DoubleLeftOutlined, UserOutlined } from "@ant-design/icons"
import { Avatar, Col, Menu, Row, Tooltip } from "antd"
import { useState } from "react"
import { useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { hasPermission } from "src/lib/utils"
import { MenuItemUser } from "../../MenuItems"
import { UserMenuStyled } from "./styled"
import "./styled.scss"
import { useEffect } from "react"
import LayoutBackgroundCommon from "src/components/Common/Layout/LayoutBackgroundCommon"
const LayoutUser = ({ children, selectedKey, userInfo }) => {
  const navigate = useNavigate()
  const [collapseMenu, setCollapseMenu] = useState(false)
  const [themeDark, setThemeDark] = useState(false)
  const { listTabs } = useSelector(state => state?.appGlobal)
  const location = useLocation()
  const onChange = menu => {
    !menu?.key?.includes("subkey") &&
      navigate(menu?.key?.replace("submenu", ""))
  }

  useEffect(() => {
    document
      .getElementById("layout-user-scroll")
      .scrollTo({ top: 0, left: 0, behavior: "smooth" })
  }, [location?.pathname])

  const setShowListMenu = list =>
    !!list?.length
      ? list
          ?.filter(x => hasPermission(x?.tabid, [...listTabs]))
          .map(i => ({
            ...i,
            children: setShowListMenu(i?.children),
          }))
      : undefined
  return (
    <Row gutter={20} style={{ flexWrap: "nowrap" }}>
      <Col style={{ marginLeft: -20 }}>
        <UserMenuStyled themeDark={themeDark} collapseMenu={collapseMenu}>
          <div
            className={`side-bar-wrapper d-flex flex-column justify-content-space-between`}
          >
            <div>
              {/* <div
                className={`sub-menu ${
                  collapseMenu ? "" : "background-menu-box ml-8"
                }`}
              >
                <div
                  className={`my-account d-flex align-items-center ${
                    collapseMenu ? "justify-content-center" : ""
                  }`}
                >
                  <Avatar
                    size={collapseMenu ? 50 : 42}
                    icon={<UserOutlined />}
                    src={userInfo?.Avatar}
                  />
                  {!collapseMenu && (
                    <Tooltip
                      mouseEnterDelay={1}
                      title={
                        <div className="fs-24 fw-600 ml-8 ">
                          {userInfo?.FullName}
                        </div>
                      }
                    >
                      <div
                        className="fs-24 fw-600 ml-8 max-line1"
                        style={{ maxWidth: "188px" }}
                      >
                        {userInfo?.FullName}
                      </div>
                    </Tooltip>
                  )}
                </div>
              </div> */}
              <Menu
                onClick={onChange}
                selectedKeys={selectedKey}
                mode="inline"
                defaultOpenKeys={["subkey1", "subkey2", "subkey6"]}
                items={setShowListMenu(MenuItemUser())}
                className="menu-antd-user"
                theme={themeDark ? "dark" : "light"}
                inlineCollapsed={collapseMenu}
              />
            </div>
            <div
              className="collapsed-item"
              onClick={() => setCollapseMenu(!collapseMenu)}
            >
              <div className="collapsed-icon">
                <DoubleLeftOutlined rotate={collapseMenu ? 180 : 0} />
              </div>
              <div className="collapsed-title">Thu gọn</div>
            </div>
          </div>
        </UserMenuStyled>
      </Col>
      <Col
        flex="auto"
        className="pt-12 pr-24"
        style={{
          width: 0,
          height: "calc(100vh - 50px)",
          overflowY: "auto",
        }}
        id="layout-user-scroll"
      >
        {children}
      </Col>
    </Row>
  )
}

export default LayoutUser
