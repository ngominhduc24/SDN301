import React from "react"
import PropTypes from "prop-types"

import CustomModal from "src/components/Modal/CustomModal"

import Button from "src/components/MyButton/Button"

import styles from "./styles.module.scss"

SessionExpired.propTypes = {
  isOpen: PropTypes.bool,
  content: PropTypes.shape({
    title: PropTypes.any,
    value: PropTypes.string,
  }),
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
}

SessionExpired.defaultProps = {
  isOpen: false,
  content: {
    title: (
      <>
        <span>Phiên làm việc đã hết hạn,</span>{" "}
        <p>Vui lòng đăng nhập lại để tiếp tục sử dụng</p>
      </>
    ),
    value: "",
  },
  onOk: null,
  onCancel: null,
}

export default function SessionExpired(props) {
  const { content, onCancel, onOk, isOpen } = props

  return (
    <CustomModal
      visible={isOpen}
      closable={false}
      destroyOnClose
      maskClosable={false}
      footer={null}
      width={360}
      onCancel={onCancel}
      centered
    >
      {content && <div className={styles.textContent}>{content.title}</div>}
      <div className="d-flex justify-content-center">
        <Button btntype="orange" onClick={onOk}>
          Ok
        </Button>
      </div>
    </CustomModal>
  )
}
