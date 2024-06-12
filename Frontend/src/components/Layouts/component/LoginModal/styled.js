import { Modal } from "antd"
import styled from "styled-components"

export const ModalLoginStyle = styled(Modal)`
  .ant-modal-body {
    padding: 0;
  }
`
export const StyleLoginModal = styled.div`
  padding: 30px 30px 20px;
  height: 100%;
  /* .ant-input {
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1) !important;
  } */
  .forget-pass {
    font-size: 14px;
    line-height: 100%;
    text-align: right;
    margin-bottom: 20px;
    color: rgb(36 118 226);
    display: flex;
    justify-content: end;
  }
  .btn-login {
    width: 100%;
    height: 40px !important;
    background: rgb(36 118 226);
    border-radius: 8px !important;
  }
  .register {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px;
    .link-regis {
      font-weight: 600;
      cursor: pointer;
      color: red;
    }
  }
  .ant-form-item {
    margin-bottom: 24px;
  }
  .ant-segmented-item {
    background: #ffffff;
    box-shadow: inset 0px 3px 7px rgba(0, 0, 0, 0.15);
    transition: #0b428a 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    &.ant-segmented-item-selected {
      background-color: #0b428a;
      color: #fff;
    }
  }
  .ant-segmented-thumb {
    background-color: #0b428a;
  }
`
