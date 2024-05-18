import { useEffect, useState } from "react"
import ButtonCustom from "src/components/ButtonCustom/MyButton"
import { Dropdown, Empty } from "antd"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { globalSelector } from "src/redux/selector"
import globalSlice from "src/redux/globalSlice"
import { BadgeStyled } from "../styled"
import LstIcons from "src/components/ListIcons"
import socket from "src/utils/socket"
import NotificationItem from "./NotificationItem"
import NotificaitonService from "src/services/NotificationService"

const DropdownProfile = () => {

  const global = useSelector(globalSelector)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [notifications, setNotifications] = useState([])
  const [notifiNotSeen, setNotifiNotSeen] = useState(0)

  const handleLogout = () => {
    localStorage.removeItem('token')
    dispatch(globalSlice.actions.setUser({}))
    socket.disconnect()
    navigate('/login')
  }

  const handleSeenNotification = async () => {
    const res = await NotificaitonService.seenNotification(global?.user?._id)
    if (res?.isError) return
    getNotifications()
  }

  const getNotifications = async () => {
    const res = await NotificaitonService.getListNotificationByReceiver(global?.user?._id)
    if (res?.isError) return
    setNotifications(res?.data?.List)
    setNotifiNotSeen(res?.data?.NotSeen)
  }
  useEffect(() => {
    if (global?.user?._id) getNotifications()
  }, [])

  const menuItems = () => {
    let items
    if (!global?.user?.IsByGoogle && global?.user?.RoleID === 3) {
      items = [
        {
          label: (
            <Link to={'/profile'}>Trang cá nhân</Link>
          ),
          key: '1',
        },
        {
          label: (
            <Link to={'/mycomic'}>Truyện của tôi</Link>
          ),
          key: '2',
        },
        {
          label: (
            <Link to={'/change-password'}>Thay đổi mật khẩu</Link>
          ),
          key: '3',
        },
        {
          label: 'Đăng xuất',
          key: '4',
          onClick: () => handleLogout()
        },
      ]
    } else if (!global?.user?.IsByGoogle && global?.user?.RoleID !== 3) {
      items = [
        {
          label: (
            <Link to={'/profile'}>Trang cá nhân</Link>
          ),
          key: '1',
        },
        {
          label: (
            <Link to={'/change-password'}>Thay đổi mật khẩu</Link>
          ),
          key: '2',
        },
        {
          label: 'Đăng xuất',
          key: '3',
          onClick: () => handleLogout()
        },
      ]
    } else if (!!global?.user?.IsByGoogle && global?.user?.RoleID !== 3) {
      items = [
        {
          label: (
            <Link to={'/profile'}>Trang cá nhân</Link>
          ),
          key: '1',
        },
        {
          label: 'Đăng xuất',
          key: '2',
          onClick: () => handleLogout()
        },
      ]
    } else if (!!global?.user?.IsByGoogle && global?.user?.RoleID === 3) {
      items = [
        {
          label: (
            <Link to={'/profile'}>Trang cá nhân</Link>
          ),
          key: '1',
        },
        {
          label: (
            <Link to={'/mycomic'}>Truyện của tôi</Link>
          ),
          key: '2',
        },
        {
          label: 'Đăng xuất',
          key: '3',
          onClick: () => handleLogout()
        },
      ]
    }
    return items
  }

  const itemsNotification = [
    {
      key: '1',
      label: (
        notifications?.length > 0 ?
          <div style={{ width: '300px', padding: '12px' }}>
            {
              notifications?.map(i =>
                <NotificationItem data={i} />
              )
            }
          </div>
          :
          <Empty description="Chưa có thông báo" />
      )
    }
  ]

  socket.on('get-notification', (data) => {
    if (global?.user?._id === data?.Receiver) {
      setNotifications([...notifications, data])
      setNotifiNotSeen(notifiNotSeen + 1)
    }
  })

  return (
    <div className="d-flex-sb">
      {
        !!global?.user?._id ?
          <div className="d-flex-sb">
            {
              global?.user?.RoleID === 1 ?
                <ButtonCustom className="noBackground-textwhite fw-600">
                  Admintrator
                </ButtonCustom>
                :
                <>
                  <ButtonCustom
                    className=" noBackground-textwhite fw-600 medium fs-18"
                    onClick={() => navigate('/premium')}
                  >
                    Premium
                  </ButtonCustom>
                  <Dropdown menu={{ items: menuItems() }} trigger={["click"]}>
                    <ButtonCustom
                      className=" noBackground-textwhite fw-600"
                      icon={LstIcons.ICON_CARET_DOWN}
                    >
                      Cá nhân
                    </ButtonCustom>
                  </Dropdown>
                </>
            }
            <Dropdown
              menu={{ items: itemsNotification }}
              trigger={['click']}
              // onClick={() => {
              //   if (notifiNotSeen !== 0) {
              //     handleSeenNotification()
              //   }
              // }}
              onOpenChange={e => {
                if (!e) {
                  if (notifiNotSeen !== 0) handleSeenNotification()
                }
              }}
            >
              <BadgeStyled
                size="small"
                count={notifiNotSeen}
                style={{ fontSize: '10px' }}
              >
                <ButtonCustom
                  className="noBackground-textwhite"
                  icon={LstIcons.ICON_BELL}
                />
              </BadgeStyled>
            </Dropdown>
          </div>
          :
          <div>
            <ButtonCustom
              className=" noBackground-textwhite fw-600 medium fs-18"
              onClick={() => navigate('/premium')}
            >
              Premium
            </ButtonCustom>
            <ButtonCustom
              className="noBackground-textwhite fs-17 fw-600"
              onClick={() => navigate('/login')}
            >
              Login
            </ButtonCustom>
            <ButtonCustom
              className="noBackground-textwhite fs-17 fw-600"
              onClick={() => navigate('/signup')}
            >
              Sign up
            </ButtonCustom>
          </div>
      }
    </div>
  )
}

export default DropdownProfile