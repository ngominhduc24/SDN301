import ROUTER from "src/router"
import SvgIcon from "../SvgIcon"
import { useSelector } from "react-redux"
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

export const MenuItemTopAdmin = [
  // {
  //   label: "Trang chủ",
  //   key: ROUTER.HOME,
  //   icon: <HomeOutlined />,
  // },
  // {
  //   label: "Hỏi đáp",
  //   key: ROUTER.QUESTION,
  //   disabled: false,
  // },
  {
    key: "subkey2",
    label: "Danh mục",
    icon: <SvgIcon name="menu5" />,
    tabid: [13, 14, 15, 16, 17, 18, 19],
    children: [
      {
        key: ROUTER.CAN_BO,
        label: "Cán bộ - Phân quyền",
        // icon: <SvgIcon name="menu14" />,
        tabid: [13],
      },
      {
        key: ROUTER.QUAN_LY_PHAN_QUYEN,
        label: "Phân quyền",
        tabid: [14],
      },

      {
        key: ROUTER.DIA_DIEM,
        label: "Địa điểm",
        tabid: [15],
      },
      {
        key: ROUTER.HAU_CAN_DICH_VU_KHAC,
        label: "Hậu cần - Dịch vụ khác",
        tabid: [16],
      },
      // {
      //   key: ROUTER.UY_BAN,
      //   label: "Ủy ban",
      //   tabid: [1],
      // },
      {
        key: ROUTER.GOP_Y_TAI_LIEU,
        label: "Góp ý tài liệu",
        tabid: [17],
      },
      {
        key: ROUTER.NHOM_TAI_LIEU,
        label: "Nhóm tài liệu",
        // icon: <SvgIcon name="menu21" />,
        tabid: [18],
      },
      {
        key: ROUTER.KET_LUAN_HOP_MAU,
        label: "KLH mẫu",
        tabid: [19],
      },
    ],
  },
]
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
        {
          key: ROUTER.SO_DO_PHONG_HOP,
          label: "Manage Orders",
          tabid: [3],
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
        {
          key: ROUTER.MANAGE_STORE,
          label: "Store",
          tabid: [7],
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
        {
          key: ROUTER.MANAGE_WAREHOUSE,
          label: "Warehouse",
          tabid: [9],
        },
      ],
    },
    {
      key: "subkey4",
      label: "Administrator",
      icon: <SvgIcon name="menu17" />,
      tabid: [10, 11],
      children: [
        {
          key: ROUTER.MANAGE_USER,
          label: "Manage User",
          tabid: [10],
        },
        {
          key: ROUTER.MANAGE_USER,
          label: "User",
          tabid: [11],
        },
      ],
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
    {
      key: "subkey6",
      label: "Warehouse Mananer",
      icon: <SvgIcon name="menu14" />,
      tabid: [14],
      children: [
        {
          key: ROUTER.WAREHOUSE_MANAGER_MANAGE_INVOICE,
          label: "Manage Invoice",
          tabid: [14],
        },
      ],
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
    {
      key: ROUTER.THONG_TIN_TAI_KHOAN,
      label: "Thông tin cá nhân",
      icon: <SvgIcon name="user-info" />,
      tabid: [1],
    },
    // {
    //   key: ROUTER.LS_HOAT_DONG_USER,
    //   label: "Lịch sử hoạt động",
    //   icon: <SvgIcon name="history-company" />,
    //   tabid: [1],
    // },
  ]
}

