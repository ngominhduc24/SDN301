import { Col, DatePicker, Form, Input, Row, Select } from "antd"
import { useSelector } from "react-redux"
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons"
import Button from "src/components/MyButton/Button"
import { RedStar } from "src/components/FloatingLabel/styled"
import ButtonCircle from "src/components/MyButton/ButtonCircle"
import { useEffect, useState } from "react"
import AdminServices from "src/services/AdminService"

const { Option } = Select
const { RangePicker } = DatePicker

const FormInsertUpdateProduct = ({
  form, onChange}) => {
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([])
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

    useEffect(() => {
      getCategoryById()
    }, [])
  return (
    <Form
      form={form}
      style={{ padding: "20px 12px 0px 12px" }}
      layout="vertical"
      onValuesChange={onChange}
    >
      <Row gutter={[16, 10]}>
        <Col span={12}>
          <Form.Item
            name="name"
            label="Tên sản phẩm"
            rules={[{ required: true, message: "Bạn phải nhập tên sản phẩm" }]}
          >
            <Input placeholder="Nhập" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="price"
            label="Giá"
            rules={[{ required: true, message: "Bạn phải nhập giá" }]}
          >
            <Input placeholder="Nhập" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="description"
            label="Mô tả"
            rules={[{ required: true, message: "Bạn phải nhập mô tả" }]}
          >
            <Input placeholder="Nhập" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="image"
            label="Ảnh"
            rules={[{ required: true, message: "Bạn phải nhập ảnh" }]}
          >
            <Input placeholder="Nhập" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="categoryId"
            label="Thể loại"
            rules={[{ required: true, message: "Bạn phải chọn thể loại" }]}
          >
           <Select placeholder="Chọn thể loại">
           {categories.map(category => (
                <Option key={category._id} value={category._id}>
                  {category.name}
                </Option>
              ))}
            </Select>  
          </Form.Item>
        </Col>

        {/* <Col span={12}>
          <Form.Item
            name="status"
            label="Trạng thái"
            rules={[{ required: true, message: "Bạn phải chọn trạng thái" }]}
          >
            <Select placeholder="Chọn">
              <Option value={"active"}>Đang hoạt động</Option>
              <Option value={"inactive"}>Dừng hoạt động</Option>
            </Select>
          </Form.Item>
        </Col> */}
      </Row>
    </Form>
  )
}

export default FormInsertUpdateProduct

