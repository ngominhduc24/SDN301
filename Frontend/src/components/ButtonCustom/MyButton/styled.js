import styled from "styled-components"
import { Button } from 'antd'

export const ButtomCustomStyled = styled(Button)`
  border-color: transparent !important;
  box-shadow: none !important;
  cursor: pointer;
  transition: transform 0.3s ease;
  transform-origin: center bottom;
  &:hover {
    border-color: transparent !important;
    box-shadow: none !important;
    transform: scale(1.05);
  }
  &:active {
    border-color: transparent !important;
    box-shadow: none !important;
  }
  &:focus {
    border-color: transparent !important;
    box-shadow: none !important;
  }
`