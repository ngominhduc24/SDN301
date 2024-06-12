import styled from "styled-components"

export const WrapModal = styled.div`
  height: 100%;
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* Internet Explorer 10+ /
  scrollbar-width: none;
  .ant-tabs-nav {
    position: sticky;
    top: -10px;
    z-index: 1;
    background: #fff;
    / padding: 0 12px; /
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
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
  .title {
    font-size: 16px;
    color: #172b4d;
    margin-bottom: 7px;
  }
  .ant-spin-nested-loading {
    / height: 100%; /
  }
  .ant-spin-container {
    / height: 100%; /
    display: flex;
    flex-direction: column;
  }*/
  .ant-tabs {
    flex: 1 1 auto;
    overflow: auto;
    background: #fff;
    padding: 0px 24px 16px 24px;
    margin-left: -16px;
    margin-right: -16px;
    height: 100%;
  }
  .tab-content {
    height: 100%;
  }
  .ant-tabs-content {
    height: 100%;
  }
  .content-info {
    background-color: #fff;
    border-radius: 8px;
    padding: 8px;
    margin-bottom: 16px;
    display: flex;
    flex-wrap: wrap;
    margin-top: 5px;
    margin-left: 0px !important;
    margin-right: 0px !important;
  }
  .content {
    font-weight: 500;
    color: #333;
    margin-top: 8px;
  }
  .label {
    white-space: nowrap;
    font-weight: 400;
    margin-right: 6px;
    color: #6a7688;
  }
  .item-content {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding-bottom: 10px;
    .content {
      font-weight: 500;
      color: #333;
      margin-top: 8px;
    }
    &.column {
      flex-direction: column;
      align-items: flex-start;
    }
    &.w-20 {
      width: 20%;
    }
    &.w-30 {
      width: 33%;
    }
  }
  .company-info {
    background-color: #f3f6f9;
    border-radius: 8px;
    padding: 12px;
    .item-content {
      justify-content: flex-start;
      .label {
        width: 100px;
      }
    }
  }
  .w-200 {
    min-width: 200px;
  }

  .table-content {
    .ant-table-pagination.ant-pagination {
      margin-bottom: 0;
    }
  }

  .body-chat {
    background-color: #fff;
    border: 1px dashed #e9ebec;
    min-height: 300px;
    max-height: 400px;
    /* height: calc(100vh - 400px); */
    flex: 1;
    border-radius: 8px;
    padding: 12px;
    margin-bottom: 16px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    overflow-y: auto;
    overflow-x: hidden;
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
    .row-chat {
      display: flex;
      margin-bottom: 16px;
      width: 100%;
      .chat-item {
        display: flex;
        width: 50%;
        .account-name {
          font-size: 12px;
          margin-bottom: 4px;
          color: #096dd9;
        }
        .chat-content {
          padding: 6px 8px;
          border-radius: 8px;
          max-width: 100%;
        }
        .your-avatar {
          margin-right: 12px;
        }
        .my-avatar {
          margin-left: 12px;
        }
        .time {
          font-size: 10px;
          color: #595959;
          padding-top: 12px;
          text-align: right;
        }
      }
      &.my-self {
        justify-content: flex-end;
        .chat-item {
          justify-content: flex-end;
        }
        .chat-content {
          background-color: #e3f3fe;
        }
        .your-avatar,
        .account-name {
          display: none;
        }
      }
      &.your-self {
        justify-content: flex-start;
        .chat-item {
          justify-content: flex-start;
        }
        .chat-content {
          background-color: #f3f6f9;
        }
        .my-avatar {
          display: none;
        }
      }
    }
  }

  .search-custom {
    input {
      border: 1px solid #d9d9d9;
    }
  }
`
