import { Col, DatePicker, Form, Input, Row, Select } from "antd"

const { Option } = Select

const FormInsertUpdateProgram = ({
  form,
  operatingHours,
  managers,
  employees,
}) => {
  return (
    <Form
      form={form}
      style={{ padding: "20px 12px 0px 12px" }}
      layout="vertical"
    >
      <Row gutter={[16, 10]}>
        <Col span={12}>
          <Form.Item
            name="StoreName"
            label="Tên cửa hàng"
            rules={[{ required: true, message: "Bạn phải nhập tên cửa hàng" }]}
          >
            <Input placeholder="Nhập" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="Address"
            label="Địa chỉ"
            rules={[{ required: true, message: "Bạn phải nhập địa chỉ" }]}
          >
            <Input placeholder="Nhập" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="Email"
            label="Email"
            rules={[{ required: true, message: "Bạn phải nhập email" }]}
          >
            <Input placeholder="Nhập" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="PhoneNumber"
            label="Số điện thoại"
            rules={[{ required: true, message: "Bạn phải nhập số điện thoại" }]}
          >
            <Input placeholder="Nhập" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="OperatingHours"
            label="Giờ hoạt động"
            rules={[{ required: true, message: "Bạn phải nhập giờ hoạt động" }]}
          >
            <Input placeholder="Nhập" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="Status"
            label="Trạng thái"
            rules={[{ required: true, message: "Bạn phải chọn trạng thái" }]}
          >
            <Select placeholder="Chọn">
              <Option value={1}>Đang hoạt động</Option>
              <Option value={0}>Dừng hoạt động</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="Managers" label="Quản lý cửa hàng">
            <Select mode="multiple" placeholder="Chọn quản lý">
              {/* {managers.map(manager => (
                <Option key={manager.id}>{manager.name}</Option>
              ))} */}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="Employees" label="Nhân viên cửa hàng">
            <Select mode="multiple" placeholder="Chọn nhân viên">
              {/* {employees.map(employee => (
                <Option key={employee.id}>{employee.name}</Option>
              ))} */}
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}

export default FormInsertUpdateProgram

