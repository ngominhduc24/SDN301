import React from 'react'
import { ModalWrapper } from './styled'
import PropTypes from 'prop-types'
import cn from 'src/lib/classnames'
import styles from './styles.module.scss'

CustomModal.propTypes = {
  tilteStart: PropTypes.bool,
  className: PropTypes.string
}

CustomModal.defaultProps = {
  tilteStart: true,
  className: ''
}

export default function CustomModal(props) {
  const { children, className, tilteStart } = props

  return (
    <ModalWrapper
      width={1180}
      {...props}
      className={cn(className, { [styles.titleFlexStart]: tilteStart })}
      maskTransitionName=""
    >
      {children}
    </ModalWrapper>
  )
}
