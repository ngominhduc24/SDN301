import { Modal } from "antd"

const ConfirmModal = ({
  width = 500,
  title,
  description,
  okText = "Xóa",
  cancelText = "Hủy",
  onOk = e => e(),
  ...props
}) => {
  Modal.confirm({
    icon: null,
    title: (
      <div className="fs-25 fw-700">{title}</div>
    ),
    okText,
    cancelText,
    width,
    onOk,
    maskClosable: true,
    okButtonProps: {
      style: {
        // padding: "12px 30px 35px 30px",
        fontWeight: 600,
        color: 'black',
        fontSize: '15px',
        borderRadius: 24,
        background: `#17a288`,
      },
    },
    cancelButtonProps: {
      style: {
        borderRadius: 4,
        fontWeight: 600,
        fontSize: '15px',
        color: `#000`,
        border: "1px solid #F1F3F5",
        background: `#F1F3F5`,
      },
    },
    wrapClassName: "cb1",
    ...props,
    content: (
      <div className="fw-700">
        {description}
      </div>
    ),
  })
}

export default ConfirmModal