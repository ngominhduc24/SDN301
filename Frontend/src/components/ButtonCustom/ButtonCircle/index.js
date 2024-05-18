import { Tooltip } from "antd"
import { ButtonCicleStyled } from "./styled"

const ButtonCircle = (props) => {
  return (
    <Tooltip
      title={props?.title}
      arrow={false}
    >
      <ButtonCicleStyled
        {...props}
      >
        {props?.children}
      </ButtonCicleStyled>
    </Tooltip>
  )
}

export default ButtonCircle