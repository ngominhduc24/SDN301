import React, { useEffect, useMemo } from "react"
import PropTypes from "prop-types"
import { Tooltip } from "antd"

import Button from "components/MyButton/Button"

import styles from "./styles.module.scss"

CardInfo.propTypes = {
  onClose: PropTypes.func,
  listButton: PropTypes.node,
  children: PropTypes.node,
  titleInfo: PropTypes.string,
  className: PropTypes.string,
}

CardInfo.defaultProps = {
  onClose: null,
  listButton: null,
  children: null,
  titleInfo: "",
  className: "",
}

export default function CardInfo(props) {
  const { listButton, onClose, children, titleInfo, className } = props

  useEffect(() => {
    const info = document.querySelector(`.${styles.info}`)
    const bottomFade = document.querySelector(`#bottom-fade-detail`)

    if (info) {
      bottomFade.style.display =
        info.scrollHeight - info.clientHeight > info.scrollTop
          ? "block"
          : "none"
      info.onscroll = e => {
        if (
          e.target.scrollHeight - e.target.clientHeight ===
          Math.round(e.target.scrollTop)
        )
          bottomFade.style.display = "none"
        else bottomFade.style.display = "block"
      }
    }
  }, [children])

  return (
    <div className={styles.cardWrapper}>
      <div className={styles.headerInfo}>
        <span className="title-info">
          {titleInfo}
          <span className="ml-24">{listButton}</span>
        </span>
        <span className={styles.btnClose}>
          <Tooltip placement="bottom" mouseLeaveDelay={0} title="Đóng">
            <Button
              btntype="btn-circle"
              shape="circle"
              iconName="remove"
              onClick={onClose}
            />
          </Tooltip>
        </span>
      </div>

      <div className={`scroll-zone ${styles.info}`} id="scroll-zone">
        {useMemo(
          () => (
            <div className={`scroll-zone ${className} ${styles.detailCard}`}>
              {children}
            </div>
          ),
          [children],
        )}
      </div>

      <div className={styles.bottomFade} id="bottom-fade-detail" />
    </div>
  )
}
