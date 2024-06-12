import { useEffect, useState, useContext } from "react"
import { Breadcrumb } from "antd"
import BreadcrumbItem from "antd/es/breadcrumb/BreadcrumbItem"
import { useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router"
import LayoutCommon from "src/components/Common/Layout"
import { findParent, treeToList } from "src/lib/utils"
import ROUTER from "src/router"
import styled from "styled-components"
import MenuItemBreadcrumb from "../MenuItems"
import CB1 from "src/components/Modal/CB1"
import { StoreContext } from "src/lib/store"
const BreadcrumbHomeStyle = styled.div`
  .ant-breadcrumb-link {
    font-weight: 100 !important;
    cursor: pointer;
    font-size: 14px;
    color: #fff !important;
    &:hover {
      color: #333;
    }
  }

  li:last-child {
    .ant-breadcrumb-link {
      cursor: unset;
      font-weight: 600 !important;
      color: white;
    }
  }
  .breadcrumb-header {
    background-color: #154398 !important;
    box-shadow: unset;
  }
  .ant-breadcrumb-separator {
    color: #d9d9d9 !important ;
  }
`
const BreadcrumbHome = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const [isCheck, setIsCheck] = useState(false)
  const treeLabel = tree =>
    tree?.map(i => ({
      ...i,
      title: i?.label,
      children: treeLabel(i?.children),
    }))
  const { listCount } = useSelector(state => state?.appGlobal)
  const pathSpecial = [
    ROUTER.QUAN_LY_PHAN_QUYEN,
    ROUTER.QUAN_LY_CHUC_VU,
    ROUTER.QUAN_LY_DON_VI,
    `${ROUTER.QUAN_LY_DU_LIEU}/`,
  ]?.find(i => location?.pathname?.includes(i))
  const locationPathName = pathSpecial ? pathSpecial : location?.pathname

  const items = treeLabel(MenuItemBreadcrumb(navigate, listCount))
  const parents =
    findParent({ children: items }, `${locationPathName}${location?.search}`) ||
    findParent({ children: items }, `${locationPathName}`)
  const listParent = treeToList([parents], "key")
    .reverse()
    ?.filter(i => i?.label)

  return (
    <BreadcrumbHomeStyle>
      {listParent?.length > 0 && (
        <div className="box-breadcrumb-header">
          <div className="breadcrumb-header">
            <LayoutCommon>
              <Breadcrumb separator=">">
                <BreadcrumbItem
                  style={{
                    cursor: "pointer",
                  }}
                  href={ROUTER?.HOME}
                >
                  Trang chủ
                </BreadcrumbItem>
                {listParent?.map((i, idx) => (
                  <BreadcrumbItem
                    style={{
                      cursor:
                        !i?.key?.includes("subkey") &&
                        idx !== listParent?.length - 1
                          ? "pointer"
                          : "unset",
                    }}
                    // href={
                    //   i?.key?.includes("subkey") ||
                    //   idx === listParent?.length - 1
                    //     ? undefined
                    //     : i?.key
                    // }
                    onClick={() => {
                      if (isCheck) {
                        CB1({
                          title: true
                            ? "Bạn có chắc chắn muốn kết thúc Cập nhật mới hồ sơ?"
                            : `Bạn có chắc chắn muốn kết thúc Thêm mới hồ sơ?`,
                          icon: "solid-warning",
                          okText: "Đồng ý",
                          cancelText: "Đóng",
                          onOk: async close => {
                            close()
                            if (i?.state) {
                              navigate(
                                i?.key?.includes("subkey") ||
                                  idx === listParent?.length - 1
                                  ? undefined
                                  : i?.key,
                                i?.state,
                              )
                            } else {
                              navigate(
                                i?.key?.includes("subkey") ||
                                  idx === listParent?.length - 1
                                  ? undefined
                                  : i?.key,
                              )
                            }
                          },
                        })
                      } else {
                        if (i?.state) {
                          navigate(
                            i?.key?.includes("subkey") ||
                              idx === listParent?.length - 1
                              ? undefined
                              : i?.key,
                            i?.state,
                          )
                        } else {
                          navigate(
                            i?.key?.includes("subkey") ||
                              idx === listParent?.length - 1
                              ? undefined
                              : i?.key,
                          )
                        }
                      }
                    }}
                    key={i?.key}
                  >
                    <span className="fs-12">{i?.label}</span>
                  </BreadcrumbItem>
                ))}
              </Breadcrumb>
            </LayoutCommon>
          </div>
        </div>
      )}
    </BreadcrumbHomeStyle>
  )
}

export default BreadcrumbHome
