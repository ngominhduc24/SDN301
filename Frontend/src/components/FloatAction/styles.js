import styled from "styled-components"
import { Space } from "antd"

export const FloatActionWrapper = styled(Space)`
  position: absolute;
  top: 0;
  height: 100%;
  right: 0;
  background-color: #e3f3fe;

  padding-left: 20px;
  padding-right: 15px;
  display: none;

  .ant-table-tbody > tr:hover {
    .float-action__wrapper {
      min-width: 80px;
      display: inline-flex;
    }
  }
`
