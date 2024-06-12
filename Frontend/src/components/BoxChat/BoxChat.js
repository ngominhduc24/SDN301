import { UserOutlined } from "@ant-design/icons"
import { Avatar, Input, Spin, Tooltip } from "antd"
import moment from "moment"
import { useEffect, useState } from "react"
import SvgIcon from "src/components/SvgIcon"
import STORAGE, { getStorage } from "src/lib/storage"
import CommunicationContact from "src/services/CommunicationContact"
import { WrapModal } from "./styled"
import SpinCustom from "../Spin"

const BoxChat = ({ Data, packageId }) => {
  const userInfo = getStorage(STORAGE.USER_INFO)
  const [listData, setListData] = useState([])
  const [text, setText] = useState([])
  const [loading, setLoading] = useState(false)

  const getList = () => {
    let accountId = userInfo?.AccountID
    setLoading(true)
    CommunicationContact.GetByObjectId({
      ObjectId: packageId || Data?.RequestPackageID,
      ReferenceId: accountId,
      PageSize: 100,
      CurrentPage: 1,
    })
      .then(res => {
        if (res.isOk) {
          setListData(res?.Object?.data)
          setText("")
        }
      })
      .finally(() => setLoading(false))
  }

  const toBottom = () => {
    var box = document.getElementById("myBox")

    // Thiết lập vị trí đích của cuộn
    var dest = box.offsetHeight

    // Cuộn trang
    box.scrollTo(0, dest * 200)
  }
  useEffect(() => {
    getList()
  }, [Data])
  useEffect(() => {
    toBottom()
  }, [listData])
  const AddComment = () => {
    let accountId = userInfo?.AccountID
    if (text) {
      setLoading(true)
      CommunicationContact.InsertOrUpdateContact({
        ObjectId: packageId || Data?.RequestPackageID,
        ReferenceId: accountId,
        Text: text,
      })
        .then(res => {
          if (res?.isOk) {
            getList()
          }
        })
        .finally(() => setLoading(false))
    }
  }

  return (
    <WrapModal>
      <SpinCustom spinning={loading}>
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <div className="body-chat" id="myBox">
            {listData?.map((data, idx) => (
              <div
                key={`${data?.CommunicationContactId}${idx}`}
                className={`row-chat ${data?.MySelf ? "my-self" : "your-self"}`}
              >
                <div className="chat-item">
                  <Avatar
                    src={data?.Logo}
                    className="your-avatar"
                    size={36}
                    icon={<UserOutlined style={{ fontSize: "20px" }} />}
                  />
                  <div style={{ maxWidth: "80%" }}>
                    <div className="account-name">{data?.AccountName}</div>
                    <div className="chat-content">
                      <div style={{ width: "100%" }}>{data?.Text}</div>
                      <Tooltip
                        title={moment(data?.createDate).format(
                          "DD/MM/YYYY HH:mm:ss",
                        )}
                        color="#40a9ff"
                      >
                        <div className="time">
                          {moment(data?.CreateDate).format("HH:mm")}
                        </div>
                      </Tooltip>
                    </div>
                  </div>
                  <Avatar
                    src={data?.Logo}
                    className="my-avatar"
                    size={36}
                    icon={<UserOutlined style={{ fontSize: "20px" }} />}
                  />
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex" }}>
            <Avatar
              src={userInfo?.Avatar}
              size={36}
              icon={<UserOutlined style={{ fontSize: "20px" }} />}
            />
            <Input
              style={{ width: "100%", margin: "0 16px" }}
              onChange={value => setText(value?.target?.value)}
              value={text}
              placeholder="Nhập nội dung"
              onPressEnter={AddComment}
            />
            <div style={{ cursor: "pointer" }} onClick={AddComment}>
              <SvgIcon name="send" />
            </div>
          </div>
        </div>
      </SpinCustom>
    </WrapModal>
  )
}

export default BoxChat
