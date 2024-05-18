import ButtonCustom from "src/components/ButtonCustom/MyButton"
import { ModalCustomStyled } from "./styled"

// const Footer = ({ handleSubmit, loading }) => {
//   return (
//     <div>
//       <div className="d-flex-end mb-8">
//         <ButtonCustom
//           loading={loading}
//           onClick={() => handleSubmit()}
//           className="haflLarge normal fw-700">
//           Lưu
//         </ButtonCustom>
//       </div>
//       <div className="text fs-12 fw-600 d-flex-start">
//         Bằng cách tiếp tục, bạn đồng ý cho phép Spotify truy cập vào hình ảnh bạn đã chọn để tải lên. Vui lòng đảm bảo bạn có quyền tải lên hình ảnh.
//       </div>
//     </div>
//   )
// }

const ModalCustom = (props) => {
  // const { footer, ...remainProps } = props
  return (
    <ModalCustomStyled
      {...props}
    >
      {props?.children}
    </ModalCustomStyled>
  )
}

export default ModalCustom