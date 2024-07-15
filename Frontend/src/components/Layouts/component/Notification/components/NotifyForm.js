import { Empty, Input, Spin, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import NotifyItem from "./NotifyItem";
import InfiniteScrollCustom from "./InfiniteScrollCustom";
import SvgIcon from "src/components/SvgIcon";
import { LoadingOutlined } from "@ant-design/icons";
import { WrapNotify } from "../styled";
import useWindowSize from "src/lib/useWindowSize";
import { useNavigate } from "react-router-dom";
import CB1 from "src/components/Modal/CB1";
import ROUTER from "src/router";

const NotifyForm = ({
  listNotify,
  loading,
  onClose,
}) => {
  const isLaptop = useWindowSize.isLaptop() || false;
  const isDesktop = useWindowSize.isDesktop() || false;
  const isMobile = useWindowSize.isMobile() || false;
  const isTablet = useWindowSize.isTablet() || false;
  const navigate = useNavigate();
  const [isloading, setLoading] = useState(false);

  const handleReadAll = () => {
    // Implement the mark all as read functionality here
  };

  const handleDeleteAll = () => {
    onClose();
    CB1({
      title: `Bạn có chắc chắn muốn xóa tất cả thông báo không?`,
      icon: "trashRed",
      okText: "Xác nhận",
      onOk: async close => {
        // Implement the delete all notifications functionality here
        close();
      },
    });
  };

  const handleClick = notify => {
    // Implement the mark as read and navigate functionality here
    onClose();
    switch (notify?.Type) {
      case 1:
        navigate(ROUTER.CHI_TIET_THONG_BAO, {
          state: { BookingID: notify?.ReferenceId, Type: 3 },
        });
        break;
      case 2:
        navigate(ROUTER.VAN_KIEN_TAI_LIEU, {
          state: { BookingID: notify?.ReferenceId },
        });
        break;
      case 3:
        navigate(ROUTER.DUYET_KET_LUAN_HOP, {
          state: {
            BookingID: notify?.ReferenceId,
            MeetingConclusion: notify?.Content,
          },
        });
        break;
      default:
        navigate(ROUTER.CHI_TIET_THONG_BAO, {
          state: { BookingID: notify?.ReferenceId, Type: 4, data: notify },
        });
        break;
    }
  };

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
          <Input.Search
            placeholder="Tìm kiếm"
            onSearch={() => {}} // Add search functionality if needed
            enterButton
          />
          <div className="wrap-tabs">
            <Tabs defaultActiveKey="1">
              <Tabs.TabPane
                tab={`Tất cả (${listNotify.length})`}
                key="1"
              >
                <div className="body-notify" id="scrollableDiv">
                  {listNotify.length > 0 ? (
                    <InfiniteScrollCustom
                      dataLength={listNotify.length}
                      next={() => {}} // Implement load more functionality if needed
                      scrollableTarget="scrollableDiv"
                      hasMore={false} // Update based on load more functionality
                    >
                      {listNotify.map(notify => (
                        <NotifyItem
                          notify={notify}
                          key={notify.NotifyId}
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
                tab={`Chưa đọc (${listNotify.filter(notify => !notify.IsRead).length})`}
                key="2"
              >
                <div className="body-notify" id="scrollableDiv2">
                  {listNotify.filter(notify => !notify.IsRead).length > 0 ? (
                    <InfiniteScrollCustom
                      dataLength={listNotify.length}
                      next={() => {}} // Implement load more functionality if needed
                      scrollableTarget="scrollableDiv2"
                      hasMore={false} // Update based on load more functionality
                    >
                      {listNotify.filter(notify => !notify.IsRead).map(
                        notify => (
                          <NotifyItem
                            notify={notify}
                            key={notify.NotifyId}
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
          {listNotify.length > 0 && (
            <div className="footer-notify link-name" onClick={handleDeleteAll}>
              <span>Xoá tất cả</span>
            </div>
          )}
        </div>
      </Spin>
    </WrapNotify>
  );
};

export default NotifyForm;
