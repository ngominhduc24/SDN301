import { Form, Input, Row, Spin } from "antd"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import CustomModal from "src/components/Modal/CustomModal"
import Button from "src/components/MyButton/Button"
import Notice from "src/components/Notice"
import { getRegexPassword } from "src/lib/stringsUtils"
import ROUTER from "src/router"
import UserService from "src/services/UserService"
import styled from "styled-components"

const ModalChangePasswordStyle = styled.div`
  .sign-text {
    font-size: 12px;
    margin-top: 16px;
    line-height: 120%;
    color: #666666;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 5px;
  }
  .bt-bottom {
    padding: 10px;
    border-bottom: 1px solid #d9d9d9;
  }
  .box-title {
    font-size: 20px;
    font-weight: 700;
    padding: 0px 0px 20px 0px;
  }
`
const ChangePasswordModal = ({ onOk, onCancel, open }) => {
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const handleSubmit = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      const res = await UserService.replacePassword({
        ...values,
      })
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
    <CustomModal
      title={false}
      footer={false}
      width={700}
      open={open}
      onCancel={onCancel}
      maskClosable={false}
    >
      <SpinCustom spinning={loading}>
        <ModalChangePasswordStyle>
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
                    {
                      pattern: getRegexPassword(),
                      message:
                        "Mật khẩu có chứa ít nhất 8 ký tự, trong đó có ít nhất một số và bao gồm cả chữ thường và chữ hoa và ký tự đặc biệt, ví dụ @, #, ?, !.",
                    },
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
                        if (!value || getFieldValue("NewPassword") === value) {
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
        </ModalChangePasswordStyle>
      </Spin>
    </CustomModal>
  )
}

export default ChangePasswordModal
