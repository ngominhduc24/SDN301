import { Col, Form, Row, Space, Tabs } from "antd"
import dayjs from "dayjs"
import { useEffect, useState } from "react"
import CustomModal from "src/components/Modal/CustomModal"
import FormInsertUpdateProgram from "./components/FormInsertUpdateProgram"
import { PatentRegistrationChildBorder, StylesTabPattern } from "./styled"
import TableCustom from "src/components/Table/CustomTable"
import CB1 from "src/components/Modal/CB1"
import ButtonCircle from "src/components/MyButton/ButtonCircle"
import ModalInsertUpdateContent from "./components/modal/ModalInsertUpdateContent"
import ModalAttendance from "./components/modal/ModalAttendance"
import Notice from "src/components/Notice"
import { convertTreeData } from "src/lib/utils"
import Button from "src/components/MyButton/Button"

export const convertTreeDataParticipants = (
  listData,
  withAnchor = false,
  id,
  name,
  parent,
  disableCity = false,
) => {
  if (!listData || !listData.length) return []

  let levelMin = false
  for (let i = 0; i < listData.length; i++) {
    console.log(listData[i].Level)
    if (!levelMin) {
      levelMin = listData[i].Level
    }
    if (listData[i].Level < levelMin) {
      levelMin = listData[i].Level
    }
  }
  console.log(levelMin, "levelMin")
  const listRoot = listData.filter(x => x.Level === levelMin)
  const listOther = listData.filter(y => y.Level > levelMin)
  const treeDataConvert = convertChildrent(
    listRoot,
    listOther,
    withAnchor,
    id,
    name,
    parent,
    disableCity,
  )
  return treeDataConvert
}

const convertChildrent = (
  listRoot,
  listOther,
  withAnchor,
  id,
  name,
  parent,
  disableCity = false,
) => {
  const newList = listRoot.map(root => {
    let childrenSublit = []
    if (root?.UserInfoOutputList?.length) {
      childrenSublit = root?.UserInfoOutputList.map(i => ({
        title: i?.FullName,
        value: i?.UserID,
        key: i?.UserID,
        disabled: false,
      }))
    }
    const newItem = {
      ...root,
      children: root?.children ? root?.children : childrenSublit,
      title: root[name] || root?.FullName,
      label: root[name] || root?.FullName,
      key: root[id],
      id: root[id],
      value: root[id],
      Status: root["Status"],
      disabled: root?.Level ? disableCity : false,
    }
    const listChild = [...listOther.filter(x => x[parent] === root[id])]
    const listOtherChild = listOther.filter(y => y[parent] !== root[id])
    if (listChild && listChild.length)
      return {
        ...newItem,
        children: [
          ...convertChildrent(
            listChild,
            listOtherChild,
            withAnchor,
            id,
            name,
            parent,
            disableCity,
          ),
          ...childrenSublit,
        ],
      }
    return newItem
  })
  return newList
}
const InsertUpdateProgram = ({ open, onCancel, onOk }) => {
  const [form] = Form.useForm()
  const [activeKey, setActiveKey] = useState(1)
  const [loading, setLoading] = useState(false)
  const [BookingID, setBookingID] = useState()
  const [contents, setContents] = useState([])
  const [documents, setDocuments] = useState([])
  const [treeDocuments, setTreeDocuments] = useState([])
  const [modalInsertUpdateContent, setModalInsertUpdateContent] =
    useState(false)
  const [modalAttendanceContent, setModalAttendanceContent] = useState(false)
  const [atendanceContents, setAttendanceContents] = useState(false)
  const [meetingRooms, setMeetingRooms] = useState([])
  const [participants, setParticipants] = useState([])
  const [ltAccount, setLtAccount] = useState([])
  const [filter, setFilter] = useState({
    TextSearch: "",
    BookingID: open?.BookingID,
  })
  const [bodyContent, setBodyContent] = useState({
    BookingID: open?.BookingID,
  })

  const column = [
    {
      title: "STT",
      width: 60,
      render: (_, record, index) => (
        <div className="text-center">{index + 1}</div>
      ),
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "Date",
      width: 160,
      key: "Date",
      render: (_, record) => (
        <span>{dayjs(record?.Date).format("DD/MM/YYYY")}</span>
      ),
    },
    {
      title: "Thời gian bắt đầu",
      dataIndex: "StartDate",
      width: 120,
      key: "StartDate",
      render: (_, record) => (
        <span>{dayjs(record?.StartDate).format("HH:mm")}</span>
      ),
    },
    {
      title: "Thời gian kết thúc",
      dataIndex: "EndDate",
      width: 120,
      key: "EndDate",
      render: (_, record) => (
        <span>{dayjs(record?.EndDate).format("HH:mm")}</span>
      ),
    },
    {
      title: "Nội dung",
      dataIndex: "Content",
      width: 400,
      render: (_, record) => (
        <span dangerouslySetInnerHTML={{ __html: record?.Content }} />
      ),
    },
    {
      title: "Tài liệu",
      dataIndex: "ltDocumentFolderID",
      width: 200,
      render: (_, record) =>
        record?.ltDocumentFolderID?.map((i, idx) => (
          <div key={idx}>{i?.DocumentName}</div>
        )),
    },
    {
      title: "Chức năng",
      width: 120,
      render: (_, record) => (
        <Space>
          {listBtn(record).map((i, idx) => (
            <ButtonCircle
              key={idx}
              title={i.name}
              iconName={i.icon}
              onClick={i.onClick}
            />
          ))}
        </Space>
      ),
    },
  ]

  useEffect(() => {}, [])

  useEffect(() => {
    if (!!open?.BookingID) {
      form.setFieldsValue({
        ...open,
        DateValue: [dayjs(open?.StartDate), dayjs(open?.EndDate)],
        Device: open?.Device !== 0 ? open?.Device : undefined,
        ltAccountID: !!open?.ListUser.length
          ? open?.ListUser.map(i => ({
              AccountID: i?.UserID,
              RoleBookingAccount: i?.RoleBookingAccount,
            }))
          : [],
      })
      setBookingID(open?.BookingID)
    }
  }, [open])

  useEffect(() => {
    if (!!BookingID) {
    }
  }, [BookingID])

  const items = [
    {
      key: 1,
      label: <div>Chương trình họp</div>,
      children: (
        <PatentRegistrationChildBorder>
          <FormInsertUpdateProgram
            form={form}
            meetingRooms={meetingRooms}
            participants={participants}
            ltAccount={ltAccount}
            setLtAccount={setLtAccount}
          />
        </PatentRegistrationChildBorder>
      ),
    },
  ]

  const listBtn = record => [
    {
      name: "Chỉnh sửa",
      icon: "edit-green",
      onClick: () => setModalInsertUpdateContent(record),
    },
    {
      name: "Xóa",
      icon: "delete-red-row",
      onClick: () =>
        CB1({
          record,
          title: `Bạn có chắc chắn xóa ?`,
          icon: "warning-usb",
          okText: "Có",
          cancelText: "Không",
          onOk: async close => {
            close()
          },
        }),
    },
  ]

  const renderFooter = () => (
    <div className="lstBtn d-flex-sb">
      <div className="lstBtn-right d-flex-end">
        <>
          <Button
            Button
            btntype="primary"
            className="ml-8 mt-12 mb-12"
            loading={loading}
          >
            {!!BookingID ? "Cập nhật" : "Lưu"}
          </Button>
        </>
        <Button
          btntype="third"
          className="ml-8 mt-12 mb-12"
          onClick={() => onCancel()}
        >
          Đóng
        </Button>
      </div>
    </div>
  )

  return (
    <div>
      <CustomModal
        open={open}
        onCancel={onCancel}
        onOk={onOk}
        title={open?.BookingID ? "Chỉnh sửa cửa hàng" : "Thêm mới cửa hàng"}
        width="90vw"
        footer={renderFooter()}
      >
        <StylesTabPattern>
          <Tabs
            type="card"
            defaultActiveKey="1"
            items={items}
            activeKey={activeKey}
            onChange={key => {
              setActiveKey(key)
            }}
          />
        </StylesTabPattern>
      </CustomModal>

      {!!modalInsertUpdateContent && (
        <ModalInsertUpdateContent
          documents={documents}
          open={modalInsertUpdateContent}
          onCancel={() => setModalInsertUpdateContent(false)}
        />
      )}
      {!!modalAttendanceContent && (
        <ModalAttendance
          open={modalAttendanceContent}
          ltUser={open?.ListUser}
          BookingID={open?.BookingID}
          atendanceContents={atendanceContents}
          onCancel={() => setModalAttendanceContent(false)}
        />
      )}
    </div>
  )
}

export default InsertUpdateProgram

