import { Checkbox, Col, Form, Row, Segmented, Spin, Tabs } from "antd"
import { useState } from "react"
import Button from "src/components/MyButton/Button"
import AuthService from "src/services/AuthService"
import styled from "styled-components"
import SpinCustom from "src/components/Spin"
import { ModalLoginStyle, StyleLoginModal } from "../LoginModal/styled"
import OrganizationRegister from "./components/OrganizationRegister"
import PersonRegister from "./components/PersonalRegister"
import Notice from "src/components/Notice"

const ModalStyle = styled.div`
  .ant-input-search-button,
  .ant-btn-primary:not(:disabled):hover {
    color: #fff;
    background-color: #52c41a;
    display: flex;
    align-items: center;
    span {
      transform: translateY(-2px);
    }
  }
`

const RegisterModal = ({ open, handleCancel, handleLogin, handleOk }) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [registerToOther, setRegisterToOther] = useState(false)
  const TypeRegister = [
    {
      Label: "Cá nhân",
      value: 2,
      value2: 4,
    },
    {
      Label: "Tổ chức",
      value: 3,
      value2: 1,
    },
  ]
  const [typeActive, setTypeActive] = useState(TypeRegister[0])

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      const res = await AuthService[
        typeActive.value === 2 ? "register" : "bussinessRegister"
      ]({
        ...values,
        Birthday: values.Birthday ? values.Birthday.format() : undefined,
        AccountType: registerToOther ? typeActive.value2 : typeActive.value,
      })
      if (res?.isError) return
      Notice({
        msg: "Đăng ký tài khoản thành công!",
      })
      handleCancel()
    } finally {
      setLoading(false)
    }
  }

  return (
    <ModalLoginStyle
      title={false}
      width={800}
      footer={null}
      open={open}
      onCancel={handleCancel}
    >
      <ModalStyle>
        <SpinCustom spinning={loading}>
          <Row>
            <Col span={24}>
              <StyleLoginModal>
                <div className="text-center mb-30">
                  <div className="fs-24 fw-600">Đăng ký tài khoản</div>
                </div>
                <div>
                  <div className="d-flex align-items-center justify-content-space-between mb-24">
                    <Segmented
                      size="middle"
                      options={TypeRegister.map(i => i.Label)}
                      onChange={value => {
                        setTypeActive(
                          TypeRegister.filter(i => value === i.Label)[0],
                        )
                        setRegisterToOther(false)
                      }}
                      value={typeActive.Label}
                    />
                    <Checkbox
                      checked={registerToOther}
                      onChange={e => setRegisterToOther(e.target.checked)}
                    >
                      {typeActive?.value === 2
                        ? "Cá nhân đại diện"
                        : "Tổ chức đại diện"}
                    </Checkbox>
                  </div>
                  <Form form={form} layout="vertical">
                    {/* <Tabs type="card" defaultActiveKey="1" items={items} /> */}

                    {typeActive?.value === 2 ? (
                      <PersonRegister
                        form={form}
                        setLoading={setLoading}
                        registerToOther={registerToOther}
                      />
                    ) : (
                      <OrganizationRegister
                        form={form}
                        setLoading={setLoading}
                        registerToOther={registerToOther}
                      />
                    )}
                    <Row>
                      <Button
                        loading={loading}
                        btntype="primary"
                        className="btn-login"
                        onClick={handleSubmit}
                      >
                        Đăng ký
                      </Button>
                    </Row>
                  </Form>
                  <div className="mt-12 fs-16">
                    Đã có tài khoản{" "}
                    <a
                      href="#"
                      onClick={() => {
                        handleCancel()
                        handleLogin()
                      }}
                    >
                      Đăng nhập
                    </a>{" "}
                    ngay.
                  </div>
                </div>
              </StyleLoginModal>
            </Col>
          </Row>
        </SpinCustom>
      </ModalStyle>
    </ModalLoginStyle>
  )
}

export default RegisterModal
