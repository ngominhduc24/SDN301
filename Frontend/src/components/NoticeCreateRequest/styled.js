import styled from 'styled-components'

export const WrapNotice = styled.div`
  position: absolute;
  right: 20px;
  bottom: 20px;
  background-color: #69c0ff;
  color: #ffffff;
  box-shadow: 0px 2px 16px rgba(0, 0, 0, 0.24);
  width: max-content;
  max-width: 450px;
  min-width: 350px;
  padding: 20px 12px 12px;
  border-radius: 8px;
  z-index: 1200;

  .icon-close {
    position: absolute;
    top: 6px;
    right: 10px;
    cursor: pointer;
    font-size: 16px;
  }
  .ant-progress-text {
    color: #fff;
  }

  &.mobile {
    max-width: 350px;
    min-width: 300px;
  }
  &.done {
    background-color: #e5f5eb;
    color: #444444;
    .ant-progress-text {
      color: #389e0d;
    }
  }
`
