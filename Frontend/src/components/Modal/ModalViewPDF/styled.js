import styled from "styled-components"
import { Modal } from "antd"

export const ModalViewPDFStyle = styled(Modal)`
  .ant-modal-body {
    padding: 0;
    overflow: hidden hidden;
    display: flex;
    flex-direction: column;
  }
  .ant-modal-header {
    &::after {
      content: unset;
    }
  }
  .pdf-container {
    height: calc(100vh - 20px);
    overflow-y: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    .rpv-default-layout__toolbar {
      position: sticky;
      top: 0;
    }
  }
`
