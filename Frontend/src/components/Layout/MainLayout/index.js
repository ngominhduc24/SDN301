import MainHeader from "../../Header";
import styled from "styled-components";
import Footer from "../../Footer";
const MainHeaderContainerStyled = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ContentStyled = styled.div`
  width: 80%;
  margin: auto;
  background-color: white;
`;

const MainLayout = ({ children }) => {
  return (
    <MainHeaderContainerStyled>
      {/* <MainHeader /> */}
      <ContentStyled>{children}</ContentStyled>
      {/* <Footer /> */}
    </MainHeaderContainerStyled>
  );
};

export default MainLayout;
