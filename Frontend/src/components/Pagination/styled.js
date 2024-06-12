import styled from "styled-components"

export const PaginationStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background-color: #fff;
  padding: 8px 12px;
  margin-bottom: 8px;
  /* border-top: 1px solid #ddd; */
  border-radius: 0px 0px 8px 8px;
  position: fixed;
  .ant-pagination-simple,
  .ant-pagination-simple-pager,
  .ant-pagination-item-link {
    height: 37px !important;
    input {
      width: 50px !important;
    }
  }
  .ant-pagination-disabled {
    background-color: #f1f3f5;
  }
`
