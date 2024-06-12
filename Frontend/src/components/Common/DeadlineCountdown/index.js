import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Statistic } from 'antd'
import isArray from 'lodash/isArray'
import isEmpty from 'lodash/isEmpty'

const { Countdown } = Statistic

DeadlineCountdown.propTypes = {
  deadline: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  countDownNumber: PropTypes.number,
  countDownType: PropTypes.oneOf(['hours', 'minutes', 'seconds']),
  className: PropTypes.string,
  onTimeOut: PropTypes.func,
}

DeadlineCountdown.defaultProps = {
  countDownNumber: 0,
  countDownType: 'minutes',
  className: '',
  onTimeOut: () => {},
  deadline: moment(),
}

export default function DeadlineCountdown(props) {
  const {
    countDownType,
    deadline,
    countDownNumber,
    className,
    onTimeOut,
  } = props
  const extractTime = () => {
    if (isEmpty(deadline)) {
      onTimeOut()
      return moment()
    }
    const moments = isArray(deadline)
      ? deadline.map((item) => moment(item))
      : deadline
    const minDate = isEmpty(moments) ? null : moment.min(moments)

    return moment(isArray(deadline) ? minDate : deadline).add(
      countDownNumber,
      countDownType
    )
  }

  return (
    <Countdown
      {...props}
      value={extractTime()}
      format="m phút ss giây"
      onFinish={onTimeOut}
      className={`countdown ${className}`}
    />
  )
}
