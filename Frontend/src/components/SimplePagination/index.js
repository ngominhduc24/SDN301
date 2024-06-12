import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Pagination, Select } from 'antd'

const { Option } = Select

SimplePagination.propTypes = {
  total: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  pageSizeOptions: PropTypes.arrayOf(PropTypes.number),
  onChange: PropTypes.func,
  className: PropTypes.string
}

SimplePagination.defaultProps = {
  total: 0,
  pageSizeOptions: [10, 20, 50, 100, 200, 300, 500],
  onChange: () => {},
  className: ''
}

export default function SimplePagination(props) {
  const { total, pageSizeOptions, onChange, className, pageSize, current } = props
  const [pageSizeState, setPageSize] = useState(pageSize)
  const [currentState, setCurrent] = useState(current)

  useEffect(() => {
    const psInput = document.querySelector('.pagination-simple .ant-pagination-simple-pager input')
    psInput && psInput.addEventListener('blur', handleBlurInput)

    return () => {
      psInput && psInput.removeEventListener('blur', handleBlurInput)
    }
  }, [pageSizeState])

  const handleBlurInput = e => {
    setCurrent(prev => {
      if (e?.target?.value && parseInt(e?.target?.value) !== prev) {
        onChange(Number(e?.target?.value), Number(pageSizeState))
        return parseInt(e?.target?.value)
      }

      return prev
    })
  }

  if (!total || total === 0) return ''
  return (
    <div className={`d-flex align-items-center pagination-custom ${className}`}>
      <Select
        value={pageSizeState}
        // size="small"
        onChange={value => {
          setPageSize(value)
          setCurrent(1)
          onChange(1, Number(value))
        }}
      >
        {pageSizeOptions.map(size => (
          <Option value={size} key={size}>
            {size}
          </Option>
        ))}
      </Select>
      <Pagination
        simple
        className="pagination-simple"
        current={currentState}
        total={total}
        pageSize={pageSizeState}
        onChange={page => {
          setCurrent(page)
          onChange(Number(page), Number(pageSizeState))
        }}
      />
    </div>
  )
}
