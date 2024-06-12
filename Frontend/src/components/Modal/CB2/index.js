import SvgIcon from "src/components/SvgIcon"

import { ModalStyled, ModalWrapper } from "./styled"
import "./styled.scss"
import { Form, Input } from "antd"
export default function CB2({
  width = 600,
  title,
  formCB2,
  notify,
  nameFormItem,
  titleFormItem,
  placeholderFormItem,
  requiredFormItem = true,
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
        padding: "4px 10px",
        borderRadius: 4,
        height: 32,
        color: `#fff`,
        background: `#01638D`,
      },
    },
    cancelButtonProps: {
      style: {
        borderRadius: 4,
        padding: "4px 10px",
        height: 32,
        color: `#000`,
        border: "1px solid #F1F3F5",
        background: `#F1F3F5`,
      },
    },
    wrapClassName: "cb2",
    ...props,
    content: (
      <ModalWrapper className="form-item-fw-600 d-flex justify-content-center align-items-center flex-column">
        <div className="title-cb2">
          {!!title && (
            <div
              className="textTitle"
              dangerouslySetInnerHTML={{ __html: title }}
            />
          )}
        </div>
        <div className="trashCan">
          <SvgIcon name={icon} />
        </div>
        {!!notify ? <div className="pl-16 pr-16">{notify()}</div> : <></>}
        {!!formCB2 ? (
          <div style={{ width: "100%", padding: " 8px 16px 0px 16px" }}>
            <Form form={formCB2} layout="vertical">
              <Form.Item
                label={
                  titleFormItem || "Vui lòng nhập căn cứ xoá Hồ sơ/Tài liệu"
                }
                name={nameFormItem || "Reason"}
                rules={[
                  {
                    required: requiredFormItem,
                    message: "Thông tin không được để trống!",
                  },
                ]}
              >
                <Input.TextArea
                  autoFocus
                  placeholder={placeholderFormItem || "Nhập"}
                  style={{ height: "110px", overflow: "hidden auto" }}
                ></Input.TextArea>
              </Form.Item>
            </Form>
          </div>
        ) : (
          <></>
        )}
      </ModalWrapper>
    ),
  })
}
