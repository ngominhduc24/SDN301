import ROUTER from "src/router"
import SvgIcon from "../SvgIcon"
import { useSelector } from "react-redux"
import STORAGE, { clearStorage, getStorage, setStorage } from "src/lib/storage"

const role = getStorage(STORAGE.USER_INFO)

const MenuItemBreadcrumb = () => {
  return [
    {
      label: "Đăng nhập",
      key: ROUTER?.DANG_NHAP,
    },
    {
      label: "Thông tin tài khoản",
      key: ROUTER?.PROFILE,
    },
    {
      label: "Đổi mật khẩu",
      key: ROUTER?.DOI_MAT_KHAU,
    },
    {
      label: "Đăng xuất",
      key: "dang-xuat",
    },
  ]
}

export default MenuItemBreadcrumb

export const MenuItemAdmin = () => {
  return [
    {
      key: ROUTER.DASHBOARD,
      label: "Dashboard",
      icon: <SvgIcon name="dashboard" />,
      tabid: [1],
    },
    {
      key: "subkey1",
      label: "Products",
      icon: <SvgIcon name="product" />,
      tabid: [2, 3],
      children: [
        {
          key: ROUTER.MANAGE_PRODUCTS,
          label: "Manage Products",
          tabid: [2],
        },
      ],
    },
    {
      key: ROUTER.DASHBOARD,
      label: "Report",
      icon: <SvgIcon name="menu5" />,
      tabid: [4],
    },
    {
      key: ROUTER.DASHBOARD,
      label: "Download History",
      icon: <SvgIcon name="dowload-export" />,
      tabid: [5],
    },
    {
      key: "subkey2",
      label: "Store",
      icon: <SvgIcon name="store" />,
      tabid: [6, 7],
      children: [
        {
          key: ROUTER.MANAGE_STORE,
          label: "Manage Store",
          tabid: [6],
        },
      ],
    },
    {
      key: "subkey3",
      label: "Warehouse",
      icon: <SvgIcon name="warehouse" />,
      tabid: [8, 9],
      children: [
        {
          key: ROUTER.MANAGE_WAREHOUSE,
          label: "Manage Warehouse",
          tabid: [8],
        },
      ],
    },
    {
      key: "subkey4",
      label: "Administrator",
      icon: <SvgIcon name="menu17" />,
      tabid: [10],
      children: [
        {
          key: ROUTER.MANAGE_USER,
          label: "Manage User",
          tabid: [10],
        },
      ],
    },
  ]
}
export const MenuItemManager = () => {
  return [
    {
      key: ROUTER.DASHBOARD,
      label: "Dashboard",
      icon: <SvgIcon name="dashboard" />,
      tabid: [1],
    },
    {
      key: "subkey1",
      label: "Products",
      icon: <SvgIcon name="product" />,
      tabid: [2, 3],
      children: [
        {
          key: ROUTER.MANAGE_PRODUCTS,
          label: "Manage Products",
          tabid: [2],
        },
      ],
    },
    {
      key: ROUTER.DASHBOARD,
      label: "Report",
      icon: <SvgIcon name="menu5" />,
      tabid: [4],
    },
    {
      key: ROUTER.DASHBOARD,
      label: "Download History",
      icon: <SvgIcon name="dowload-export" />,
      tabid: [5],
    },
    {
      key: "subkey5",
      label: "Manager",
      icon: <SvgIcon name="menu13" />,
      tabid: [12, 13],
      children: [
        {
          key: ROUTER.MANAGER_MANAGE_STAFF,
          label: "Manage Staff",
          tabid: [12],
        },
        {
          key: ROUTER.MANAGER_MANAGE_INVOICE,
          label: "Manage Invoice",
          tabid: [13],
        },
      ],
    },
  ]
}
export const MenuItemWarehouseManager = () => {
  return [
    {
      key: ROUTER.WAREHOUSE_MANAGER_DASHBOARD,
      label: "Dashboard",
      icon: <SvgIcon name="dashboard" />,
      tabid: [1],
    },
    {
      key: ROUTER.WAREHOUSE_MANAGER_DASHBOARD,
      label: "Report",
      icon: <SvgIcon name="menu5" />,
      tabid: [2],
    },
    {
      key: ROUTER.WAREHOUSE_MANAGER_DASHBOARD,
      label: "Download History",
      icon: <SvgIcon name="dowload-export" />,
      tabid: [3],
    },
    {
      key: "subkey1",
      label: "Products",
      icon: <SvgIcon name="product" />,
      tabid: [4],
      children: [
        {
          key: ROUTER.WAREHOUSE_MANAGER_MANAGE_PRODUCT,
          label: "Manage Products",
          tabid: [4],
        },
      ],
    },
    {
      key: "subkey2",
      label: "Store",
      icon: <SvgIcon name="store" />,
      tabid: [5],
      children: [
        {
          key: ROUTER.WAREHOUSE_MANAGER_MANAGE_STORE,
          label: "Manage Store",
          tabid: [5],
        },
      ],
    },
    {
      key: "subkey3",
      label: "Warehouse Mananer",
      icon: <SvgIcon name="menu14" />,
      tabid: [7],
      children: [
        {
          key: ROUTER.WAREHOUSE_MANAGER_MANAGE_INVOICE,
          label: "Manage Invoice",
          tabid: [7],
        },
      ],
    },
  ]
}
export const MenuItemStaff = () => {
  return [
    {
      key: ROUTER.STAFF_DASHBOARD,
      label: "Dashboard",
      icon: <SvgIcon name="dashboard" />,
      tabid: [1],
    },
    {
      key: "subkey1",
      label: "Products",
      icon: <SvgIcon name="product" />,
      tabid: [2],
      children: [
        {
          key: ROUTER.STAFF_MANAGE_ORDER,
          label: "Manage Orders",
          tabid: [2],
        },
      ],
    },
    {
      key: ROUTER.STAFF_DASHBOARD,
      label: "Report",
      icon: <SvgIcon name="menu5" />,
      tabid: [4],
    },
    {
      key: ROUTER.STAFF_DASHBOARD,
      label: "Download History",
      icon: <SvgIcon name="dowload-export" />,
      tabid: [5],
    },
  ]
}

export const MenuItemUser = () => {
  return [
    // {
    //   key: ROUTER.TONG_QUAN,
    //   label: "Tổng quan",
    //   icon: <SvgIcon name="user-info" />,
    //   tabid: [1],
    // },
    // {
    //   key: ROUTER.THONG_TIN_TAI_KHOAN,
    //   label: "Thông tin cá nhân",
    //   icon: <SvgIcon name="user-info" />,
    //   tabid: [1],
    // },
    // {
    //   key: ROUTER.LS_HOAT_DONG_USER,
    //   label: "Lịch sử hoạt động",
    //   icon: <SvgIcon name="history-company" />,
    //   tabid: [1],
    // },
  ]
}
