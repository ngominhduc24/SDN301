import { Tooltip } from 'antd'
import { useEffect, useState } from 'react'
import SvgIcon from 'src/components/SvgIcon'
import cn from 'src/lib/classnames'
import styles from './styles.module.scss'

const ArrowIcon = ({ onClick, className, props, classNameTooltip, arrowDefault }) => {
  const [arrowUp, setArrowUp] = useState(false)

  useEffect(() => {
    setArrowUp(arrowDefault)
  }, [arrowDefault])

  return (
    <Tooltip {...props} title={arrowUp ? 'Thu gọn' : 'Mở rộng'} className={classNameTooltip} mouseLeaveDelay={0}>
      <span className={`${className} ${styles.arrowIcon}`}>
        <SvgIcon
          name="arrow_down"
          onClick={e => {
            e.stopPropagation()
            setArrowUp(prev => !prev)
            if (onClick) onClick(e)
          }}
          className={cn('u-pointer hp-100', {
            [styles.buttonReadMoreRevert]: arrowUp
          })}
        />
      </span>
    </Tooltip>
  )
}

export default ArrowIcon
