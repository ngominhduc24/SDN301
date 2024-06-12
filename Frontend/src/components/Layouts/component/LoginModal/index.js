import { Checkbox, Col, Divider, Form, Row } from "antd"
import { useContext, useState } from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import FlInput from "src/components/FloatingLabel/Input"
import Button from "src/components/MyButton/Button"
import {
  ACCOUNT_TYPE_ADMIN,
  ACCOUNT_TYPE_DAI_DIEN,
  ACCOUNT_TYPE_KH,
} from "src/constants/constants"
import STORAGE, { getStorage, setStorage } from "src/lib/storage"
import { StoreContext } from "src/lib/store"
import { hasPermission } from "src/lib/utils"
import {
  getListSystemCate,
  getListSystemKey,
  setIsAdmin,
  setIsRepresentative,
  setIsUser,
  setListTabs,
  setUserInfo,
} from "src/redux/appGlobal"
import ROUTER from "src/router"
import AuthService from "src/services/AuthService"
import { MenuItemAdmin } from "../../MenuItems"
import { ModalLoginStyle, StyleLoginModal } from "./styled"

const LoginModal = ({
  openLoginModal,
  handleCancel,
  handleRegister,
  setOpenForgetPassModal,
  stopNavigate = false,
}) => {
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { routerStore } = useContext(StoreContext)
  const [routerBeforeLogin, setRouterBeforeLogin] = routerStore

  return (
    <ModalLoginStyle
      title={false}
      width={500}
      footer={null}
      open={openLoginModal}
      onCancel={handleCancel}
    >
      <Row>
        {/* <Col span={12}>
          <img src={bgr_login} alt="" width="100%" />
        </Col> */}
        <Col span={24}>
          <StyleLoginModal>
            <div className="text-center mb-40">
              <div className="fs-22 fw-600">Đăng nhập hệ thống</div>
            </div>
            <div>
              <Form form={form} layout="vertical">
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Thông tin không được để trống!",
                    },
                  ]}
                  name="Username"
                >
                  <FlInput label="Tên đăng nhập" isRequired />
                </Form.Item>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Bạn chưa nhập mật khẩu!",
                    },
                  ]}
                  name="Password"
                  className="mb-12"
                >
                  <FlInput label="Mật khẩu" isPass isRequired />
                </Form.Item>
                <Row className="d-flex justify-content-space-between align-items-center mb-6">
                  <Form.Item
                    name="remember"
                    valuePropName="checked"
                    className="mb-0"
                  >
                    <Checkbox
                      onChange={val =>
                        localStorage.setItem(
                          STORAGE.REMEMBER_LOGIN,
                          JSON.stringify(val.target.checked),
                        )
                      }
                      value={getStorage(STORAGE.REMEMBER_LOGIN)}
                    >
                      Duy trì đăng nhập
                    </Checkbox>
                  </Form.Item>
                  <Link
                    onClick={() => {
                      setOpenForgetPassModal()
                      handleCancel()
                    }}
                    className="forget-pass mb-0"
                  >
                    <i>Quên mật khẩu?</i>
                  </Link>
                </Row>
                <Row>
                  <Button
                    loading={loading}
                    btntype="primary"
                    className="btn-login"
                    type="submit"
                    htmlType="submit"
                    // onClick={onLogin}
                  >
                    Đăng nhập
                  </Button>
                </Row>
              </Form>
              <Divider plain>Hoặc</Divider>
              <Button
                loading={loading}
                btntype="third"
                className="btn-login"
                onClick={() => {
                  handleCancel()
                  handleRegister()
                }}
              >
                Đăng ký
              </Button>
            </div>
          </StyleLoginModal>
        </Col>
      </Row>
    </ModalLoginStyle>
  )
}

export default LoginModal

