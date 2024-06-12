import { Menu } from "antd"
import styled from "styled-components"
import trongdongImg from "src/assets/images/home/trongdong.png"
export const StyleMenuAccount = styled.div`
  .menu-account {
    background: #f3f6fc;
    padding: 6px;
    border-radius: 20px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    margin-top: 10px;
    .btn-logout {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 8px;
      font-size: 14px !important;
      font-weight: 600;
      span {
        svg {
          width: 20px;
          height: 20px;
          path {
            fill: rgb(237, 17, 23);
          }
        }
      }
    }
    .btn-function {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 8px;
      font-size: 14px !important;
      span {
        svg {
          width: 20px;
          height: 20px;
          path {
            fill: #9a9a9a;
          }
        }
      }
    }
    .strok-btn-function {
      span {
        svg {
          width: 20px;
          height: 20px;
          path {
            fill: #9a9a9a;
            stroke: #9a9a9a;
          }
        }
      }
    }
    .ant-dropdown-menu-item {
      background: #fff !important;
      padding: 5px 0px;
    }
    .ant-dropdown-menu-item:hover {
      background: #f5f5f5 !important;
    }

    .infor-mobile {
      .ant-divider {
        margin: 10px 0px;
      }
      .infor {
        margin-bottom: 8px;
      }
      .sumary-infor-user {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-direction: column;
        height: 100%;
      }
    }
    .ant-dropdown-menu {
      position: relative !important;
      width: 100% !important;
      padding: 0 !important;
      box-shadow: unset;
      background: none;
      .account-infor {
        background: #fff;
        padding: 10px;
        border-radius: 20px 20px 3px 3px;
        margin-bottom: 3px;
        .ant-divider {
          margin: 10px 0px;
        }
        .infor {
          margin-bottom: 8px;
        }
        .sumary-infor-user {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          flex-direction: column;
          height: 100%;
        }
      }
      .account-function {
        background: #fff;
        padding: 10px;
        border-radius: 3px;
        margin-bottom: 3px;
      }
      .account-logout {
        background: #fff;
        padding: 10px;
        border-radius: 3px 3px 20px 20px;
      }
    }
  }
`
export const LayoutStyled = styled.div`
  .btn-colapse-menu {
    border-radius: 50px;
    background: #fff;
    width: 36px;
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 5px;
    border: none;
    transition: all 0.3s;
    :hover,
    :focus {
      background: #e9e9e9;
    }
  }
  .logo {
    height: 45px;
    padding-right: 10px;
  }
  .logo-text {
    /* font-size: 90%; */
    color: #154398;
  }
  .shrink-avatar {
    width: 68px;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;

    img {
      width: 68px;
      height: 68px;
    }
  }
  .shrink-avatar-transition {
    transition: 0.8s all ease;
    img {
      transition: 0.8s all ease;
    }
  }
  .no-shrink-avatar {
    width: 135px;
    height: 135px;
    img {
      width: 135px;
      height: 135px;
    }
  }
  .header-background {
    /* background: ${({ theme }) => theme["primary-color"]}; */
    background: #fff;
    position: sticky;
    top: 0;
    z-index: 100;
    /* box-shadow: ${({ shadow }) =>
      !!shadow ? "1px 1px 2px #ddd" : "none"}; */
    box-shadow: 0px 1px 7px rgba(0, 0, 0, 0.2);
    height: auto;
    padding: 0;
    .content {
      height: 100% !important;
    }
  }
  .fl-input-radius {
    .ant-input-group > .ant-input:first-child,
    .ant-input-group-addon:first-child {
      border-radius: 24px;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    .ant-input-search
      > .ant-input-group
      > .ant-input-group-addon:last-child
      .ant-input-search-button {
      border-radius: 0 24px 24px 0;
    }
  }
  .hover-menu:hover {
    .ant-scroll-number-only-unit {
      color: #fff !important;
    }
    span {
      color: #ed1117 !important;
      svg path {
        fill: #ed1117;
      }
    }
  }
  .div-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .account-infor-avatar {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    /* color: ${({ theme }) => theme["primary-color"]}; */
    color: #595959;
    .ant-avatar {
      background: unset;
    }
    svg path {
      /* fill: ${({ theme }) => theme["primary-color"]}; */
      fill: #595959;
    }
  }
  .account-infor-sumary-border {
    border-radius: 20px;
    border: 1px solid #a3a3a3;
    gap: 2px;
    padding: 2.5px 2.5px;
  }
  .account-info-sumary-border-admin {
    border-radius: 20px;
    border: 1px solid #a3a3a3;
    gap: 2px;
    padding: 2.5px 2.5px;
  }
  .account-infor-sumary {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 2px;
    span {
      svg path {
        fill: #000;
      }
      .fullname {
        font-size: 12px !important;
        color: #a3a3a3;
        font-weight: 600;
        max-width: 160px;

        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1; /* number of lines to show */
        line-clamp: 1;
        -webkit-box-orient: vertical;
      }
      .account {
        font-size: 12px !important;
        color: #a3a3a3;
        font-style: italic;
      }
    }
  }
  .spacement_pp {
    /* height: 17px; */
    height: 15px;
    margin-bottom: 10px;
    position: sticky;
    top: 60px;
    background: #fff;
    z-index: 10;
  }
  position: relative;
  .admin-header {
    position: sticky;
    top: 0;
    z-index: 100;
    filter: drop-shadow(0px 1px 10px rgba(0, 0, 0, 0.1));
  }
  .breadcrumb-header {
    /* box-shadow: inset 0 5px 10px #ebebeb; */
    padding: 8px 0;
    background: #f7f7f7;
  }
  .box-breadcrumb-header {
    background-color: #fff;
    /* padding-bottom: 20px; */
  }
  .background-animation {
    position: fixed;
    bottom: 40px;
    left: 40px;
    background-color: #c7dcff;
    width: 100px;
    height: 100px;
    border-radius: 50px;
    animation: Background-zoom 2.3s ease-in-out infinite;
  }
  .chatbot {
    position: fixed;
    bottom: 40px;
    right: 40px;
  }
  .phone-animate {
    position: fixed;
    bottom: 62px;
    left: 62px;
    animation: App-logo-spin 1s ease-in-out infinite;
  }
  @keyframes Background-zoom {
    0%,
    100% {
      transform: rotate(0) scale(0.7) skew(1deg);
      opacity: 0.2;
    }

    50% {
      transform: rotate(0) scale(1) skew(1deg);
      opacity: 0.2;
    }
  }
  @keyframes App-logo-spin {
    0%,
    100%,
    50% {
      transform: rotate(0) scale(1) skew(1deg);
    }

    10%,
    30% {
      transform: rotate(-25deg) scale(1) skew(1deg);
    }
    20%,
    40% {
      transform: rotate(25deg) scale(1) skew(1deg);
    }
  }
  .login-item {
    padding: 4px 12px;
    &:first-child {
      border-right: 1px solid #595959;
    }
    .login-item_text {
      font-weight: 600;
      font-size: 14px;
      line-height: 15px;
      /* color: #fff; */
      color: #595959;
      margin-left: 6px;
    }
    .login-icon {
      svg {
        width: 15px;
        height: 15px;
      }
    }
    .register-icon {
      svg {
        width: 22px;
        height: 22px;
      }
    }
    svg {
      path {
        fill: #595959;
      }
    }
  }
  .wrap-icon {
    background: #fff;
    padding: 4px 10px;
    border-radius: 50%;
  }
  .change-rule {
    height: 100%;
    .change-rule_item {
      height: 100%;
      padding: 12px 20px;
      color: #fff;
      font-size: 16px;
      margin-right: -20px;
      cursor: pointer;
      margin-left: 24px;
      span.anticon.anticon-export {
        font-size: 18px;
      }
    }
    .candidate {
      background-color: #00b2a3;
    }
    .business {
      background-color: rgb(24 38 66);
    }
  }
  .ant-layout {
    background-color: #fff;
  }

  .flex-end-col {
    display: flex;
    justify-content: flex-end;
  }

  .ant-badge-multiple-words {
    padding: 0px 5px;
  }
  .ant-scroll-number-only-unit {
    font-size: 10px;
  }
  .ant-badge-count {
    font-size: 10px;
  }

  .breadcrumb-custom {
    .ant-breadcrumb-link {
      color: #fff !important;
      font-size: 18px !important;
    }
  }
`

export const CustomMenuStyled = styled.div`
  width: 100%;
  .ant-menu {
    background-color: unset;
    width: calc(100vw - 690px);
  }
  .ant-menu-submenu-selected::after {
    border-bottom: unset !important;
    content: "";
    width: 10px;
    height: 6px;
    bottom: 0px;
    right: 0;
    position: absolute;
    left: 0;
    margin: auto;
  }
  .ant-menu-item {
    height: 60px;
  }
  .ant-menu-item,
  .ant-menu-submenu {
    padding: 0px !important;
    margin-right: 8px;
    top: 11px;
    display: flex;
    align-items: center;
  }
  .ant-menu-submenu-selected {
    .ant-menu-submenu-title {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      position: relative;
      .ant-menu-item-icon {
        height: 40px;

        svg {
          g path,
          path {
            fill: ${({ theme }) => theme["primary-color"]};
          }
        }
      }
    }
  }
  .ant-menu-submenu-title {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    position: relative;
    .ant-menu-item-icon {
      height: 40px;
    }
    :hover {
      svg {
        g path,
        path {
          fill: ${({ theme }) => theme["primary-color"]};
        }
      }
    }
    &::after {
      content: "";
      position: absolute;
      top: 42%;
      right: 3px;
      border-width: 6px 4px;
      border-style: solid;
      border-color: #595959 transparent transparent;
    }
    .ant-menu-title-content {
      padding-right: 18px;
    }
  }

  .ant-menu-submenu-popup .ant-menu-vertical .ant-menu-submenu {
    border-bottom: 1px dashed #e1e1e1;
    &:last-child {
      border-bottom: unset;
    }
  }
  .ant-menu-submenu:hover::after {
    border-bottom: unset !important;
  }
  .ant-menu-horizontal {
    border-bottom: 0px;
  }
  .ant-menu-title-content {
    color: #595959;
    padding: 12px;
    border-radius: 12px;
    font-weight: 600;
    margin-left: 0px !important;
  }

  .ant-menu-item:hover::after {
    border-bottom: unset !important;
  }
  .ant-menu-submenu:hover {
    color: transparent !important;
  }
  .ant-menu-submenu::after {
    border: unset !important;
  }
  .ant-menu-item-selected .ant-menu-item-icon {
    svg g path {
      fill: ${({ theme }) => theme["primary-color"]};
    }
    svg path {
      fill: ${({ theme }) => theme["primary-color"]};
    }
  }
  .ant-menu-item {
    .ant-menu-title-content {
      color: #595959;
    }
    .ant-menu-item-icon {
      svg {
        g path,
        path {
          fill: #595959;
        }
      }
    }
    :hover {
      .ant-menu-item-icon {
        svg {
          g path,
          path {
            fill: ${({ theme }) => theme["primary-color"]};
          }
        }
      }
    }
  }
  .ant-menu-item-selected .ant-menu-title-content,
  .ant-menu-submenu-selected .ant-menu-submenu-title span,
  .ant-menu-item:hover .ant-menu-title-content,
  .ant-menu-overflow-item:hover
    .ant-menu-submenu-title
    .ant-menu-title-content {
    /* color: #fff !important;
    background-color: ${({ theme }) => theme["primary-color"]};
    transition: all linear 0.3s; */
    color: ${({ theme }) => theme["primary-color"]};
  }
  .ant-menu-overflow-item.ant-menu-overflow-item-rest.ant-menu-submenu-selected,
  .ant-menu-overflow-item.ant-menu-submenu-selected[aria-hidden="true"] {
    .ant-menu-submenu-title span {
      background-color: transparent;
    }
  }
  .ant-menu-overflow-item:hover .ant-menu-submenu-title,
  .ant-menu-submenu-selected .ant-menu-submenu-title {
    &::after {
      border-color: ${({ theme }) => theme["primary-color"]} transparent
        transparent;
    }
  }

  .ant-menu-overflow-item-rest .ant-menu-submenu-title {
    &::after {
      display: none;
    }
    svg path {
      fill: #595959;
    }
  }

  .ant-menu-item-selected::after {
    border-bottom: unset !important;
    content: "";
    width: 10px;
    height: 6px;
    bottom: 0px;
    right: 0;
    position: absolute;
    left: 0;
    margin: auto;
  }
  .ant-menu-item-active::after {
    border-bottom: unset !important;
  }
  .ant-menu-horizontal > .ant-menu-item::after {
    transition: unset !important;
  }
`
export const UserInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;

  .user-information {
    padding-right: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;

    .user-name {
      font-weight: 600;
      color: ${({ theme }) => theme.white};
      margin-bottom: 8px;
      width: max-content;
      line-height: 1;
    }

    .user-role {
      color: ${({ theme }) => theme.white};
      font-size: 13px;
      margin-bottom: 0px;
      text-align: right;
      line-height: 1;
    }
  }

  .style-avt {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border: 1px solid #fff;
  }
  .notification_count {
    svg path {
      stroke: #a3a33a;
    }
  }
  .div-notification_count {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

export const MenuSelect = styled(Menu)`
  position: absolute;
  top: 12px;
  width: 500px;
  max-height: calc(100vh - 150px);
  overflow-y: auto;
  .search-input {
    padding: 6px 16px;
    border-bottom: 2px solid #ddd;
    margin-bottom: 6px;
    position: sticky;
    top: -3px;
    background-color: #fff;
    z-index: 2;
    .ant-input {
      height: 32px;
    }
  }
  .ant-dropdown-menu-item {
    padding: 6px 16px;
  }
`
export const HeaderStyled = styled.div`
  .ant-menu-horizontal {
    border-bottom: none;
  }
  .ant-menu-title-content {
    color: #000000;
    padding: 12px;
    color: #154398;
    font-weight: 600;
  }
  .ant-menu .ant-menu-item-selected .ant-menu-title-content {
    background-color: unset !important;
  }
  .ant-menu .ant-menu-item-selected {
    border-bottom: 2px solid #154398;
  }
  padding: 24px 0;
  background: url(${trongdongImg}) no-repeat;
  background-position: center;
  background-size: cover;
`
