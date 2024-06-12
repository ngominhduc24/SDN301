import React, { useState, useContext, useEffect } from 'react'
import { Tooltip } from 'antd'
import PropTypes from 'prop-types'

import { THEME_SETTING } from 'constants/constants'
import SvgIcon from 'src/components/SvgIcon'
import styles from './styles.module.scss'
import { isEmpty, truncate, uniq } from 'lodash'
import { getMsgClient } from 'lib/stringsUtils'

import cn from 'lib/classnames'
import { StoreContext } from 'lib/store'

Refresh.propTypes = {
  action: PropTypes.func,
  isRefresh: PropTypes.bool,
  errorSync: PropTypes.array
}

Refresh.defaultProps = {
  errorSync: []
}
const TIMER = 300

export default function Refresh({ isRefresh, onAction, focusTab, errorSync }) {
  const { ucStore } = useContext(StoreContext)
  const [ucObj] = ucStore
  const [counter, setCounter] = useState(1)

  useEffect(() => {
    if (!isRefresh) {
      clearInterval(countdown)
      const countdown = setInterval(() => {
        setCounter(c => {
          if (c === TIMER - 1) {
            clearInterval(countdown)
          }
          return c + 1
        })
      }, 1000)

      return () => {
        clearInterval(countdown)
      }
    } else {
      setCounter(1)
    }
  }, [isRefresh])

  useEffect(() => {
    if (counter === TIMER) {
      onAction()
    }
  }, [counter])

  useEffect(() => {
    if (focusTab && counter >= 59) {
      onAction()
    }
  }, [focusTab])

  const minute = Math.floor(counter / 60)

  const formatTimeRefresh = () => {
    if (counter <= 5) {
      return 'vừa xong'
    }
    if (counter >= 60) {
      return `${minute} phút trước`
    }
    return `${counter} giây trước`
  }

  const getCountDownTimer = () => {
    const distance = TIMER - counter
    const minutes = Math.floor(distance / 60)
    const seconds = Math.floor(distance % 60)
    return minutes ? `${minutes}:${seconds}s` : `${seconds}s`
  }

  const renderTitle = () => {
    const errorMSg = uniq(errorSync)
    return truncate(getMsgClient(errorMSg.join(',')), { length: 1000 })
  }

  return (
    <div
      className={
        ucObj?.theme?.color === THEME_SETTING.COLOR.GREEN
          ? `${styles.leftFlex} ${styles.leftFlexGreen} `
          : `${styles.leftFlex} ${styles.leftFlexBlue}`
      }
    >
      {!isEmpty(errorSync) && (
        <Tooltip title={renderTitle()} placement="bottom" overlayClassName={styles.tooltip}>
          <span>
            <SvgIcon name="t_warning_default" className={`${styles.errorSync} animateFlicker2s`} />
          </span>
        </Tooltip>
      )}
      <Tooltip title={`Tự động cập nhật sau ${getCountDownTimer()}`}>
        {isRefresh ? 'Đang cập nhật Danh sách WEC...' : `Cập nhật ${formatTimeRefresh()}`}
      </Tooltip>

      <Tooltip title="Bấm để Làm mới Danh sách WEC" placement="bottomLeft">
        <span>
          <SvgIcon
            name="refresh-blue"
            className={cn(styles.btnSync, {
              [styles.btnGreen]: ucObj?.theme?.color === THEME_SETTING.COLOR.GREEN,
              [styles.circleReset]: isRefresh
            })}
            onClick={e => {
              e.stopPropagation()
              onAction && onAction()
            }}
          />
        </span>
      </Tooltip>
    </div>
  )
}
