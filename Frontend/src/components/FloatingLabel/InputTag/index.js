import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles.module.scss'

FlInput.propTypes = {
  label: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node
}

FlInput.defaultProps = {
  isRequired: false,
  className: '',
  children: null
}

export default function FlInput(props) {
  const dataProps = { ...props }
  const { label, isRequired, className, children } = props
  delete dataProps.label
  delete dataProps.className
  delete dataProps.isRequired

  return (
    <div className={`${className} ${styles.fieldWrapper}`}>
      {children}
      {!!label && (
        <label className="label-input-floating">
          {label}
          {isRequired && <span className="red-star">*</span>}
        </label>
      )}
    </div>
  )
}
