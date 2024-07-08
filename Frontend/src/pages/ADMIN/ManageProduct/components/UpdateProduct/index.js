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

const UpdateProduct = ({ open, onCancel, onOk, data, id }) => {
  const [imageModalVisible, setImageModalVisible] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState([])
  const [stateBody, setStateBody] = useState({})
  const [categories, setCategories] = useState([])

  const [form] = Form.useForm()

  useEffect(() => {
    if (data) {
      setSelectedProduct([data])
      setStateBody({
        [data._id]: {
          name: data.name,
          price: data.price,
          description: data.description,
          categoryId: data.categoryId,
          status: data.status,
        },
      })
    }
  }, [data])

  useEffect(() => {
    getCategoryById()
  }, [])

  const getCategoryById = async() => {
    try {
      setLoading(true);
      const categoryRes = await AdminServices.getAllCategories()
      console.log("categoryRes: ", categoryRes);
      if(categoryRes?.isError){
        console.error("Error: ", categoryRes.message)
        return;
      }
      setCategories(categoryRes);
    } catch (error) {
      console.log("error");
    }finally{
      setLoading(false);
    }
  }

  const handleChange = (productId, field, value) => {
    setStateBody(prev => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [field]: value,
      },
    }))
  }
  const onContinue = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      const productData = stateBody[data._id] || values
      const res = await AdminServices.updateProducts(data._id, { ...productData })
      if (res?.isError){return} 
      onOk()
      onCancel()
      Notice({
        msg: `Cập nhật sản phẩm thành công!`,
      })
      //   props?.onCancel()
    } catch (error) {
      console.log("error")
    } finally {
      setLoading(false)
    }
  }

  const renderFooter = () => (
    <div className={!!data ? "d-flex-sb" : "d-flex-end"}>
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
        onClick={() => onCancel()}
      >
        Đóng
      </Button>
    </div>
  )

  const toggleStatus =  (productId, checked) => {
    setStateBody((prevStatus) => ({
      ...prevStatus,
      [productId]: {
        ...prevStatus[productId],
        status: checked ? "active" : "inactive",
      },
    }));
  }

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
      title: "Tên sản phẩm",
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
      title: "Giá",
      dataIndex: "price",
      key: "price",
      width: 50,
      render: (text, record) => (
        <InputNumber
          value={stateBody[record._id]?.price || text}
          onChange={value => handleChange(record._id, "price", value)}
        />
      ),
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      width: 300,
      key: "description",
      render: (text, record) => (
        <Input
          value={stateBody[record._id]?.description || text}
          onChange={e =>
            handleChange(record._id, "description", e.target.value)
          }
        />
      ),
    },
    {
      title: "Phân loại",
      dataIndex: "categoryId",
      width: 300,
      key: "categoryId",
      render: (text, record) => (
        <Select placeholder="Chọn thể loại" value={stateBody[record._id]?.categoryId || text} onChange={value => handleChange(record._id, "categoryId", value)}>
        {categories.map(category => (
             <Option key={category._id} value={category._id}>
               {category.name}
             </Option>
           ))}
         </Select> 
      ),
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      width: 120,
      key: "image",
      render: text => (
        <img
          src={text}
          alt="product"
          style={{ width: 50, height: 50, cursor: "pointer" }}
          onClick={() => {
            setSelectedImage(text)
            setImageModalVisible(true)
          }}
        />
      ),
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
          stateBody[record._id]?.status === "active" ? "blue-text" : "red-text",
        ].join(" ")}
      >
        {stateBody[record._id]?.status === "active" ? "Đang hoạt động" : "Dừng Hoạt Động"}
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
          checked={stateBody[record._id]?.status === "active"}
          onChange={checked => toggleStatus(record._id, checked)}
        />
      ),
    },
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
          <Modal
            visible={imageModalVisible}
            footer={null}
            onCancel={() => setImageModalVisible(false)}
          >
            <img alt="product" style={{ width: "100%" }} src={selectedImage} />
          </Modal>
        </PatentRegistrationChildBorder>
      ),
    },
  ]
  return (
    <CustomModal
      open={open}
      onCancel={onCancel}
      onOk={onOk}
      title={"Chỉnh sửa sản phẩm"}
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

export default UpdateProduct
