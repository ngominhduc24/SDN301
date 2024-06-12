import styled from "styled-components"

export const StyleChangePassword = styled.div`
  min-height: calc(100vh - 155px);
  display: flex;
  justify-content: center;
  .content-wrap {
    margin-top: 10px;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 1px 1px 12px rgba(0, 0, 0, 0.1);
    padding: 40px 50px;
    width: 500px;
    height: fit-content;
  }
  .btn-login {
    width: 100%;
  }
  .title-form {
    text-transform: uppercase;
    color: ${({ theme }) => theme["primary-color"]};
  }
  .border-right-form {
    border-right: 2px solid ${({ theme }) => theme["primary-color"]};
  }
  .note {
    color: rgba(0, 0, 0, 0.49);
    margin-bottom: 4px;
    font-size: 13px;
  }
`
