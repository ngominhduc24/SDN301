import { Col, DatePicker, Form, Input, Row, Select } from "antd"
import { useSelector } from "react-redux"
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons"
import Button from "src/components/MyButton/Button"
import { RedStar } from "src/components/FloatingLabel/styled"
import ButtonCircle from "src/components/MyButton/ButtonCircle"
import { useEffect, useState } from "react"
import AdminServices from "src/services/AdminService"
import STORAGE, { getStorage } from "src/lib/storage"

const { Option } = Select
const { RangePicker } = DatePicker

const FormInsertUpdateProgram = ({
  form,

}) => {
  const [managers, setManagers] = useState([])
  const [loading, setLoading] = useState(false)
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
      setManagers(manager);
      console.log("manager: ", manager);

     
    } catch (error) {
      console.log("error")
    } finally {
      setLoading(false)
    }
  }
  return (
    <Form
      form={form}
      style={{ padding: "20px 12px 0px 12px" }}
      layout="vertical"
    >
      <Row gutter={[16, 10]}>
        <Col span={12}>
          <Form.Item
            name="name"
            label="Tên cửa hàng"
            rules={[{ required: true, message: "Bạn phải nhập tên cửa hàng" }]}
          >
            <Input placeholder="Nhập" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="location"
            label="Địa chỉ"
            rules={[{ required: true, message: "Bạn phải nhập địa chỉ" }]}
          >
            <Input placeholder="Nhập" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Bạn phải nhập email" }]}
          >
            <Input placeholder="Nhập" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[{ required: true, message: "Bạn phải nhập số điện thoại" }]}
          >
            <Input placeholder="Nhập" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="manager" label="Quản lý cửa hàng">
            <Select mode="multiple" placeholder="Chọn quản lý">
              {managers.map(manager => (
                <Option key={manager?._id}>{manager?.email}</Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        {/* <Col span={12}>
          <Form.Item
            name="Status"
            label="Trạng thái"
            rules={[{ required: true, message: "Bạn phải chọn trạng thái" }]}
          >
            <Select placeholder="Chọn">
              <Option value={"open"}>Đang hoạt động</Option>
              <Option value={"closed"}>Dừng hoạt động</Option>
            </Select>
          </Form.Item>
        </Col> */}
      </Row>
    </Form>
  )
}

export default FormInsertUpdateProgram

