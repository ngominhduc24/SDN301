/* eslint-disable react/forbid-prop-types */
import PropTypes from "prop-types"
import CustomModal from "src/components/Modal/CustomModal"
import Button from "src/components/MyButton/Button"
import SvgIcon from "src/components/SvgIcon"
import styles from "./styles.module.scss"

export default function Delete(props) {
  const { content, onCancel, onOk, isOpen, loading } = props

  return (
    <CustomModal
      visible={isOpen}
      closable
      destroyOnClose
      maskClosable={false}
      footer={null}
      width={614}
      style={{ top: 200 }}
      onCancel={onCancel}
    >
      <div className={styles.trashCan}>
        <SvgIcon name="trashRed" />
      </div>
      {content && <div className={styles.textContent}>{content.title}</div>}
      <div className="d-flex justify-content-center">
        <Button
          btntype="gray-style"
          className={styles.btnCancel}
          onClick={onCancel}
        >
          Đóng
        </Button>
        {onOk && (
          <Button loading={loading} btntype="primary" onClick={onOk}>
            Đồng ý
          </Button>
        )}
      </div>
    </CustomModal>
  )
}

Delete.propTypes = {
  isOpen: PropTypes.bool,
  content: PropTypes.shape({
    title: PropTypes.any,
    value: PropTypes.string,
  }),
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  loading: PropTypes.bool,
}

Delete.defaultProps = {
  isOpen: false,
  content: {
    title: "",
    value: "",
  },
  onOk: null,
  onCancel: null,
  loading: false,
}
