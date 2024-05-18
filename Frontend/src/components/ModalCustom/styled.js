import { Modal } from "antd"
import styled from "styled-components"

export const ModalCustomStyled = styled(Modal)`

.ant-modal-content, .ant-modal-header {
  background-color: white;
}
.ant-modal-title {
 color: #db6784;
 font-size: 25px;
 font-weight: 700;
}
.ant-modal-footer {
  text-align: unset;
  background: transparent !important;
  margin-top: 12px !important;
}
.ant-modal-close {
  color: black !important;
  &:hover {
    background-color: #6a6a6a !important; 
    border-radius: 50% !important;
  }
}
`