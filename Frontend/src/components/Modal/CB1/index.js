import SvgIcon from "src/components/SvgIcon"

import { ModalStyled, ModalWrapper } from "./styled"
export default function CB1({
  width = 600,
  title,
  icon = "warning-usb",
  okText = "Đồng ý",
  cancelText = "Đóng",
  onOk = e => e(),
  ...props
}) {
  ModalStyled.confirm({
    icon: null,
    okText,
    cancelText,
    width,
    onOk,
    maskClosable: true,
    okButtonProps: {
      style: {
        // fontWeight: 700,
        padding: "16px, 16px, 16px, 16px",
        borderRadius: 4,
        height: 32,
        background: `#01638D`,
      },
    },
    cancelButtonProps: {
      style: {
        // fontWeight: 700,
        borderRadius: 4,
        padding: "16px, 16px, 16px, 16px",
        height: 32,
        color: `#000`,
        border: "1px solid #F1F3F5",
        background: `#F1F3F5`,
      },
    },
    wrapClassName: "cb1",
    ...props,
    content: (
      <ModalWrapper className="d-flex justify-content-center align-items-center flex-column">
        <div className="trashCan">
          <SvgIcon name={icon} />
        </div>
        {!!title && (
          <div
            className="textTitle"
            dangerouslySetInnerHTML={{ __html: title }}
          />
        )}
      </ModalWrapper>
    ),
  })
}
