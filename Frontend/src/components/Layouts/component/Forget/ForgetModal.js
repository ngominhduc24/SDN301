import { Col, Form, Input, Row } from "antd"
import { useState } from "react"
import CustomModal from "src/components/Modal/CustomModal"
import Button from "src/components/MyButton/Button"
import Notice from "src/components/Notice"
import { getRegexEmail } from "src/lib/stringsUtils"
import AuthService from "src/services/AuthService"

const ForgetModal = ({
  openForgetPassModal,
  handleCancel,
  handleLogin,
  setOpenVerifyModal,
  setEmail,
}) => {
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const sendOTP = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      setEmail(values.email)
      const res = await AuthService.forgotPass({ Email: values.email })
      if (res.isError) return

      setOpenVerifyModal()
      handleCancel()
    } finally {
      setLoading(false)
    }
  }
  return (
    <CustomModal
      title="Quên mật khẩu"
      width="600px"
      footer={null}
      open={openForgetPassModal}
      // onOk={handleOk}
      onCancel={handleCancel}
    >
      <Row gutter={[14, 24]}>
        <Col span={24}>
          Nhập email tài khoản bạn đăng nhập <br />
          Chúng tôi sẽ gửi mã xác minh đến tài khoản email đăng ký cho bạn!
        </Col>
        <Col span={24}>
          <Form form={form} layout="vertical">
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Bạn chưa nhập địa chỉ email!",
                },
                {
                  pattern: getRegexEmail(),
                  message: "Email nhập sai định dạng!",
                },
              ]}
              label="Email "
              name="email"
            >
              <Input placeholder="Nhập" />
            </Form.Item>
          </Form>
          <Row>
            <Button
              loading={loading}
              btntype="primary"
              className="btn-w100 btn-hover-shadow"
              type="submit"
              htmlType="submit"
              onClick={() => {
                sendOTP()
              }}
            >
              Lấy lại mật khẩu
            </Button>
          </Row>
        </Col>
      </Row>
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
    </CustomModal>
  )
}

export default ForgetModal
