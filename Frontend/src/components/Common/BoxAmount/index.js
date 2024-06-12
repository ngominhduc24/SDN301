import React from 'react'
import PropTypes from 'prop-types'

import styles from 'components/Common/BoxAmount/styles.module.scss'

BoxAmount.propTypes = {
  title: PropTypes.string.isRequired,
  amount: PropTypes.number,
  children: PropTypes.node,
  className: PropTypes.string,
}

BoxAmount.defaultProps = {
  amount: 0,
  children: null,
  className: '',
}

export default function BoxAmount(props) {
  const { title, amount, children, className } = props
  return (
    <div className={`${className} ${styles.card}`}>
      <div className={styles.title}>
        {title}
        {!!amount && `: ${amount}`}
      </div>
      {children}
    </div>
  )
}
