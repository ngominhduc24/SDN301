import styled from "styled-components"
import { Modal } from "antd"

export const ModalWrapper = styled(Modal)`
  .ant-modal .ant-modal-header {
    background-color: ${props => (props.isError ? "red" : "#d3f7ff")};
  }

  .ant-modal-body {
    flex: auto;
    overflow: ${props => (props.hiddenScroll ? "hidden" : "hidden auto")};
  }
  .ant-image.css-dev-only-do-not-override-1mqg3i0 {
    width: 100%;
  }
`
