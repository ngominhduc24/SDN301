import { Col, Form, Input, Row } from "antd"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Button from "src/components/MyButton/Button"
import { getRegexPassword } from "src/lib/stringsUtils"
// import UserService from "src/services/UserService"
import { StyleChangePassword } from "./styled"
import Notice from "src/components/Notice"
import ROUTER from "src/router"
import { changePassword } from "src/services/UserService"
import STORAGE, { getStorage } from "src/lib/storage"

const ChangePassword = () => {
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const userInfo = getStorage(STORAGE.USER_INFO)

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      // const res = await UserService.replacePassword({
      //   ...values,
      // })

      const res = await changePassword(userInfo.UserID, values)
      console.log("values", values)
      if (res.isError) return
      navigate(ROUTER.HOME)
      Notice({
        isSuccess: true,
        msg: "Cập nhật mật khẩu thành công!",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <StyleChangePassword>
      <div className="content-wrap">
        <Row className="login-form" gutter={16}>
          <Col span={24}>
            <div className="d-flex flex-column justify-content-center h-100">
              <div className="text-center mb-30">
                <div className="fs-22 fw-600 title-form">Đổi mật khẩu</div>
                <div className="mt-16">
                  Vui lòng thay đổi mật khẩu để tiếp tục!
                </div>
              </div>
              <div className="pl-20 pr-20">
                <Form form={form} layout="vertical">
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: "Bạn chưa nhập mật khẩu cũ!",
                      },
                      // {
                      //   pattern: getRegexPassword(),
                      //   message:
                      //     "Mật khẩu có chứa ít nhất 8 ký tự, trong đó có ít nhất một số và bao gồm cả chữ thường và chữ hoa và ký tự đặc biệt, ví dụ @, #, ?, !.",
                      // },
                    ]}
                    label="Mật khẩu hiện tại"
                    name="Password"
                  >
                    <Input.Password placeholder="Nhập" />
                  </Form.Item>
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
                    label="Mật khẩu mới"
                    name="NewPassword"
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
                          if (
                            !value ||
                            getFieldValue("NewPassword") === value
                          ) {
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
                    name="ReNewPassword"
                  >
                    <Input.Password placeholder="Nhập" />
                  </Form.Item>
                  <div className="note">Mật khẩu cần tuân thủ các quy tắc:</div>
                  <div className="note">Có ít nhất 8 ký tự.</div>
                  <div className="note">
                    Có chứa từ 03 trong 04 loại ký tự sau: Chữ hoa (A, B, C, …);
                    Chữ thường (a, b, c, …); Ký tự đặc biệt (!, @, #, …); Số
                    (0,1,...9).
                  </div>
                  <div className="note mb-20">Không chứa khoảng trống</div>
                  <Row>
                    <Button
                      loading={loading}
                      btntype="primary"
                      className="btn-login"
                      type="submit"
                      htmlType="submit"
                      onClick={handleSubmit}
                    >
                      Lưu lại
                    </Button>
                  </Row>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </StyleChangePassword>
  )
}

export default ChangePassword
