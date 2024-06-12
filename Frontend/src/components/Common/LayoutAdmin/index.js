import styled from "styled-components"

const LayoutStyled = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 0px 20px;
  .content {
    width: 100%;
  }
`
const LayoutAdminCommon = props => {
  return (
    <LayoutStyled>
      <div className="content" {...props}>
        {props?.children}
      </div>
    </LayoutStyled>
  )
}

export default LayoutAdminCommon
