import {
  Col,
  Form,
  Row,
  Select,
  Space,
  Tabs,
  Tooltip,
  InputNumber,
  Modal,
  Switch,
  Input,
  Table,
} from "antd"
import { PatentRegistrationChildBorder, StylesTabPattern } from "./styled"
import TableCustom from "src/components/Table/CustomTable"
import Button from "src/components/MyButton/Button"
import Notice from "src/components/Notice"
import { useEffect, useState } from "react"
import AdminServices from "src/services/AdminService"
import CustomModal from "src/components/Modal/CustomModal"
import { Option } from "@mui/base"
import STORAGE, { getStorage } from "src/lib/storage"

const UpdateStore = ({ open, oncancel, onOk, stores, id }) => {
  const [imageModalVisible, setImageModalVisible] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [selectedStore, setSelectedStore] = useState([])
  const [stateBody, setStateBody] = useState({})
  const [manager, setManager] = useState([])
  const [form] = Form.useForm()

  useEffect(() => {
      if(stores){
            setSelectedStore([stores])
            setStateBody({
                  [stores._id]: {
                        name: stores.name,
                        location: stores.location,
                        phone: stores.phone,
                        email: stores.email,
                        manager: stores.manager,
                        status: stores.status
                  }
            })
      }
  }, [stores])

  useEffect(() => {
      getAllManagers()
  }, [])
  const getAllManagers = async () => {
      try {
        setLoading(true)
        const token = getStorage(STORAGE.TOKEN)
        const res = await AdminServices.getAllManagers(token)
        console.log("res: ", res);
        const manager = res.filter(user => user.role === 'MANAGER');
        setManager(manager);
        console.log("manager: ", manager);

       
      } catch (error) {
        console.log("error")
      } finally {
        setLoading(false)
      }
    }

  const handleChange = (storeId, field, value) => {
      setStateBody(prev => ({
            ...prev,
            [storeId]: {
                  ...prev[storeId],
                  [field]: value
            }
      }))
  }

  const toggleStatus =  (storeId, checked) => {
      setStateBody((prevStatus) => ({
        ...prevStatus,
        [storeId]: {
          ...prevStatus[storeId],
          status: checked ? "open" : "closed",
        },
      }));
    }

  const onContinue = async () => {
      try {
         setLoading(true);
         const values = await form.validateFields();
         const storesData = stateBody[stores._id] || values
         const res = await AdminServices.updateStores(stores._id, {...storesData})
         if(res?.isError){
            return;
         }
         onOk()
         oncancel()
         Notice({
            msg: 'Cập nhật cửa hàng thành công'
         })
      } catch (error) {
            console.log("error");
      }finally{
            setLoading(false)
      }
  }
  const renderFooter = () => (
      <div className={!!stores ? "d-flex-sb" : "d-flex-end"}>
        <Button
          btntype="primary"
          className="btn-hover-shadow"
          onClick={onContinue}
        >
          Ghi lại
        </Button>
        <Button
          btntype="third"
          className="ml-8 mt-12 mb-12"
          onClick={() => oncancel()}
        >
          Đóng
        </Button>
      </div>
    )

    const column = [
      {
        title: "STT",
        key: "_id",
        width: 60,
        render: (_, record, index) => (
          <div className="text-center">{index + 1}</div>
        ),
      },
      {
        title: "Tên cửa hàng",
        dataIndex: "name",
        width: 200,
        key: "name",
        render: (text, record) => (
          <Input
            value={stateBody[record._id]?.name || text}
            onChange={e => handleChange(record._id, "name", e.target.value)}
          />
        ),
      },
      {
        title: "Địa chỉ",
        dataIndex: "location",
        key: "location",
        width: 50,
        render: (text, record) => (
          <Input
            value={stateBody[record._id]?.location || text}
            onChange={value => handleChange(record._id, "location", value.target.value)}
          />
        ),
      },
      {
        title: "Điện thoại",
        dataIndex: "phone",
        width: 300,
        key: "phone",
        render: (text, record) => (
          <Input
            value={stateBody[record._id]?.phone || text}
            onChange={e =>
              handleChange(record._id, "phone", e.target.value)
            }
          />
        ),
      },
      {
        title: "Email",
        dataIndex: "email",
        width: 300,
        key: "email",
        render: (text, record) => (
            <Input
            value={stateBody[record._id]?.email || text}
            onChange={e =>
              handleChange(record._id, "email", e.target.value)
            }
          />
        ),
      },
      // {
      //   title: "Ảnh",
      //   dataIndex: "image",
      //   width: 120,
      //   key: "image",
      //   render: text => (
      //     <img
      //       src={text}
      //       alt="product"
      //       style={{ width: 50, height: 50, cursor: "pointer" }}
      //       onClick={() => {
      //         setSelectedImage(text)
      //         setImageModalVisible(true)
      //       }}
      //     />
      //   ),
      // },
      {
            title: "Người quản lý",
            dataIndex: "manager",
            align: "center",
            width: 150,
            key: "manager",
            render: (text ,record) => (
                  <Select placeholder="Chọn người quản lý" value={stateBody[record._id]?.manager?.email} onChange={value => handleChange(record._id, "manager", value)}>
                        {manager && manager.map(manager => (
                              <Option key={manager._id} value={manager._id}>{manager.email}</Option>
                        ))}
                  </Select>
            )
      },
      {
        title: "Trạng thái hoạt động",
        dataIndex: "status",
        align: "center",
        width: 100,
        key: "status",
        render: (_, record) => (
          <span
          className={[
            "no-color",
            stateBody[record._id]?.status === "open" ? "blue-text" : "red-text",
          ].join(" ")}
        >
          {stateBody[record._id]?.status === "open" ? "Đang hoạt động" : "Dừng Hoạt Động"}
        </span>
        ),
      },
      {
        title: "Action",
        dataIndex: "status",
        width: 120,
        key: "status",
        render: (_, record) => (
          <Switch
            checked={stateBody[record._id]?.status === "open"}
            onChange={checked => toggleStatus(record._id, checked)}
          />
        ),
      },
    ]

    const items = [
      {
        key: 1,
        label: <div>Cửa hàng</div>,
        children: (
          <PatentRegistrationChildBorder>
            <TableCustom
              isPrimary
              rowKey="_id"
              columns={column}
              dataSource={selectedStore}
              scroll={{ x: "1000px" }}
            />
            {/* <Modal
              visible={imageModalVisible}
              footer={null}
              onCancel={() => setImageModalVisible(false)}
            >
              <img alt="store" style={{ width: "100%" }} src={selectedImage} />
            </Modal> */}
          </PatentRegistrationChildBorder>
        ),
      },
    ]

    return (
      <CustomModal
        open={open}
        onCancel={oncancel}
        onOk={onOk}
        title={"Chỉnh sửa cửa hàng"}
        width="90vw"
        footer={renderFooter()}
      >
        <StylesTabPattern>
          <Tabs type="card" defaultActiveKey="1">
            {items.map(item => (
              <Tabs.TabPane tab={item.label} key={item.key}>
                {item.children}
              </Tabs.TabPane>
            ))}
          </Tabs>
        </StylesTabPattern>
      </CustomModal>
    )

}

export default UpdateStore
