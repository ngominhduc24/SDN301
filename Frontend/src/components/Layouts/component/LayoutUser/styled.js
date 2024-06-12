import styled from "styled-components"

const darkText = "#333"
const lightText = "#FFF"
const colorActiveDark = "#FFF"
// const colorActiveLight = "#6956e5"
const colorActiveLight = "#01638D"
const backgroundActiveDark = "rgba(255, 255, 255, 0.1)"
// const backgroundActiveLight = "rgba(237, 236, 249)"
const backgroundActiveLight = "rgb(1 99 141 / 8%)"
const dark = "#001529"
const light = "#fff"

export const UserMenuStyled = styled.div`
  position: sticky;
  top: 52px;
  height: calc(100vh - 52px);
  .ant-menu .ant-menu-item {
    overflow: initial;
    position: relative;
    .ant-badge {
      position: unset;
    }
  }

  .socket .ant-badge-count {
    transform: translate(-40%, 55%) !important;
  }
  .side-bar-wrapper {
    height: 100%;
    overflow-y: auto;
    background-color: ${({ themeDark }) => (themeDark ? dark : light)};
    border-right: 1px solid #ddd;

    .sub-menu {
      padding: 16px 0 16px 24px;
      .ant-switch {
        width: 70px;
        height: 30px;
        background-color: ${colorActiveLight};
        .ant-switch-handle {
          width: 26px;
          height: 26px;
          &::before {
            border-radius: 15px;
          }
        }
        &.ant-switch-checked .ant-switch-handle {
          inset-inline-start: calc(100% - 29px);
        }
        .ant-switch-inner-checked,
        .ant-switch-inner-unchecked {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          color: #fff566;
        }
        .ant-switch-inner-unchecked {
          height: 50% !important;
          font-size: 20px !important;
        }
        .ant-switch.ant-switch-checked {
          background-color: ${colorActiveLight};
        }
      }
    }
    .background-menu-box {
      background-color: ${({ themeDark }) =>
        themeDark ? "rgb(10 29 47)" : "#f0f0f0"};
      color: ${({ themeDark }) => (themeDark ? light : dark)};
    }
    .icon-option {
      cursor: pointer;
      svg path {
        fill: ${({ themeDark }) => (themeDark ? lightText : darkText)};
      }
    }
    .collapsed-item {
      width: 100%;
      padding: 10px 0 10px 28px;
      display: flex;
      align-items: center;
      cursor: pointer;
      &:hover {
        background: ${({ themeDark }) =>
          themeDark ? backgroundActiveDark : backgroundActiveLight} !important;
        font-weight: 600;
      }

      .collapsed-icon {
        margin-right: ${({ collapseMenu }) => (collapseMenu ? "0" : "16px")};
        width: ${({ collapseMenu }) => (collapseMenu ? "100%" : "auto")};
        text-align: center;
        svg {
          width: ${({ collapseMenu }) => (collapseMenu ? "22px" : "18px")};
          height: ${({ collapseMenu }) => (collapseMenu ? "22px" : "18px")};
        }
        svg path {
          fill: ${({ themeDark }) => (themeDark ? lightText : darkText)};
        }
      }
      .collapsed-title {
        display: ${({ collapseMenu }) => (collapseMenu ? "none" : "block")};
        color: ${({ themeDark }) => (themeDark ? lightText : darkText)};
        font-size: 16px;
      }
    }
  }
  .menu-antd-user {
    padding-left: 11px;
    height: auto;
    width: 270px;
    overflow: hidden auto;
    margin-right: unset;
    border: unset;
    &::-webkit-scrollbar {
      width: 0px;
    }
    &::-webkit-scrollbar-track {
      background: #f1f1f1;
      box-shadow: unset;
      margin: 5px 0px;
    }
    &::-webkit-scrollbar-thumb {
      background: #c5ced9;
      border-radius: 30px;
    }

    /* .ant-menu-item-icon {
      svg path {
        stroke: ${({ themeDark }) => (themeDark ? lightText : darkText)};
        fill
      }
    } */
    .ant-menu-item:hover,
    .ant-menu-item:not(.ant-menu-item-selected):active,
    .ant-menu-submenu-title:hover,
    .ant-menu-submenu-title:active {
      .ant-menu-title-content {
        color: ${({ themeDark }) =>
          themeDark ? colorActiveDark : colorActiveLight} !important;
        font-weight: 600;
      }
    }
    .ant-menu-item:not(.ant-menu-item-selected):active,
    .ant-menu-submenu-title:active,
    .ant-menu-item:not(.ant-menu-item-selected):hover,
    .ant-menu-submenu-title:hover {
      background: ${({ themeDark }) =>
        themeDark ? backgroundActiveDark : backgroundActiveLight};
    }
    .ant-menu-item-selected {
      background: ${({ themeDark }) =>
        themeDark ? backgroundActiveDark : backgroundActiveLight} !important;
      .ant-menu-title-content {
        color: ${({ themeDark }) =>
          themeDark ? colorActiveDark : colorActiveLight};
        font-weight: 600;
      }
      .ant-menu-item-icon {
        svg path {
          fill: ${({ themeDark }) =>
            themeDark ? colorActiveDark : colorActiveLight};
        }
      }
    }
    .ant-menu-submenu-selected > .ant-menu-submenu-title {
      color: ${({ themeDark }) =>
        themeDark ? colorActiveDark : colorActiveLight};
      font-weight: 600;
      .ant-menu-item-icon {
        svg path {
          fill: ${({ themeDark }) =>
            themeDark ? colorActiveDark : colorActiveLight};
        }
      }
    }
    .ant-menu-submenu-selected .ant-menu-item-selected {
      background: ${({ themeDark }) =>
        themeDark ? backgroundActiveDark : backgroundActiveLight};
    }

    &.ant-menu.ant-menu-inline-collapsed {
      width: 100px;
      margin-right: 0px !important;
      border: unset;
      /* padding-top: 10px; */
      .ant-menu-item-icon {
        min-width: 40px;
        svg {
          width: 24px;
          height: 24px;
        }
      }
      .ant-menu-item {
        border: unset !important;
        margin-bottom: 4px !important;
        height: 50px !important;
        .ant-menu-item-icon {
          transform: translateY(14px);
        }
      }
      .ant-menu-submenu-title {
        height: 50px !important;
        line-height: 50px;
        display: flex;
        align-items: center;
      }
      .ant-menu-submenu-selected > .ant-menu-submenu-title {
        background: ${({ themeDark }) =>
          themeDark ? backgroundActiveDark : backgroundActiveLight};
      }
    }
  }

  .header-content {
    padding: 24px 16px 32px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`
