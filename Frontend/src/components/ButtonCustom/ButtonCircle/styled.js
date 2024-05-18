import { Button } from "antd"
import styled from "styled-components"

export const ButtonCicleStyled = styled(Button)`
  border-color: transparent !important;
  transition: transform 0.3s ease !important;
  transform-origin: center bottom !important;
  &:hover {
    border-color: transparent !important;
    transform: scale(1.05);
  }
`