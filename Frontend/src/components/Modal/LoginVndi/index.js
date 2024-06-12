import React from "react"
import PropTypes from "prop-types"
import { Form, Checkbox, Input, Modal } from "antd"
import Button from "src/components/MyButton/Button"
import SvgIcon from "src/components/SvgIcon"

import styles from "./styles.module.scss"

LoginVndiModal.propTypes = {
  className: PropTypes.string,
  isOpen: PropTypes.bool,
  onCancel: PropTypes.func,
  detailInfo: PropTypes.object,
}

LoginVndiModal.defaultProps = {
  className: "",
  isOpen: true,
  onCancel: () => {},
}

export default function LoginVndiModal(props) {
  const { className, isOpen, onCancel } = props

  return (
    <Modal
      width={918}
      visible={isOpen}
      destroyOnClose
      maskClosable={false}
      onCancel={onCancel}
      className={`modal-orange ${className} ${styles.titleFlexStart}`}
      maskTransitionName=""
      title="Đăng nhập với tài khoản VNDIRECT"
      footer={null}
    >
      <Form
        name="login-form"
        initialValues={{
          remember: false,
        }}
      >
        <div className={styles.wapper}>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Bạn chưa nhập Tên đăng nhập",
              },
            ]}
            className={styles.formItem}
          >
            <Input
              size="large"
              placeholder="Tên đăng nhập"
              name="Username"
              autoFocus
              prefix={<SvgIcon name="user_login" className="mr-16" />}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Bạn chưa nhập Mật khẩu",
              },
            ]}
            className={styles.formItem}
          >
            <Input.Password
              size="large"
              placeholder="Mật khẩu"
              name="Password"
              prefix={<SvgIcon name="lock_login" className="mr-16" />}
            />
          </Form.Item>
          <Form.Item
            name="remember"
            valuePropName="checked"
            className={styles.itemRemember}
          >
            <Checkbox className={styles.checkbox}>Ghi nhớ đăng nhập</Checkbox>
          </Form.Item>

          <Button btntype="orange" htmlType="submit" iconName="sign_in">
            ĐĂNG NHẬP
          </Button>
        </div>
      </Form>
    </Modal>
  )
}
