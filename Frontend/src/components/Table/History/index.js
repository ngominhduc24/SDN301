import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'

import styles from './styles.module.scss'

HistoryTable.propTypes = {
  tableData: PropTypes.array,
  columnsData: PropTypes.array,
  loading: PropTypes.bool,
  className: PropTypes.string,
  scroll: PropTypes.shape({
    x: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    y: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  })
}

HistoryTable.defaultProps = {
  tableData: [],
  columnsData: [],
  loading: false,
  className: '',
  scroll: null
}

export default function HistoryTable(props) {
  const { tableData, loading, className, scroll, columnsData, rowKey } = props

  return (
    <div className={styles.tableApprovedWec}>
      <Table
        columns={columnsData}
        dataSource={tableData}
        loading={loading}
        pagination={false}
        className={`table-custom-1 ${className}`}
        rowClassName={styles.rowTable}
        scroll={scroll || (tableData.length > 10 && { y: 500 })}
        tableLayout="auto"
        rowKey={rowKey}
      />
    </div>
  )
}
