import { Badge, Input } from "antd"
import styled from "styled-components"

export const HeaderContainerStyled = styled.div`
  background-image: linear-gradient(to right, #ff7854 0%, #ff5079 100%);
  line-height: 90px;
  a {
    color: black;
  }
`

export const HeaderStyled = styled.div`
  max-width: 80%;
  margin: auto;
`
export const ImageStyled = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`

export const InputHeaderStyled = styled(Input)`
  background-color: white;
  width: 400px;
  border-color: transparent;
  border-radius: 12px;
  &:hover {
    border-color: white !important;
  }
  &:focus-within {
    border-color: white !important;
  }
  .ant-input {
    background-color: #242424;
    margin-left: 8px;
    color: white;
  }
  .ant-input::placeholder {
    color: #999 !important;
  }
  .ant-input:focus {
    caret-color: black;
  }
`

export const BadgeStyled = styled(Badge)`
  .ant-badge,
  .ant-badge-count {
    position: absolute;
    top: 0;
    inset-inline-end: 0;
    transform: translate(0%, -50%);
    transform-origin: 100% 0%;
  }
`

export const NotificationItemStyled = styled.div`
/* background-color: ; */
`
