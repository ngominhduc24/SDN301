import { Col, Form, Input, InputNumber, Modal, Row, Space, Switch, Tabs } from "antd"
import dayjs from "dayjs"
import { useEffect, useState } from "react"
import CustomModal from "src/components/Modal/CustomModal"
import { PatentRegistrationChildBorder, StylesTabPattern } from "./styled"
import TableCustom from "src/components/Table/CustomTable"
import CB1 from "src/components/Modal/CB1"
import ButtonCircle from "src/components/MyButton/ButtonCircle"
import ModalInsertUpdateProduct from "./components/modal/ModalInsertProduct"
import Notice from "src/components/Notice"
import Button from "src/components/MyButton/Button"
import FormInsertUpdateProduct from "./components/FormInsertUpdateProduct"
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
const InsertUpdateProduct = ({ open, onCancel, onOk, data, id }) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([])
  const [modalInsertUpdateProduct, setModalInsertUpdateProduct] =
    useState(false)
  const [stateBody, setStateBody] = useState({new: {
    name: "",
    price: 0,
    description: "",
    status: "inactive"}})
  const [imageModalVisible, setImageModalVisible] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)
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
  //   }
  // }, [open])

  useEffect(() => {

   form.resetFields();
   setStateBody({
    new: {
      name: data?.name || "",
      price: data?.price || 0,
      description: data?.description || "",
      status: data?.status || "inactive"
    }
   })
  }, [data, form])

  const handleChangeProduct = (productId, field, value) => {
    setStateBody(prev => ({
      ...prev,
      [productId]: {
        ...prev[productId],
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
      title: "Tên sản phẩm",
      dataIndex: "name",
      width: 200,
      key: "name",
      render: (text, record) => (
        <Input onChange={e => handleChangeProduct(record._id, "name", e.target.value)}/>
      )
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      width: 50,
      render: (text, record) => (
        <InputNumber onChange={e => handleChangeProduct(record._id, "price", e)}/>
      )
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      width: 300,
      key: "description",
      render: (text, record) => (
        <Input
          onChange={(e) => handleChangeProduct(record._id, "description", e.target.value)}
        />
      ),
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      width: 120,
      key: "image",
      render: (text) => (
        <img
          src={text}
          alt="product"
          style={{ width: 50, height: 50, cursor: "pointer" }}
          onClick={() => {
            setSelectedImage(text);
            setImageModalVisible(true);
          }}
        />
      ),
    },
    {
      title: "Action",
      dataIndex: "status",
      width: 120,
      key: "status",
      render: (_, record) => (
        <Switch
          onChange={(checked) => toggleStatus(record._id, checked)}
        />
      ),
    }
  ]

  const items = [
    {
      key: 1,
      label: <div>Sản phẩm</div>,
      children: (
        <PatentRegistrationChildBorder>
          <TableCustom
            isPrimary
            rowKey="_id"
            columns={column}
            dataSource={selectedProduct}
            scroll={{ x: "1000px" }}
          />
          <Modal visible={imageModalVisible} footer={null} onCancel={() => setImageModalVisible(false)}>
            <img alt="product" style={{ width: "100%" }} src={selectedImage} />
          </Modal>
        </PatentRegistrationChildBorder>
      ),
    },
  ];

  const onContinue = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      const res = await AdminServices.addNewProduct({ ...values })
      if (res?.isError) return
      onOk && onOk()
      Notice({
        msg: `Thêm sản phẩm thành công!`,
      })
      //   props?.onCancel()
    } catch (error) {
      console.log("error")
    } finally {
      setLoading(false)
    }
  }


  const renderFooter = () => (
    <div className="lstBtn d-flex-end">
      <div className="lstBtn-right d-flex-end">
        <>
          <Button
            Button
            btntype="primary"
            className="ml-8 mt-12 mb-12"
            onClick={onContinue}
          >Tạo          </Button>
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
  const toggleStatus = (productId, checked) => {
    setStateBody((prevStatus) => ({
      ...prevStatus,
      [productId]: {
        ...prevStatus[productId],
        status: checked ? "active" : "inactive",
      },
    }));
  };



  

  return (
    <div>
       {/* <CustomModal open={open} onCancel={onCancel} onOk={onOk} title={"Thêm sản phẩm mới"} width="90vw" footer={renderFooter()}>
      <StylesTabPattern>
        <Tabs type="card" defaultActiveKey="1">
          {items.map((item) => (
            <Tabs.TabPane tab={item.label} key={item.key}>
              {item.children}
            </Tabs.TabPane>
          ))}
        </Tabs>
      </StylesTabPattern>
    </CustomModal> */}
    <CustomModal
      title={"Thêm sản phẩm mới"}
      open={open}
      onCancel={onCancel}
      onOk={onOk}
      footer={
       renderFooter()
      }
      width={1024}
    >
       <FormInsertUpdateProduct form={form} />
    </CustomModal>

        {/* <ModalInsertUpdateProduct
          // documents={documents}
          detailedInfo={data}
          open={modalInsertUpdateProduct}
          onCancel={() => setModalInsertUpdateProduct(false)}
          onOk={() => setModalInsertUpdateProduct(false)}
        /> */}
      {/* {!!modalAttendanceContent && (
        <ModalAttendance
          open={modalAttendanceContent}
          ltUser={open?.ListUser}
          BookingID={open?.BookingID}
          atendanceContents={atendanceContents}
          onCancel={() => setModalAttendanceContent(false)}
        />
      )} */}
    </div>
  )
}

export default InsertUpdateProduct

