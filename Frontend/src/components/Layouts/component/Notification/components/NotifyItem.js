import { UserOutlined } from "@ant-design/icons";
import { Avatar, Tooltip } from "antd";
import React from "react";
import { WrapNotifyItem } from "../styled";

const NotifyItem = ({ notify, handleClick }) => {
  const contentParts = notify?.Content ? notify.Content.split(":") : [];
  const contentPart1 = contentParts[0] || "";
  const contentPart2 = contentParts[1] || notify?.PackageName || "";

  return (
    <WrapNotifyItem
      className={!notify?.isRead ? "unread" : ""}
      onClick={handleClick}
    >
      <div className="avatar">
        <Avatar
          size={32}
          src={notify?.logo}
          icon={<UserOutlined style={{ fontSize: "16px" }} />}
        />
      </div>
      <div className="content-notify">
        <div className="hidden-text">
          <span className="account-name" style={{ fontSize: "14px"}}>{notify?.title}</span>
          <br />
          <Tooltip title={`${notify?.accountName} - ${notify?.content || ""}`}>
          <span className="account-name" style={{ fontSize: "13px" }} >{notify?.accountName}: </span>{" "}
          <span className="account-name" style={{ fontSize: "13px", fontWeight: "normal" }} >{notify?.content || ""}</span>{" "}
          <span>{contentPart1}</span>{" "}
            <span className="package-name">
              {contentPart2}
            </span>
          </Tooltip>
        </div>
        <div className="time"> {notify?.timeAgo}</div>
      </div>
    </WrapNotifyItem>
  );
};

export default NotifyItem;
