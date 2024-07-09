import { Col, Form, Input, Row, Space, Tabs } from "antd"
import dayjs from "dayjs"
import { useEffect, useState } from "react"
import CustomModal from "src/components/Modal/CustomModal"
import FormInsertUpdateProgram from "./components/FormInsertUpdateStore"
import { PatentRegistrationChildBorder, StylesTabPattern } from "./styled"
import TableCustom from "src/components/Table/CustomTable"
import CB1 from "src/components/Modal/CB1"
import ButtonCircle from "src/components/MyButton/ButtonCircle"
import ModalInsertUpdateStore from "./components/modal/ModalInsertUpdateStore"
import Notice from "src/components/Notice"
import { convertTreeData } from "src/lib/utils"
import Button from "src/components/MyButton/Button"
import AdminServices from "src/services/AdminService"

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
const InsertUpdateStore = ({ open, onCancel, onOk, data }) => {
  const [form] = Form.useForm()
  const [activeKey, setActiveKey] = useState(1)
  const [loading, setLoading] = useState(false)
  const [modalInsertUpdateStore, setModalInsertUpdateStore] =
    useState(false)
const [stateBody, setStateBody] = useState({})
  const [filter, setFilter] = useState({
    TextSearch: "",
  })

  // const column = [
  //   {
  //     title: "STT",
  //     width: 60,
  //     render: (_, record, index) => (
  //       <div className="text-center">{index + 1}</div>
  //     ),
  //   },
  //   {
  //     title: "Ngày bắt đầu",
  //     dataIndex: "Date",
  //     width: 160,
  //     key: "Date",
  //     render: (_, record) => (
  //       <span>{dayjs(record?.Date).format("DD/MM/YYYY")}</span>
  //     ),
  //   },
  //   {
  //     title: "Thời gian bắt đầu",
  //     dataIndex: "StartDate",
  //     width: 120,
  //     key: "StartDate",
  //     render: (_, record) => (
  //       <span>{dayjs(record?.StartDate).format("HH:mm")}</span>
  //     ),
  //   },
  //   {
  //     title: "Thời gian kết thúc",
  //     dataIndex: "EndDate",
  //     width: 120,
  //     key: "EndDate",
  //     render: (_, record) => (
  //       <span>{dayjs(record?.EndDate).format("HH:mm")}</span>
  //     ),
  //   },
  //   {
  //     title: "Nội dung",
  //     dataIndex: "Content",
  //     width: 400,
  //     render: (_, record) => (
  //       <span dangerouslySetInnerHTML={{ __html: record?.Content }} />
  //     ),
  //   },
  //   {
  //     title: "Tài liệu",
  //     dataIndex: "ltDocumentFolderID",
  //     width: 200,
  //     render: (_, record) =>
  //       record?.ltDocumentFolderID?.map((i, idx) => (
  //         <div key={idx}>{i?.DocumentName}</div>
  //       )),
  //   },
  //   {
  //     title: "Chức năng",
  //     width: 120,
  //     render: (_, record) => (
  //       <Space>
  //         {listBtn(record).map((i, idx) => (
  //           <ButtonCircle
  //             key={idx}
  //             title={i.name}
  //             iconName={i.icon}
  //             onClick={i.onClick}
  //           />
  //         ))}
  //       </Space>
  //     ),
  //   },
  // ]

  useEffect(() => {
    form.resetFields();
    setStateBody({
      new: {
        name: data?.name || "",
        location: data?.location || "",
        phone: data?.phone || "",
        email: data?.email || "",
        status: data?.status || "closed"
      }
    })
  }, [data, form])

  // useEffect(() => {
  //   if (!!open?.BookingID) {
  //     form.setFieldsValue({
  //       ...open,
  //       DateValue: [dayjs(open?.StartDate), dayjs(open?.EndDate)],
  //       Device: open?.Device !== 0 ? open?.Device : undefined,
  //       ltAccountID: !!open?.ListUser.length
  //         ? open?.ListUser.map(i => ({
  //             AccountID: i?.UserID,
  //             RoleBookingAccount: i?.RoleBookingAccount,
  //           }))
  //         : [],
  //     })
  //     setBookingID(open?.BookingID)
  //   }
  // }, [open])

  const handleChangeStore = (storeId, field, value) => {
    setStateBody(prev => ({
      ...prev,
      [storeId]: {
        ...prev[storeId],
        [field]: value
      }
    }))
  }

  const column = [
    {
      title: "STT",
      key: "_id",
      width: 60,
      render: (_, record, index) => 
        <div className="text-center">{index + 1}</div>
    },
    {
      title: "Tên cửa hàng",
      dataIndex: "name",
      width: 200,
      key: "name",
      render: (text, record) => (
        <Input onChange={e => handleChangeStore(record._id, "name", e.target.value)}/>
      )
    },
    {
      title: "Địa chỉ",
      dataIndex: "location",
      key: "location",
      width: 50,
      render: (text, record) => (
        <Input onChange={e => handleChangeStore(record._id, "location", e.target.value)}/>
      )
    },
    {
      title: "Điện thoại",
      dataIndex: "phone",
      width: 300,
      key: "phone",
      render: (text, record) => (
        <Input
          onChange={(e) => handleChangeStore(record._id, "phone", e.target.value)}
        />
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      width: 120,
      key: "email",
      render: (text, record) => (
        <Input
          onChange={(e) => handleChangeStore(record._id, "email", e.target.value)}
        />
      ),
    },
    // {
    //   title: "Action",
    //   dataIndex: "status",
    //   width: 120,
    //   key: "status",
    //   render: (_, record) => (
    //     <Switch
    //       onChange={(checked) => toggleStatus(record._id, checked)}
    //     />
    //   ),
    // }
  ]
  // const items = [
  //   {
  //     key: 1,
  //     label: <div>Thêm mới cửa hàng</div>,
  //     // children: (
  //     //   <PatentRegistrationChildBorder>
         
  //     //   </PatentRegistrationChildBorder>
  //     // ),
  //   },
  // ]

  // const listBtn = record => [
  //   {
  //     name: "Chỉnh sửa",
  //     icon: "edit-green",
  //     onClick: () => setModalInsertUpdateContent(record),
  //   },
  //   {
  //     name: "Xóa",
  //     icon: "delete-red-row",
  //     onClick: () =>
  //       CB1({
  //         record,
  //         title: `Bạn có chắc chắn xóa ?`,
  //         icon: "warning-usb",
  //         okText: "Có",
  //         cancelText: "Không",
  //         onOk: async close => {
  //           close()
  //         },
  //       }),
  //   },
  // ]

  const onContinue = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      const res = await AdminServices.addStores({ ...values })
      if (res?.isError) return
      onOk && onOk()
      Notice({
        msg: `Thêm cửa hàng thành công!`,
      })
      //   props?.onCancel()
    } catch (error) {
      console.log("error")
    } finally {
      setLoading(false)
    }
  }

  const renderFooter = () => (
    <div className="lstBtn d-flex-sb">
      <div className="lstBtn-right d-flex-end">
        <>
          <Button
            Button
            btntype="primary"
            className="ml-8 mt-12 mb-12"
            loading={loading}
            onClick={onContinue}
          >
          Tạo mới</Button>
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
        title={"Thêm mới cửa hàng"}
        width="90vw"
        footer={renderFooter()}
      >
        {/* <StylesTabPattern>
          <Tabs
            type="card"
            defaultActiveKey="1"
            // items={items}
            activeKey={activeKey}
            onChange={key => {
              setActiveKey(key)
            }}
          />
        </StylesTabPattern> */}
        <FormInsertUpdateProgram
            form={form}
          />
      </CustomModal>

      {!!modalInsertUpdateStore && (
        <ModalInsertUpdateStore
          open={modalInsertUpdateStore}
          onCancel={() => setModalInsertUpdateStore(false)}
        />
      )}
    
    </div>
  )
}

export default InsertUpdateStore

