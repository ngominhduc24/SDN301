import { Col, Form, Input, Row } from "antd"
import { useState } from "react"
import CustomModal from "src/components/Modal/CustomModal"
import Button from "src/components/MyButton/Button"
import Notice from "src/components/Notice"
import { getRegexPassword } from "src/lib/stringsUtils"
import AuthService from "src/services/AuthService"
import UserService from "src/services/UserService"

const RePasswordModal = ({
  rePasswordModal,
  handleCancel,
  handleLogin,
  email,
  codeVerify,
}) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const handleSubmit = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      let res
      codeVerify
        ? (res = await AuthService.changePassword({
            CodeVerify: codeVerify,
            Email: email,
            Password: values.pass,
            RePassword: values.rePass,
          }))
        : (res = await UserService.replacePassword({
            Password: values.passOld,
            NewPassword: values.pass,
            ReNewPassword: values.rePass,
          }))
      if (res.isError) return
      Notice({
        isSuccess: true,
        msg: "Cập nhật mật khẩu thành công!",
      })
      handleCancel()
    } finally {
      setLoading(false)
    }
  }
  return (
    <CustomModal
      title={!!codeVerify ? "Quên mật khẩu" : "Đổi mật khẩu"}
      width="600px"
      footer={null}
      open={rePasswordModal}
      // onOk={handleOk}
      onCancel={handleCancel}
    >
      <Row gutter={[14, 24]}>
        <Col span={24}>
          <Form form={form} layout="vertical">
            {!codeVerify && (
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Bạn chưa nhập mật khẩu cũ!",
                  },
                  {
                    pattern: getRegexPassword(),
                    message:
                      "Mật khẩu có chứa ít nhất 8 ký tự, trong đó có ít nhất một số và bao gồm cả chữ thường và chữ hoa và ký tự đặc biệt, ví dụ @, #, ?, !.",
                  },
                ]}
                label={"Mật khẩu cũ"}
                name="passOld"
              >
                <Input.Password placeholder="Nhập" />
              </Form.Item>
            )}
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Bạn chưa nhập mật khẩu mới!",
                },
                {
                  pattern: getRegexPassword(),
                  message:
                    "Mật khẩu có chứa ít nhất 8 ký tự, trong đó có ít nhất một số và bao gồm cả chữ thường và chữ hoa và ký tự đặc biệt, ví dụ @, #, ?, !.",
                },
              ]}
              label={codeVerify ? "Mật khẩu " : "Mật khẩu mới"}
              name="pass"
            >
              <Input.Password placeholder="Nhập" />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Bạn chưa nhập lại mật khẩu mới!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("pass") === value) {
                      return Promise.resolve()
                    }
                    return Promise.reject(
                      new Error(
                        "Mật khẩu nhập lại phải giống với mật khẩu mới!",
                      ),
                    )
                  },
                }),
              ]}
              label="Nhập lại mật khẩu "
              name="rePass"
            >
              <Input.Password placeholder="Nhập" />
            </Form.Item>
          </Form>
          <Row>
            <Button
              loading={loading}
              btntype="primary"
              className="btn-w100"
              type="submit"
              htmlType="submit"
              onClick={() => {
                handleSubmit()
              }}
            >
              Cập nhật
            </Button>
          </Row>
        </Col>
      </Row>
      {codeVerify && (
        <Row>
          <span className="md-bottom-text">
            Quay lại
            <span
              className="link-regis"
              onClick={() => {
                handleLogin()
                handleCancel()
              }}
            >
              Đăng nhập
            </span>
          </span>
        </Row>
      )}
    </CustomModal>
  )
}

export default RePasswordModal
