import { Col, Form, Row, Select } from "antd"
import { useEffect, useState } from "react"
import FlInput from "src/components/FloatingLabel/Input"
import FlSelect from "src/components/FloatingLabel/Select"
import CustomModal from "src/components/Modal/CustomModal"
import Button from "src/components/MyButton/Button"

const { Option } = Select

const ModalInsertUpdateAttendance = ({
  open,
  onCancel,
  onOk,
  ltUser,
  BookingID,
}) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!!open?.ContentID)
      form.setFieldsValue({
        ...open,
        ListUserID: !!open?.ListUser.length
          ? open?.ListUser.map(i => i?.UserID)
          : [],
      })
  }, [open?.ContentID])

  const renderFooter = () => (
    <div className="lstBtn d-flex-end">
      <Button
        btntype="primary"
        className="ml-8 mt-12 mb-12"
        loading={loading}
        // onClick={() => handleInsertUpdateAttendance()}
      >
        {open?.ContentID ? "Cập nhật" : "Thêm mới"}
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

  return (
    <CustomModal
      open={open}
      onCancel={onCancel}
      onOk={onOk}
      title="Nội dung điểm danh"
      width="50vw"
      footer={renderFooter()}
    >
      <Form form={form}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Form.Item
              name="Content"
              rules={[
                { required: true, message: "Bạn phải nhập chương trình họp" },
              ]}
            >
              <FlInput isRequired label="Tên nội dung:" borderbottomonly />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="ListUserID"
              rules={[
                { required: true, message: "Bạn phải nhập chương trình họp" },
              ]}
            >
              <FlSelect
                mode="multiple"
                borderbottomonly
                allowClear
                style={{
                  width: "100%",
                }}
                placeholder="Chọn tài liệu"
              >
                {ltUser.map(i => (
                  <Option key={i?.UserID} value={i?.UserID}>
                    {i?.FullName}
                  </Option>
                ))}
              </FlSelect>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </CustomModal>
  )
}

export default ModalInsertUpdateAttendance

