import styled from "styled-components"

export const AdminMenuStyled = styled.div`
  position: sticky;
  top: 52px;
  padding-top: 5px;
  .ant-menu-item,
  .ant-menu-submenu {
    top: 0px;
    padding: 6px 0px !important;
  }
  .ant-menu-submenu-selected::after,
  .ant-menu-item-selected::after {
    background: unset !important;
  }
  .ant-menu-sub.ant-menu-inline {
    background: transparent !important;
  }
  .ant-menu-item:hover .ant-menu-title-content {
    color: #154398 !important;
    font-weight: 600;
  }
  .ant-menu-submenu-title:hover .ant-menu-title-content {
    color: #154398 !important;
    font-weight: 600;
  }
  .ant-menu-item:hover .ant-menu-title-content {
    color: #154398 !important;
    font-weight: 600 !important;
  }
  .ant-menu-item-only-child .ant-menu-title-content {
    color: #212529;
    font-weight: 400 !important;
  }
  .ant-menu-item-selected .ant-menu-title-content {
    font-weight: 600 !important;
  }
  .ant-menu-item .ant-menu-title-content,
  .ant-menu-submenu-title .ant-menu-title-content {
    color: #212529;
    font-weight: 600;
  }
  .ant-menu-submenu {
    top: 0px !important;
  }
  .ant-menu-item {
    padding-left: 24px !important;
  }

  .ant-menu-item-selected .ant-menu-title-content {
    color: #154398;
    font-weight: 600;
  }
  .ant-menu-sub .ant-menu-item {
    margin-left: -12px;
    width: 100%;
    padding-left: 73px !important;
    border-radius: 0px 8px 8px 0px;
  }
  .ant-menu-item-selected {
    background: #ffffff !important;
    border-radius: 0px 8px 8px 0px;

    box-shadow: 2px 0px 3px rgb(0 0 0 / 5%);
    width: calc(100% - 12px);
  }
  .ant-menu-submenu-selected .ant-menu-item-selected {
    background: #ffffff;
    box-shadow: 2px 0px 3px rgb(0 0 0 / 5%);
  }
  .ant-menu-item-group-title {
    font-style: italic;
    color: #212529;
    font-weight: 600;
    margin-left: 15px;
  }
  .menu-antd-admin {
    background: #f7f7f7;
    border-radius: 8px;
    width: 270px;
    height: calc(100vh - 60px);
    overflow: hidden auto;
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
  }
`
