import styled from "styled-components"
import bg_hop from "src/assets/images/test/bg_hop.png"

const LayoutStyled = styled.div`
  position: relative;
  .bg-hop-img {
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    background-image: url(${bg_hop});
    .bg-hop {
      background: #fffffff7;
    }
  }
`
const LayoutBackgroundCommon = props => {
  return (
    <LayoutStyled>
      <div className="bg-hop-img">
        <div className="bg-hop">{props?.children}</div>
      </div>
    </LayoutStyled>
  )
}

export default LayoutBackgroundCommon
