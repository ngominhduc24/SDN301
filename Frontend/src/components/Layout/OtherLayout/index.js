import Footer from "src/components/Footer"
import MainHeader from "src/components/Header"
import styled from "styled-components"

const OtherLayoutContainer = styled.div`
background-color: #333;
`

const ContentStyled = styled.div`
max-width: 70%;
margin: auto;
`

const OtherLayout = ({ children }) => {
  return (
    <OtherLayoutContainer>
      <MainHeader />
      <ContentStyled>
        {children}
      </ContentStyled>
      <Footer />
    </OtherLayoutContainer >
  )
}

export default OtherLayout