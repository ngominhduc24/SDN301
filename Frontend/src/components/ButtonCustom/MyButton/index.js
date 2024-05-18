import { ButtomCustomStyled } from "./styled"
import '../button.scss'

const ButtonCustom = (props) => {
  return (
    <ButtomCustomStyled
      {...props}
    >
      {props?.children}
    </ButtomCustomStyled>
  )
}

export default ButtonCustom