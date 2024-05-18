import styled from "styled-components"

export const LayoutAdminStyled = styled.div`
height: 100vh;
display: flex;
flex-direction: column;
.menu-container {
  border: 1px solid #ddd;
  margin-right: 12px;
  height: calc(100vh - 70px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.content-container {
  padding: 12px;
  overflow: scroll;
  height: calc(100vh - 70px);
  overflow-x: hidden;
}
.collapsed-menu {
  padding: 12px 20px;
}
`