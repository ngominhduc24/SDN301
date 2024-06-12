import styled from "styled-components"
import trongdongImg from "src/assets/images/home/trongdong.png"
export const FooterStyled = styled.div`
  position: relative;

  .to-top {
    .title-to-top {
      display: none;
    }
    position: fixed;
    bottom: 62px;
    right: 62px;
    :hover {
      .title-to-top {
        display: flex;
      }
    }
  }
  .ant-menu-title-content {
    color: #838383 !important;
    font-weight: 400 !important;
  }
  .ant-menu-item {
    padding: 0px;
  }
  .ant-menu-vertical {
    border-right: unset !important;
  }
  .dkkd {
    font-weight: 600;
    font-size: 12px;
    color: #838383;
  }
  .button-to-top {
    background: #ffffff;
    box-shadow: -2px 1px 4px rgba(0, 0, 0, 0.1);
    width: 40px;
    height: 40px;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .orange-color {
    font-weight: 600;
    font-size: 12px;
    color: #f88c00;
  }

  .ant-menu-vertical .ant-menu-item {
    border: unset !important;
    padding: 0px !important;
  }

  .ant-menu-item,
  .ant-menu-submenu {
    top: 0 !important;
  }
  .ant-menu-item:hover .ant-menu-title-content {
    color: #838383 !important;
  }
  .ant-menu-item-selected {
    background-color: #ffffff !important;
    .ant-menu-item:hover .ant-menu-title-content,
    .ant-menu-title-content {
      color: #838383 !important;
    }
  }
  .input-email {
    width: 359px;
    background: #f4f6fb;
    border-radius: 4px;
    border: unset;
    input {
      background: transparent;
      border: unset;
    }
    .ant-btn,
    .ant-input-group-addon {
      border: unset;
      background: transparent;
    }
    .ant-btn-primary {
      text-shadow: unset;
      box-shadow: unset;
    }
    .ant-input:focus {
      border: unset;
      box-shadow: unset;
    }
  }

  .footer-last {
    background-color: #2e466b;
  }
  .bg-footer {
    background-color: rgb(6, 32, 69);
    background-image: url(${trongdongImg});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
`
