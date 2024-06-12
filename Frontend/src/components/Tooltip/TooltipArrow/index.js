import React, { useRef, useState, useEffect } from 'react'
import { Tooltip } from 'antd'

import styles from './styles.module.scss'
import cn from 'src/lib/classnames'
import { decodeHtml } from 'src/lib/stringsUtils'
import { truncate } from 'lodash'

import SvgIcon from 'src/components/SvgIcon'

export default function TooltipArrow(props) {
  const {
    lineClamp,
    overlayClassName,
    children,
    title,
    truncateNumber,
    lineWidth,
    maxWidth,
    keepHtml,
    styleWrapper,
    isShow,
    setShow
  } = props

  const tooltipContentRef = useRef(null)

  const [showTooltip, setShowTooltip] = useState(false)

  useEffect(() => {
    if (isShow) setShowTooltip(60 < tooltipContentRef.current.clientHeight)
    else
      setShowTooltip(
        tooltipContentRef.current.scrollHeight >
          tooltipContentRef.current.clientHeight
      )
  }, [])

  const renderTitle = text =>
    keepHtml ? (
      <div
        dangerouslySetInnerHTML={{
          __html: text
        }}
      />
    ) : (
      truncate(decodeHtml(text), { length: truncateNumber })
    )

  let style = { ...styleWrapper, textOverflow: 'ellipsis', overflow: 'hidden' }

  return (
    <div style={style}>
      <style global jsx>{`
        .line-clamp-${lineClamp} {
          -webkit-line-clamp: ${lineClamp};
        }
        .line-width-${lineWidth} {
          width: ${lineWidth}px;
        }
        .custom-tooltip {
          max-width: ${maxWidth}px;
        }
      `}</style>
      <Tooltip
        placement="right"
        {...props}
        title={!isShow && lineClamp > 0 && renderTitle(title)}
        className={
          !isShow
            ? `${styles.truncateMultiline} line-clamp-${lineClamp}`
            : styles.showFull
        }
        overlayClassName={cn(`${overlayClassName} custom-tooltip`, {
          'd-none': !showTooltip
        })}
        autoAdjustOverflow={true}
      >
        <div ref={tooltipContentRef}>
          <span className={styles.tooltipContent}>{children}</span>
        </div>
      </Tooltip>

      {showTooltip && (
        <Tooltip title={isShow ? 'Thu gọn' : 'Mở rộng'}>
          <div
            className={`arrow-mt-content-wec ${styles.buttonReadMore} ${
              isShow ? styles.buttonReadMoreRevert : ''
            }`}
          >
            <SvgIcon
              name="arrow_down"
              onClick={e => {
                e.stopPropagation()
                setShow(!isShow)
              }}
            />
          </div>
        </Tooltip>
      )}
    </div>
  )
}

