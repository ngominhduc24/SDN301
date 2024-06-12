import { Modal } from 'antd'
import styled from 'styled-components'

export const ModalWrapper = styled.div`
  .textTitle {
    margin-bottom: 3px;
    text-align: center;
    width: -webkit-fill-available;
  }
  .ant-modal-body {
    overflow: hidden auto;
  }
  .textValue {
    margin-bottom: 32px;
    text-align: center;
  }

  .trashCan {
    margin-top: 8px;
    margin-bottom: 24px;
    display: flex;
    justify-content: center;

    svg {
      width: 120px;
      height: 120px;
    }
  }
`
