import styled from "styled-components"

export const WrapNotify = styled.div`
  margin: 16px;
  position: absolute;
  top: -8px;
  right: -12px;
  padding: 16px 12px 4px;
  background-color: #ffffff;
  border-radius: 6px;
  box-shadow: 0 0 12px 3px rgba(0, 0, 0, 0.05);
  .ant-input-search .ant-input-search-button {
    height: 38px;
  }
  .infinite-scroll-component {
    overflow: hidden auto !important;
    max-height: calc(100vh - 350px);
    /* height: calc(100vh - 350px); */
  }
  .container {
    display: flex;
    max-height: calc(100vh - 150px);
    flex-direction: column;
  }

  .header-notify {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
    .title {
      font-size: 20px;
      font-weight: 600;
    }

    .icon {
      margin-left: 8px;
      color: #2260bd;
    }
  }

  .ant-input {
    border: 1px solid #d4d9df;
  }

  .link-name {
    color: #2260bd;
    transition: all 0.3s;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }

  .wrap-tabs {
    flex: 1;
  }

  .body-notify {
    /* overflow: hidden auto;
    max-height: calc(100vh - 350px);
    height: calc(100vh - 350px); */
    margin-top: 6px;
    padding-right: 2px;
    &::-webkit-scrollbar {
      width: 4px;
    }
    &::-webkit-scrollbar-track {
      background: #f1f1f1;
    }
    &::-webkit-scrollbar-thumb {
      background: #c5ced9;
      border-radius: 30px;
    }
  }

  .footer-notify {
    padding: 6px 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .d-flex {
    display: flex;
    align-items: center;
  }
`

export const WrapNotifyItem = styled.div`
  display: flex;
  min-height: 90px;
  margin: 3px 0;
  padding: 12px;
  border-bottom: 1px solid #e9ebec;
  cursor: pointer;
  transition: all 0.3s;

  &.unread {
    /* background-color: #e6f7ff; */
    /* background-color: #e6f7ff; */
    background-color: #e6f7ff;
    position: relative;
    &::before {
      content: "";
      position: absolute;
      top: 4px;
      left: 4px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: #f06548;
    }
  }

  &:hover {
    background-color: #e6f7ff;
    border-radius: 12px;
    /* box-shadow: 0px 0px 12px 2px rgba(0, 0, 0, 0.1); */
  }
  .avatar {
    margin-right: 12px;
  }
  .content-notify {
    flex: 1;
    display: flex;
    flex-direction: column;
    .hidden-text {
      flex: 1;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      display: -webkit-box;
      overflow: hidden;
    }
    .account-name {
      font-size: 15px;
      color: #172b4d;
      font-weight: 600;
    }
    .package-name {
      font-size: 15px;
      color: #2260bd;
    }
    .time {
      color: #8b939f;
      font-weight: 400;
      font-size: 12px;
      line-height: 20px;
      margin-top: 6px;
    }
  }
`
