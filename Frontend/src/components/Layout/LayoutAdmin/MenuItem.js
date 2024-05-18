import LstIcons from "src/components/ListIcons"

export const menuItem = () => {
  return [
    {
      icon: LstIcons.ICON_STATISTIC,
      label: "Thống kê",
      key: '/dashboard',
    },
    {
      icon: LstIcons.ICON_PREMIUM,
      label: "Gói premium",
      key: '/dashboard/packages',
    },
    {
      icon: LstIcons.ICON_USER,
      label: "Người dùng",
      key: '/dashboard/users',
    },
    {
      icon: LstIcons.ICON_GENRES,
      label: "Thể loại truyện",
      key: '/dashboard/genres',
    },
    {
      icon: LstIcons.ICON_COMIC,
      label: "Truyện",
      key: '/dashboard/comics',
    },
    {
      icon: LstIcons.ICON_PAYMENT,
      label: "Thanh toán",
      key: '/dashboard/payment',
    },
    {
      icon: <div style={{ marginLeft: '-5px' }}>{LstIcons.ICON_LOGOUT}</div>,
      label: "Đăng xuất",
      key: 'logout',
    },
  ]
}