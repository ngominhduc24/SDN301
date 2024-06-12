import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles.module.scss'
import { Tooltip } from 'antd'

Pill.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  titleTooltip: PropTypes.string,
}

Pill.defaultProps = {
  text: '',
  titleTooltip: '',
  color: '#27AE60',
}

export default function Pill(props) {
  const { text, color, titleTooltip } = props
  return (
    <Tooltip placement="bottomLeft" title={titleTooltip} overlayClassName={styles.tooltipPill}>
      <div className={styles.chip} style={{ backgroundColor: color }}>
        {text}
      </div>
    </Tooltip>
  )
}
