import styled from "styled-components"

export const StyleMyAccount = styled.div`
  background: #fff;

  .infor-box {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    margin-bottom: 16px;
  }
  .infor-box2 {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .title-infor {
    font-weight: 600;
    margin-right: 8px;
  }
  .camera-icon {
    position: absolute;
    bottom: 0;
    right: 0;
  }
  .money-now {
    font-size: 18px;
    font-weight: bold;
    color: #ff4d4f;
  }
  .btn-save {
    height: 56px !important;
    border-radius: 4px !important;

    padding: 18px 50px;
  }
  .btn-changepass {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    color: red;
    font-weight: 600;
    font-size: 12px;
  }
  .pass-info {
    display: flex;
    gap: 18px;
  }
  .my-account-title {
    display: flex;
    align-items: center;
    gap: 20px;
    .title-info {
      font-weight: 600;
      font-size: 24px;
      color: #154398;
    }
    .ant-btn {
      height: 42px !important;
      width: 127px !important;
      background: #ffffff;
      border: 1px solid #154398;
      border-radius: 4px !important;
      font-weight: 600;
      font-size: 16px;
      color: #154398;
    }
  }
  .field-title {
    font-weight: 600;
    font-size: 14px;
    line-height: 150%;
    color: #212529;
  }
  .div-avatar {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    border-left: 1px solid #dddddd;
    height: 80%;
  }
  .wrap-avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.4);
    margin-bottom: 12px;
  }
  .user-img-box {
    position: relative;
    width: 160px;
    height: 170px;
  }
  .user-avatar {
    width: 170px;
    height: 170px;
    border-radius: 50%;
    object-fit: cover;
    position: relative;
  }
  .ant-upload-list {
    display: none;
  }
  .upload-avatar {
    display: flex;

    width: 170px;
    height: 170px;
  }
  .sign-text {
    font-size: 12px;
    margin-top: 16px;
    line-height: 120%;
    color: #666666;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 5px;
  }

  .declaration-shadow-box {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 12px;
  }
`
