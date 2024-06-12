import { Form, Modal, Space } from "antd"
import { useState } from "react"
import FlInput from "src/components/FloatingLabel/Input"
import Button from "src/components/MyButton/Button"
import { getRegexPassword } from "src/lib/utils"

function ChangePassword({ visible, onCancel }) {
  const [form] = Form.useForm()

  const [loading, setLoading] = useState(false)

  const closeChangePassword = () => {
    onCancel()
    form.resetFields()
  }

  const handleSubmitChangePassword = () => {}

  return (
    <Modal
      visible={visible}
      onCancel={closeChangePassword}
      title="Đổi mật khẩu"
      footer={
        <Space size="middle">
          <Button btntype="third" size="medium" onClick={closeChangePassword}>
            Đóng
          </Button>
          <Button
            type="primary"
            onClick={handleSubmitChangePassword}
            loading={loading}
          >
            Ghi nhận
          </Button>
        </Space>
      }
    >
      <Form layout="vertical" form={form} name="form-change-password">
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu cũ" }]}
        >
          <FlInput isPass label="Mật khẩu cũ" isRequired />
        </Form.Item>
        <Form.Item
          name="newPassword"
          rules={[
            { required: true, message: "Vui lòng nhập mật khẩu mới" },
            {
              pattern: getRegexPassword(),
              message:
                "Mật khẩu có chứa ít nhất 8 ký tự, trong đó có ít nhất một số và bao gồm cả chữ thường và chữ hoa và ký tự đặc biệt, ví dụ @, #, ?, !.",
            },
          ]}
        >
          <FlInput isPass label="Mật khẩu mới" isRequired />
        </Form.Item>
        <Form.Item
          name="reNewPassword"
          dependencies={["newPassword"]}
          rules={[
            { required: true, message: "Vui lòng nhập lại mật khẩu mới" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error("Mật khẩu không khớp!"))
              },
            }),
          ]}
        >
          <FlInput isPass label="Nhập lại mật khẩu mới" isRequired />
        </Form.Item>
      </Form>
    </Modal>
  )
}

ChangePassword.propTypes = {}

export default ChangePassword
