import styled from "styled-components"

export const MeetingConfirmationStyle = styled.div`
  min-height: 90vh;
  .box-infor {
    border: 0.5px solid #ccc;
    padding: 8px;
    height: 100%;
  }
`

export const TabsStyled = styled.div`
  /* ${({ theme }) => theme["primary-color"]} */
  .hover-red {
    :hover {
      color: #f0383e;
    }
  }
  .ant-tabs-content-holder {
    padding: 0px 0px;
  }
  .bread-crumb-tab-news {
    margin-top: 0px;
    margin-bottom: 15px;
    .ant-breadcrumb-link,
    .ant-breadcrumb-separator {
      color: #fff;
      font-weight: 400;
      opacity: 1;
      font-size: 14px;
    }
  }
  .see-more-2 {
    position: absolute;
    top: -50px;
    right: 0px;
    cursor: pointer;
  }

  .see-more-3 {
    position: absolute;
    top: 0px;
    right: 0px;
    cursor: pointer;
  }
  .see-more {
    position: absolute;
    top: 20px;
    right: 0px;
    cursor: pointer;
  }
  .ant-tabs-tab-active {
    /* background: #f8f8f8; */
  }
  .ant-tabs-tab {
    padding: ${({ isMobile }) => (!!isMobile ? "4px 8px" : "8px 16px")};
    margin: 0px !important;
  }
  .ant-tabs-tab-btn {
    font-weight: 600;
    font-size: ${({ isMobile }) => (!!isMobile ? "13px" : "15px")};
    line-height: 120%;
    text-align: center;
    text-shadow: unset !important;
    color: #154398;
    /* @media only screen and (min-width: 600px) {
      font-size: 22px;
    }
    @media only screen and (min-width: 550px) {
      font-size: 18px;
    } */
  }
  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #ee1d23;
  }
  .ant-tabs-ink-bar {
    height: 3px !important;
    background: linear-gradient(90deg, #154297 0%, #ed1e24 100%);
  }
`
