import { Modal } from "antd"
import SvgIcon from "src/components/SvgIcon"

import { ModalWrapper } from "./styled"
export default function CB1({
  width = 600,
  title,
  icon = "warning-usb",
  okText = "Đóng ",
  onOk = e => e(),
}) {
  Modal.error({
    icon: null,
    okText,
    width,
    onOk,
    okButtonProps: { style: { fontWeight: 700, borderRadius: 12, height: 40 } },
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
