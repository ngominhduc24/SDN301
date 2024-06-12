import styled from "styled-components"

export const Styled = styled.div`
  .ant-picker {
    height: 37px;
  }
  .ant-picker-focused {
    box-shadow: unset;
  }
  &.border-bottom-only {
    .ant-picker {
      border: unset !important;
      border-bottom: 1px solid #ddd !important;
      border-radius: unset !important;
      :focus,
      :hover {
        border-color: #d9d9d9;
      }
    }
    label {
      background-color: transparent !important;
    }
  }
`
