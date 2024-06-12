import { Empty, Input, Spin, Tabs } from "antd"
import React, { useEffect, useState } from "react"
import NotifyItem from "./NotifyItem"
import InfiniteScrollCustom from "./InfiniteScrollCustom"
import SvgIcon from "src/components/SvgIcon"
// import NotifyApi from "src/services/NotifyService"
import { LoadingOutlined } from "@ant-design/icons"
import { WrapNotify } from "../styled"
import useWindowSize from "src/lib/useWindowSize"
import { useNavigate } from "react-router-dom"
import CB1 from "src/components/Modal/CB1"
import ROUTER from "src/router"

const NotifyForm = ({
  listNotify,
  loading,
  getList,
  onClose,
  paginationNof,
  setPaginationNof,
}) => {
  const isLaptop = useWindowSize.isLaptop() || false
  const isDesktop = useWindowSize.isDesktop() || false
  const isMobile = useWindowSize.isMobile() || false
  const isTablet = useWindowSize.isTablet() || false
  const navigate = useNavigate()
  const [isloading, setLoading] = useState(false)
  const onSearch = textSearch => {
    setPaginationNof(pre => ({ ...pre, PageSize: 8, TextSearch: textSearch }))
  }

  const [hasMore, setHasMore] = useState(true)

  const getMorePost = () => {
    setPaginationNof(pre => ({
      ...pre,
      PageSize: pre?.PageSize + 8,
      // PageSize: pre?.PageSize + pre?.PageSize,
    }))
  }
  useEffect(() => {
    if (listNotify?.Total <= listNotify?.Data?.length) setHasMore(false)
  }, [listNotify])

  const handleReadAll = () => {
    setLoading(true)
      // NotifyApi.MarkAsRead("")
      .then(res => {
        if (res?.isOk) {
          !!getList && getList("")
        }
      })
      .finally(() => setLoading(false))
  }

  const handleDeleteAll = () => {
    onClose()

    CB1({
      title: `Bạn có chắc chắn muốn xóa tất cả thông báo không?`,
      icon: "trashRed",
      okText: "Xác nhận",
      onOk: async close => {
        setLoading(true)
          // NotifyApi.DeleteNotifyForUser("")
          .then(res => {
            if (res?.isOk) {
              !!getList && getList("")
            }
          })
          .finally(() => setLoading(false))
        close()
      },
    })
  }

  const handleClick = notify => {
    setLoading(true)
      // NotifyApi.MarkAsRead(notify?.NotifyId)
      .then(res => {
        if (res?.isOk) {
          !!getList && getList("")
        }
      })
      .finally(() => setLoading(false))
    onClose()
    switch (notify?.Type) {
      //Xác nhận lịch họp
      case 1:
        navigate(ROUTER.CHI_TIET_THONG_BAO, {
          state: { BookingID: notify?.ReferenceId, Type: 3 },
        })
        break
      //Mời góp ý tài liệu
      case 2:
        navigate(ROUTER.VAN_KIEN_TAI_LIEU, {
          state: { BookingID: notify?.ReferenceId },
        })
        break
      //Duyệt kết luận họp

      case 3:
        navigate(ROUTER.DUYET_KET_LUAN_HOP, {
          state: {
            BookingID: notify?.ReferenceId,
            MeetingConclusion: notify?.Content,
          },
        })
        break
      default:
        //Chi tiết thông báo
        navigate(ROUTER.CHI_TIET_THONG_BAO, {
          state: { BookingID: notify?.ReferenceId, Type: 4, data: notify },
        })
        break
    }
  }
  return (
    <WrapNotify
      style={{
        maxWidth: "440px",
        minWidth: isMobile ? "300px" : "400px",
      }}
    >
      <Spin
        spinning={loading || isloading}
        indicator={
          <LoadingOutlined
            style={{
              fontSize: 24,
            }}
            spin
          />
        }
      >
        <div className="container">
          <div className="header-notify">
            <div className="title">Thông báo</div>
            <div className="link-name d-flex" onClick={handleReadAll}>
              Đánh dấu đã đọc <SvgIcon name="checks" className="icon" />
            </div>
          </div>
          {/* <Search
              placeholder="Tìm kiếm"
              onChange={onSearch}
              loading={loading}
            /> */}

          <Input.Search
            placeholder="Tìm kiếm"
            onSearch={onSearch}
            enterButton
          />
          <div className="wrap-tabs">
            <Tabs defaultActiveKey="1">
              <Tabs.TabPane
                tab={`Tất cả (${!!listNotify?.Total ? listNotify?.Total : 0})`}
                key="1"
              >
                <div className="body-notify" id="scrollableDiv">
                  {(!!listNotify?.Data ? listNotify?.Data?.length : 0) > 0 ? (
                    <InfiniteScrollCustom
                      dataLength={listNotify?.Data?.length}
                      next={getMorePost}
                      scrollableTarget="scrollableDiv"
                      hasMore={hasMore}
                    >
                      {listNotify?.Data?.map(notify => (
                        <NotifyItem
                          notify={notify}
                          key={notify?.NotifyId}
                          handleClick={() => handleClick(notify)}
                        />
                      ))}
                    </InfiniteScrollCustom>
                  ) : (
                    <Empty
                      description={"Chưa có thông báo nào!"}
                      style={{ paddingBottom: 24 }}
                    />
                  )}
                </div>
              </Tabs.TabPane>
              <Tabs.TabPane
                tab={`Chưa đọc (${
                  !!listNotify?.TotalIsRead ? listNotify?.TotalIsRead : 0
                })`}
                key="2"
              >
                <div className="body-notify" id="scrollableDiv2">
                  {(!!listNotify?.Data && listNotify?.Data?.length
                    ? listNotify?.Data.filter(notify => !notify?.IsRead)?.length
                    : 0) > 0 ? (
                    <InfiniteScrollCustom
                      dataLength={listNotify?.Data?.length}
                      next={getMorePost}
                      scrollableTarget="scrollableDiv2"
                      hasMore={hasMore}
                    >
                      {listNotify?.Data?.filter(notify => !notify?.IsRead)?.map(
                        notify => (
                          <NotifyItem
                            notify={notify}
                            key={notify?.NotifyId}
                            handleClick={() => handleClick(notify)}
                          />
                        ),
                      )}
                    </InfiniteScrollCustom>
                  ) : (
                    <Empty
                      description={"Chưa có thông báo nào!"}
                      style={{ paddingBottom: 24 }}
                    />
                  )}
                </div>
              </Tabs.TabPane>
            </Tabs>
          </div>
          {(!!listNotify?.Data ? listNotify?.Data?.length : 0) > 0 && (
            <div className="footer-notify link-name" onClick={handleDeleteAll}>
              <span>Xoá tất cả</span>
            </div>
          )}
        </div>
      </Spin>
    </WrapNotify>
  )
}

export default NotifyForm

