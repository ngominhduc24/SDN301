import { Badge, Col, Dropdown } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SvgIcon from "src/components/SvgIcon";
import STORAGE, { getStorage } from "src/lib/storage";
import useWindowSize from "src/lib/useWindowSize";
import NotifyForm from "./components/NotifyForm";
import io from 'socket.io-client';

const socket = io('https://sdn301.onrender.com'); // replace with env config

const Notification = (props) => {
  const isMobile = useWindowSize.isMobile() || false;
  const { notifyData } = useSelector(state => state?.notify);

  const [numberOfNewNotifies, setNumberOfNewNotifies] = useState(0);
  const [listNotify, setListNotify] = useState([]);
  const [visible, setVisible] = useState(false);
  const isLogin = getStorage(STORAGE.TOKEN);
  const userInfo = getStorage(STORAGE.USER_INFO);

  useEffect(() => {
    console.log('List of notifications:', listNotify);
  }, [listNotify]);

  // Handle socket connections and notifications
  useEffect(() => {
    const shopId = userInfo?.shopId || 0; // Replace with appropriate shopId from user info or state
    socket.emit('joinShop', shopId);

    socket.on('notification', (notification) => {
      // Add the new notification to the beginning of the list
      setListNotify(prevList => [notification, ...prevList]);
      setNumberOfNewNotifies(prevCount => (prevCount || 0) + 1);
    });

    return () => {
      socket.off('notification');
    };
  }, [userInfo]);

  const handleDropdownVisibleChange = (visible) => {
    setVisible(visible);
    if (visible && numberOfNewNotifies > 0) {
      setNumberOfNewNotifies(0);
      // Here you can add logic to mark notifications as seen if needed
    }
  };

  return (
    <Dropdown
      overlay={
        <NotifyForm
          listNotify={listNotify}
          onClose={() => setVisible(false)}
        />
      }
      onOpenChange={handleDropdownVisibleChange}
      open={visible}
      trigger={["click"]}
    >
      <Col className={`pointer ${isMobile && "pr-0"}`}>
        <Badge
          count={numberOfNewNotifies}
          overflowCount={99}
          size="small"
          className="notification_count"
        >
          <SvgIcon name="bell" />
        </Badge>
      </Col>
    </Dropdown>
  );
};

export default Notification;
