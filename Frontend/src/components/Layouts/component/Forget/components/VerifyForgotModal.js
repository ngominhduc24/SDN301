import { Col, Form, Input, Row } from "antd"
import Countdown from "antd/lib/statistic/Countdown"
import { useState } from "react"
import CustomModal from "src/components/Modal/CustomModal"
import Button from "src/components/MyButton/Button"
import Notice from "src/components/Notice"
import AuthService from "src/services/AuthService"

const VerifyForgetModal = ({
  openVerifyModal,
  handleCancel,
  handleLogin,
  setRePasswordModal,
  email,
  setCodeVerify,
}) => {
  const [loading, setLoading] = useState(false)
  const [verifyButton, setVerifyButton] = useState(true)
  const [form] = Form.useForm()
  const defaultTime = 120
  const [timeVerify, setTimeVerify] = useState(Date.now() + 1000 * defaultTime)
  const verifyOTP = async () => {
    try {
      setLoading(true)

      const values = await form.validateFields()
      const res = AuthService.verifyCode({
        Email: email,
        CodeVerify: values.otp,
      })
      if (res.isError) return
      Notice({
        isSuccess: true,
        msg: "Mã xác minh chính xác. Vui lòng nhập mật khẩu mới!",
      })
      setRePasswordModal()
      setCodeVerify(values.otp)
      handleCancel()
    } finally {
      setLoading(false)
    }
  }
  const reSendOTP = async () => {
    try {
      setLoading(true)
      const res = await AuthService.forgotPass({ Email: email })
      if (res.isError) return
      Notice({
        isSuccess: true,
        msg: "Mã xác minh đã được gửi lại đến email của bạn",
      })
      setTimeVerify(Date.now() + 1000 * defaultTime)
    } finally {
      setVerifyButton(true)
      setLoading(false)
    }
  }
  return (
    <CustomModal
      title="Nhập mã xác nhận"
      width="600px"
      footer={null}
      open={openVerifyModal}
      // onOk={handleOk}
      onCancel={handleCancel}
    >
      <Row gutter={[14, 24]}>
        <Col span={24}>
          <span>
            Chúng tôi vừa gửi một tin nhắn văn bản gồm mã xác minh 6 chữ số đến{" "}
          </span>
          {email}
        </Col>
        <Col span={24}>
          <Form form={form} layout="vertical">
            <Form.Item label="Nhập mã " name="otp">
              <Input placeholder="Nhập" />
            </Form.Item>
          </Form>
          {!verifyButton && (
            <Row>
              <span
                onClick={() => {
                  reSendOTP()
                }}
                className="md-bottom-text re-otp pointer"
              >
                Gửi lại mã
              </span>
            </Row>
          )}

          <Row>
            <Button
              loading={loading}
              disabled={!verifyButton}
              btntype="primary"
              className="btn-w100"
              type="submit"
              htmlType="submit"
              onClick={() => {
                verifyOTP()
              }}
            >
              <Countdown
                value={timeVerify}
                onFinish={() => setVerifyButton(false)}
                format="Xác nhận (ss giây)"
              />
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

export default VerifyForgetModal
