import React from "react"
import PropTypes from "prop-types"

import CustomModal from "src/components/Modal/CustomModal"
import Button from "src/components/MyButton/Button"

import SvgIcon from "src/components/SvgIcon"

import styles from "./styles.module.scss"

Warning.propTypes = {
  isOpen: PropTypes.bool,
  content: PropTypes.shape({
    title: PropTypes.any,
    value: PropTypes.string,
  }),
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
}

Warning.defaultProps = {
  isOpen: false,
  content: {
    title: "",
    value: "",
  },
  onOk: null,
  onCancel: null,
}

export default function Warning(props) {
  const { content, onCancel, onOk, isOpen } = props

  return (
    <CustomModal
      visible={isOpen}
      closable
      destroyOnClose
      maskClosable={false}
      footer={null}
      width={650}
      onCancel={onCancel}
      centered
    >
      <>
        <div className={styles.trashCan}>
          <SvgIcon name="warning-usb" />
        </div>
        {content && <div className={styles.textTitle}>{content.title}</div>}
        {content && <div className={styles.textValue}>{content.value}</div>}
        <div className="d-flex justify-content-center">
          <Button btntype="primary" onClick={onOk}>
            Đóng
          </Button>
        </div>
      </>
    </CustomModal>
  )
}
