import React from "react"
import PropTypes from "prop-types"

import SvgIcon from "src/components/SvgIcon"

import CustomModal from "src/components/Modal/CustomModal"

import Button from "src/components/MyButton/Button"

import styles from "./styles.module.scss"

Confirm.propTypes = {
  isOpen: PropTypes.bool,
  content: PropTypes.shape({
    title: PropTypes.any,
    value: PropTypes.string,
  }),
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  iconName: PropTypes.string,
}

Confirm.defaultProps = {
  isOpen: false,
  content: {
    title: "",
    value: "",
  },
  onOk: null,
  onCancel: null,
  iconName: "confirm-lw",
}

export default function Confirm(props) {
  const {
    content,
    onCancel,
    onOk,
    isOpen,
    iconName,
    contentHtml,
    width = 614,
    titleButton,
    showButton,
  } = props

  return (
    <CustomModal
      visible={isOpen}
      closable
      destroyOnClose
      maskClosable={false}
      footer={null}
      width={width}
      onCancel={onCancel}
      centered
    >
      <SvgIcon name={iconName} className="mb-4" />
      {contentHtml
        ? contentHtml
        : content && <div className={styles.textContent}>{content.title}</div>}
      <div className="d-flex justify-content-center mt-4">
        <Button btntype="third" className={styles.btnCancel} onClick={onCancel}>
          Đóng
        </Button>
        {showButton && (
          <Button btntype="primary" className="btn-hover-shadow" onClick={onOk}>
            {titleButton || "Ghi lại"}
          </Button>
        )}
      </div>
    </CustomModal>
  )
}
