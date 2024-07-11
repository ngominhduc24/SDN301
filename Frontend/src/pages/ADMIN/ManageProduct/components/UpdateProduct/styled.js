import { TreeSelect } from "antd"
import styled from "styled-components"

export const StylesTabPattern = styled.div`
  height: calc(100vh - 200px);
  .ant-tabs-nav {
    margin-bottom: 0px;
    position: sticky;
    top: 0;
    background-color: #fff;
    z-index: 100;
  }
  .ant-tabs-nav {
    :before {
      border-bottom: 1px solid #ccc;
    }
    ::after {
      content: "";
      width: 100%;
      height: 12px;
      position: absolute;
      top: -12px;
      background-color: #fff;
    }
  }
  .ant-tabs-tab {
    border: 1px solid #ccc !important;
  }
  .ant-tabs-tab-active {
    border-bottom: none !important;
  }

  .declaration-shadow-box {
    border: 1px solid #ccc;
  }
`

export const PatentRegistrationChildBorder = styled.div`
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  padding: 8px;
  .ant-form-item {
    margin: 0 !important;
  }
  .ant-form-item-control-input {
    min-height: 0;
   /* margin-top: 5px; */
}
`

export const TreeSelectStyled = styled(TreeSelect)`

`