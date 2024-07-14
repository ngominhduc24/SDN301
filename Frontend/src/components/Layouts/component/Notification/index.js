import { Badge, Col, Dropdown } from "antd"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import SvgIcon from "src/components/SvgIcon"
import STORAGE, { getStorage } from "src/lib/storage"
import useWindowSize from "src/lib/useWindowSize"
// import {
//   default as NotifyApi,
//   default as NotifyService,
// } from "src/services/NotifyService"
import NotifyForm from "./components/NotifyForm"
import io from 'socket.io-client';
const socket = io('https://sdn301.onrender.com');   // replace with env config


const Notification = props => {
  const isLaptop = useWindowSize.isLaptop() || false
  const isDesktop = useWindowSize.isDesktop() || false
  const isMobile = useWindowSize.isMobile() || false
  const isTablet = useWindowSize.isTablet() || false

  const { notifyData } = useSelector(state => state?.notify)

  const [numberOfNewNotifies, setNumberOfNewNotifies] = useState()
  const [listNotify, setListNotify] = useState([])
  const [visible, setVisible] = useState(false)
  const isLogin = getStorage(STORAGE.TOKEN)
  const [loading, setLoading] = useState(false)
  const userInfo = getStorage(STORAGE.USER_INFO)
  const [paginationNof, setPaginationNof] = useState({
    CurrentPage: 1,
    PageSize: 8,
    TextSearch: "",
  })

  useEffect(() => {
    const shopId = 0; //  Lấy shopId từ token sau khi backend truyền cho để gán vào đây
    socket.emit('joinShop', shopId);

    socket.on('notification', (msg) => {
      alert(msg);   // thông báo mỗi lần tạo đơn hàng ở đây, bạn tự triển khai nhé có thể setListNotify hoặc gì đó
    });

    return () => {
      socket.off('notification');
    };
  }, []);

  // useEffect(() => {
  //   if (!!isLogin) getListNotify()
  // }, [isLogin, paginationNof])
  // useEffect(() => {
  //   if (!!notifyData && !!isLogin) {
  //     notifyData.forEach(item => {
  //       if (item.userId === userInfo.UserID) {
  //         if (item.numberUnseen > 0) {
  //           getListNotify()
  //           setNumberOfNewNotifies(item.numberUnseen)
  //         }
  //       }
  //     })
  //   }
  // }, [notifyData])
  // const getListNotify = async () => {
  //   try {
  //     setLoading(true)
  //     const res = await NotifyService.GetListNotify({
  //       ...paginationNof,
  //     })

  //     if (res?.isError) return
  //     setListNotify(res?.Object)
  //   } finally {
  //     setLoading(false)
  //   }
  // }
  return (
    <Dropdown
      overlay={
        <NotifyForm
          // getList={() => getListNotify()}
          paginationNof={paginationNof}
          setPaginationNof={setPaginationNof}
          listNotify={listNotify}
          loading={loading}
          onClose={() => setVisible(false)}
        />
      }
      onOpenChange={setVisible}
      open={visible}
      trigger={["click"]}
    >
      <Col
        className={`pointer ${!!isMobile && "pr-0"}`}
        onClick={() => {
          if (numberOfNewNotifies > 0) {
            setNumberOfNewNotifies(0)
            setLoading(true)
            // NotifyApi.MarkAsSeen("")
            //   .then(res => {
            //     if (res.isOk) {
            //       getListNotify()
            //     }
            //   })
            //   .finally(() => setLoading(false))
          }
        }}
      >
        <Badge
          count={listNotify?.TotalIsRead || 0}
          overflowCount={99}
          size="small"
          className="notification_count"
        >
          <SvgIcon name="bell" />
        </Badge>
      </Col>
    </Dropdown>
  )
}
export default Notification

