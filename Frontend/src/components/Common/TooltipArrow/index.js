import { Tooltip } from "antd"
import { useCallback, useContext, useEffect, useRef, useState } from "react"

import { debounce, truncate } from "lodash"
import cn from "src/lib/classnames"
import { decodeHtml } from "src/lib/stringsUtils"

import ArrowIcon from "src/components/Common/ArrowIcon"
import { StoreContext } from "src/lib/store"
import styles from "./styles.module.scss"

export default function TooltipArrow(props) {
  const {
    lineClamp,
    overlayClassName,
    children,
    title,
    truncateNumber = 1000,
    lineWidth,
    maxWidth,
    keepHtml,
    styleWrapper,
    onShowTooltip,
    onShow,
    isShowMT = false,
    showFullContent,
    customTitle = undefined,
    arrow = false,
  } = props
  const { collapsedStore } = useContext(StoreContext)
  const [collapsed] = collapsedStore
  const tooltipContentRef = useRef(null)
  const textHtml = title?.replaceAll("\n", "<br>")

  const [showTooltip, setShowTooltip] = useState(false)
  const [isShow, setShow] = useState(false)

  const callBackResize = useCallback(
    debounce(() => updateSize(), 100),
    [],
  )

  useEffect(() => {
    const timer1 = setTimeout(callBackResize, 100)
    return () => {
      clearTimeout(timer1)
    }
  }, [collapsed, title])

  const updateSize = () => {
    setShowTooltip(
      tooltipContentRef.current?.scrollHeight >
        tooltipContentRef.current?.clientHeight ||
        tooltipContentRef?.current?.scrollWidth >
          tooltipContentRef?.current?.clientWidth,
    )
  }

  useEffect(() => {
    if (showTooltip) {
      setShow(showFullContent)
    }
  }, [showFullContent])

  useEffect(() => {
    if (!showFullContent) {
      if (onShowTooltip) onShowTooltip(showTooltip)
    }
  }, [showTooltip])

  useEffect(() => {
    if (onShow) onShow(showTooltip && isShow)
  }, [isShow])

  const renderTitle = text =>
    keepHtml ? (
      <div
        dangerouslySetInnerHTML={{
          __html: text,
        }}
      />
    ) : (
      truncate(decodeHtml(text), { length: truncateNumber })
    )

  const style = {
    ...styleWrapper,
    textOverflow: "ellipsis",
    overflow: "hidden",
  }

  return (
    <div style={style}>
      <style global="true" jsx="true">{`
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
        overlayStyle={{ maxWidth: 400 }}
        {...props}
        title={
          customTitle
            ? customTitle()
            : !isShow && lineClamp > 0 && renderTitle(textHtml)
        }
        className={
          !isShow
            ? `${styles.truncateMultiline} line-clamp-custom line-clamp-${lineClamp}`
            : styles.showFull
        }
        overlayClassName={cn(`${overlayClassName} custom-tooltip`, {
          "d-none": !showTooltip,
        })}
        autoAdjustOverflow
      >
        <div ref={tooltipContentRef}>
          <span className={styles.tooltipContent}>{children}</span>
        </div>
      </Tooltip>

      {isShowMT && showTooltip && (
        <ArrowIcon
          onClick={() => {
            setShow(!isShow)
          }}
          className={`arrow-mt-content ${styles.buttonReadMore}`}
          arrowDefault={arrow}
        />
      )}
    </div>
  )
}
