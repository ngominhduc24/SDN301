import styled from 'styled-components'

export const TableTextWrapper = styled.div`
  .ant-table-cell-scrollbar {
    display: none;
  }
  .ant-table-wrapper {
    border-radius: 12px;
  }
  .ant-table-container table > thead > tr:first-child th:first-child {
    border-top-left-radius: 11px;
  }
  .ant-table-container table > thead > tr:first-child th:last-child {
    border-top-right-radius: 11px;
  }

  tr.drop-over-downward td {
    border-bottom: 2px dashed #1890ff !important;
  }

  tr.drop-over-upward td {
    border-top: 2px dashed #1890ff !important;
  }

  .ant-table-tbody > tr > td {
    border-bottom: 1px solid #c5ced9;
    padding: 5px 16px !important;
  }

  .ant-table-wrapper {
    box-shadow: none;
  }

  .ant-table-wrapper .ant-table .ant-table-tbody > tr.ant-table-row:hover {
    box-shadow: none;
  }

  .ant-table .ant-table-thead > tr > th:first-child {
    padding: 10px 16px;
  }

  .ant-table-container table > tbody > tr:last-child td {
    border-bottom: none !important;
  }

  .ant-table-thead > tr > th {
    font-weight: 600;
  }

  border: 1px solid #c5ced9;
  border-radius: 12px;
`
