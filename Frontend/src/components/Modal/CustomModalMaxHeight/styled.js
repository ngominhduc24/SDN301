import styled from 'styled-components'
import CustomModal from '../CustomModal'

export const ModalWrapper = styled(CustomModal)`
  .ant-modal-header {
    background-color: #d3f7ff;
  }
  .ant-modal-content {
    max-height: 100vh;
    overflow: auto;
  }
`
