import styled from "styled-components"

export const TreeSelectWrapper = styled.div`
  .ant-select-selection-item-remove {
    display: ${props => (props?.isAll ? "none !important" : "flex")};
  }
  .ant-select {
    width: 100%;
    border-radius: 8px;
    background-color: #fff !important;
  }
  .anticon {
    display: flex;
    align-items: center;
  }
  .ant-select-selector {
    background: #fff !important;
  }
  .ant-select-disabled:where(
      .css-dev-only-do-not-override-14wwjjs
    ).ant-select:not(.ant-select-customize-input)
    .ant-select-selector {
    background-color: #f0f0f0;
    color: #333;
  }
  label {
    background-color: ${props => props.bgcolor || "#fff"} !important;
  }
  .ant-select-selection-placeholder {
    z-index: 1;
  }

  &.border-bottom-only {
    .ant-select-selector {
      border-radius: unset !important;
      border: unset !important;
      border-bottom: 1px solid #ddd !important;
    }
  }
`

export const FlWrapper = styled.div`
  position: relative;
  background: #fff;
  border-radius: 8px;
  &.border-bottom-only {
    .ant-input-affix-wrapper,
    .ant-input,
    .ant-input-number {
      border: unset !important;
      border-bottom: 1px solid #ddd !important;
      border-radius: unset !important;
      :focus,
      :hover {
        border-color: #d9d9d9;
      }
    }
  }
  &:hover {
    .fl-label {
      /* color: var(--color-primary); */
    }
  }
  .ant-input {
    height: 37px;
  }
  .ant-input:focus,
  .ant-input:hover {
    border-color: #d9d9d9;
  }
  .ant-input-search-with-button .ant-input {
    border-right: transparent;
  }
  .ant-input:focus {
    box-shadow: unset !important;
  }
  input {
    z-index: 3;
    /* background-color: #fff !important; */
  }

  .ant-btn-primary {
    color: #d9d9d9;
    border-color: unset;
    background: unset;
    text-shadow: unset;
    box-shadow: unset;
    /* height: 39px; */
  }

  .ant-input-group-addon {
    background-color: #ffffff;
  }

  .ant-input-search
    > .ant-input-group
    > .ant-input-group-addon:last-child
    .ant-input-search-button {
    border-radius: 0 8px 8px 0;
    padding-bottom: unset;
    height: 37px;
  }
  .ant-btn-primary:not(:disabled):hover {
    background-color: unset;
    border-color: #ddd;
  }

  .ant-input-search-button {
    justify-content: center;
    padding-top: 4px !important;
  }
  .ant-input-group-addon {
    border-radius: 8px !important;
  }
  .ant-select {
    z-index: 3;
    background-color: ${props =>
      props?.isfocus ? "#fff !important" : "transparent"};
  }
  .ant-select-selector {
    background-color: #fff !important;
    /* border: unset !important; */
    box-shadow: unset !important ;
    overflow: hidden;
  }
  .ant-select-disabled:where(
      .css-dev-only-do-not-override-14wwjjs
    ).ant-select:not(.ant-select-customize-input)
    .ant-select-selector {
    background-color: #f0f0f0;
    color: #333;
  }

  .ant-select-focused {
    box-shadow: unset !important ;
  }
  .ant-input-number {
    z-index: 3;
    background-color: transparent !important;
  }
  .ant-select-selection-search-input {
    height: 100% !important;
  }
  .ant-select-selection-search {
    padding-left: 10px;
    width: 100%;
    right: 0 !important;
    left: 0 !important;
  }
  .ant-input-affix-wrapper {
    /* border: unset !important; */
    align-items: center;
    background: transparent;
    padding: 0px 7px 0px 11px !important;
    height: 37px;
    :hover,
    :focus {
      background: transparent;
      border: 1px solid #d9d9d9;
      box-shadow: none;
    }
  }
  .ant-input-affix-wrapper-focused {
    border: 1px solid #d9d9d9;
    box-shadow: none;
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
  color: ${props => (props?.isFl ? "#000" : "#868e96")};
  z-index: 50;
  font-weight: normal;
  left: 10.8px;
  line-height: 10px;
  padding: 0 1px;
  background-color: #fff;
  pointer-events: none;

  &:focus {
    color: #0d99ff;
  }
  .redStar {
    color: red;
    margin-left: 5px;
  }
  &::after {
    content: " ";
    display: block;
    position: absolute;
    height: 5px;
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
