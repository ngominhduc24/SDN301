import styled from "styled-components"

export const FlWrapper = styled.div`
  position: relative;
  background: white;
  border-radius: 8px;

  &:hover {
    .fl-label {
      /* color: var(--color-primary); */
    }
  }

  .ant-select {
    z-index: 3;
  }

  .ant-select-selector {
    background-color: transparent !important;
  }

  input {
    z-index: 3;
    background-color: transparent !important;
  }

  .ant-input-number {
    z-index: 3;
    background-color: transparent !important;
    width: 100% !important;
    border-radius: 8px !important;
  }
  .ant-input-number-input {
    height: 37px !important;
  }
  .ant-select-selection-search-input {
    height: 100% !important;
  }

  .ant-select-selection-search {
    width: 100%;
    right: 0 !important;
    left: 0 !important;

    input {
      padding: 0 11px !important;
    }
  }

  .ant-picker {
    padding: 0;

    input {
      height: 100%;
      padding: 9.5px 11px;
      width: 100%;
    }

    .ant-picker-suffix {
      position: absolute;
      right: 10px;
    }

    .ant-picker-clear {
      right: 10px;
      z-index: 4;
    }
  }
`

export const Label = styled.span`
  position: absolute;
  cursor: text;
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
  top: ${props => (props?.isFl ? "-7px" : "38%")};
  font-size: ${props => (props?.isFl ? "12px" : "14px")};
  color: ${props => (props?.isFl ? "#212121" : "#868e96")};
  z-index: ${props => (props?.isFl ? 3 : 1)};
  /* font-weight: ${props => (props?.isFl ? "600" : "normal")}; */
  left: 10.8px;
  line-height: 10px;
  padding: 0 1px;
  background-color: transparent;

  .redStar {
    color: red;
    margin-left: 5px;
  }

  &::after {
    content: " ";
    display: block;
    position: absolute;
    background-color: ${props => props.bgcolor};
    height: 4px;
    top: 40%;
    left: -0.1em;
    right: -0.2em;
    z-index: -1;
  }
`

export const RedStar = styled.span`
  color: red;
  margin-left: 5px;
`
