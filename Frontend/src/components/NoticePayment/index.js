import { StyledNotice } from "./styled"

function NoticePayment(props) {
  setTimeout(() => {
    props?.handleCancel()
  }, 3000)

  return (
    <StyledNotice>
      <div
        className="js-container container mt-120px"
        style={{ top: "0px !important" }}
      ></div>
      <div
        style={{
          textAlign: "center",
          marginTop: "120px",
          position: "fixed",
          width: "100%",
          height: "100%",
          top: "0px",
          left: "0px",
        }}
      >
        <div className="checkmark-circle">
          <div className="background"></div>
          <div className="checkmark draw"></div>
        </div>
        <h1 className="message-sucess">Bạn vừa nạp tiền thành công !</h1>
      </div>
      {props?.children}
    </StyledNotice>
  )
}

export default NoticePayment
