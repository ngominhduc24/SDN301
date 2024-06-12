import styled from "styled-components"

const LayoutStyled = styled.div`
  display: flex;
  justify-content: center;
  max-width: 1300px;
  /* width: auto; */
  margin: auto;
  height: 100%;
  padding: 0px 20px;
  .content {
    width: 100%;
  }
  .Ez:after {
    left: 24px !important;
    background: none !important;
  }
  .WP:after {
    right: 24px !important;
    background: none !important;
  }
`
const LayoutCommon = props => {
  return (
    <LayoutStyled>
      <div className="content" {...props}>
        {props?.children}
      </div>
    </LayoutStyled>
  )
}

export default LayoutCommon
