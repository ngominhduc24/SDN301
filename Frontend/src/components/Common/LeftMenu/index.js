import { Layout, Menu } from "antd"
import { flatten, get } from "lodash"
import { useRouter } from "next/router"
import PropTypes from "prop-types"
import { useContext, useEffect, useState } from "react"

import cn from "lib/classnames"
import { StoreContext } from "lib/store"
import { gotoUrlPageBlank } from "lib/url"

import SvgIcon from "src/components/SvgIcon"

import { StyledAffix } from "./styles"
import styles from "./styles.module.scss"

const { Sider } = Layout
const { SubMenu } = Menu

LeftMenu.propTypes = {
  collapsed: PropTypes.bool,
  isHover: PropTypes.bool,
}

LeftMenu.defaultProps = {
  collapsed: false,
  isHover: false,
}

export default function LeftMenu(props) {
  const { collapsed } = props

  const router = useRouter()

  const [openKeys, setOpenKeys] = useState()
  const { listTabStore, tabStore } = useContext(StoreContext)
  const [listTab] = listTabStore
  const [, setTabSelect] = tabStore

  useEffect(() => {
    setTabSelect(router.asPath)
  }, [])

  function sidebarObj(id, iconName, title, linkItem, listItem) {
    return { id, iconName, title, linkItem, listItem }
  }

  function sidebarObjChildren(
    id,
    idParent,
    title,
    linkItem,
    defaultActive = false,
  ) {
    return { id, idParent, title, linkItem, defaultActive }
  }

  const sideBarData = []
  const childConfig = []
  const childSystem = []

  const flattenSideBar = flatten(
    sideBarData.map(x => {
      if (x && x.listItem) return x.listItem
      return x
    }),
  )

  const getDefaultOpenKeys = (getSelectedKeys = false) => {
    if (!flattenSideBar) return []
    let curMenu = flattenSideBar.find(item => {
      return item.linkItem === router.asPath
    })
    if (!getSelectedKeys && curMenu?.idParent) {
      return [`${curMenu?.idParent}`]
    }
    if (curMenu?.id) {
      return [`${curMenu?.id}`]
    }
  }

  const handleClickMenu = event => {
    const { key } = event
    const menuItemSelected =
      flattenSideBar && flattenSideBar.find(item => item.id === parseInt(key))
    const link = get(menuItemSelected, "linkItem")
    if (link && router.pathname !== link) {
      if (link?.includes("http")) {
        gotoUrlPageBlank(link)
      } else {
        router.push(link)
      }
    } else {
      router.push(link)
    }
  }

  const handleClickTitleSubMenu = event => {
    const subMenuActive = sideBarData.find(
      item => parseInt(item.id) === parseInt(event.key),
    )
    const defaultMenu =
      subMenuActive && subMenuActive.listItem.find(x => x.defaultActive)
    const link = get(defaultMenu, "linkItem")
    if (link && router.pathname !== link) router.push(link)
  }

  const onOpenChange = _openKeys => {
    setOpenKeys([..._openKeys])
  }

  const renderMenuItem = () =>
    sideBarData.map(sideBarItem => {
      return get(sideBarItem, "listItem") ? (
        <SubMenu
          key={get(sideBarItem, "id")}
          icon={<SvgIcon name={get(sideBarItem, "iconName")} />}
          title={
            <span className={styles.titleSideBar}>
              {get(sideBarItem, "title")}
              <SvgIcon name="arrow-menu" className={styles.iconMenu} />
            </span>
          }
          className={cn(styles.sideBarSubMenuItem, {
            "side-bar-collapsed-selected": collapsed,
          })}
          onTitleClick={handleClickTitleSubMenu}
          popupClassName="popup-submenu-sidebar"
        >
          <div className={styles.lineSubMenu} />

          {get(sideBarItem, "listItem").map(subMenuItem => {
            return (
              <Menu.Item
                key={get(subMenuItem, "id")}
                className={styles.sideBarItem}
              >
                <div
                  className={`${styles.subMenuItem} d-flex align-items-center`}
                >
                  <SvgIcon name="dot" className={`mr-8 ${styles.dotSubItem}`} />
                  {get(subMenuItem, "title")}
                </div>
              </Menu.Item>
            )
          })}
        </SubMenu>
      ) : (
        <Menu.Item
          key={get(sideBarItem, "id")}
          icon={
            <SvgIcon
              name={get(sideBarItem, "iconName")}
              className={
                get(sideBarItem, "iconName") === "settings"
                  ? styles.settingViolet
                  : ""
              }
            />
          }
          className={styles.sideBarItem}
        >
          <span className={styles.titleWrapper}>
            <span className={styles.titleSideBar}>
              {get(sideBarItem, "title")}
            </span>
          </span>
        </Menu.Item>
      )
    })
  return (
    <StyledAffix
      offsetTop={64}
      className={cn(styles.affix, {
        [styles.affixClose]: collapsed,
      })}
    >
      <Sider
        collapsible
        trigger={null}
        collapsed={false}
        width={250}
        collapsedWidth={64}
        className={cn(styles.sideWrapper, {
          [styles.sideWrapperClose]: collapsed,
          [styles.sideWrapperCloseCollapse]: collapsed,
        })}
        theme="light"
      >
        <Menu
          mode="inline"
          defaultSelectedKeys={getDefaultOpenKeys(true)}
          defaultOpenKeys={getDefaultOpenKeys()}
          selectedKeys={getDefaultOpenKeys(true)}
          openKeys={openKeys || getDefaultOpenKeys()}
          className={styles.menuSidebar}
          onClick={handleClickMenu}
          onOpenChange={onOpenChange}
          subMenuOpenDelay={0}
        >
          {renderMenuItem()}
        </Menu>
      </Sider>
    </StyledAffix>
  )
}
