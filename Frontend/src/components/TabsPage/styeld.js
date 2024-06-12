import styled from "styled-components"

export const TabsPageStyle = styled.div`
  .ant-tabs-nav {
    margin-bottom: 0;
  }
  .ant-tabs-nav-wrap {
    background-color: rgba(247, 247, 247, 1);
    padding-left: 4px;
  }
  .ant-tabs .ant-tabs-tab + .ant-tabs-tab {
    margin-left: 8px;
  }
  .ant-tabs-ink-bar {
    display: none;
  }
  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    .tabs-item {
      background: #fff;
      box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
      color: rgba(21, 67, 152, 0.78);
    }
  }
  .ant-tabs-tab {
    padding: 6px 0;
  }
  .tabs-item {
    padding: 6px 12px;
    text-align: center;
    /* margin-right: 4px; */
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    font-size: 12px;
    transition: all linear 0.1s;
    &:hover {
      color: rgba(21, 67, 152, 0.78);
    }
  }
`
