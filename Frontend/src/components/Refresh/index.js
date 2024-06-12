import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import SvgIcon from "../SvgIcon"

const Styled = styled.div`
  cursor: pointer;
  background: #f7f7f7;
  /* border */

  border: 1px solid #dddddd;
  border-radius: 4px;
  padding: 8px;
  display: flex;
  align-items: center;
  .text {
    color: #212529;
    margin-right: 6px;
  }
`
const Refresh = ({ time = 300, handleRefresh }) => {
  const TIMER = time
  const timeout = useRef(null)
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    startInterval()
    return () => clearInterval(timeout.current)
  }, [])

  useEffect(() => {
    if (counter === TIMER) onRefresh()
  }, [counter])

  const onRefresh = e => {
    e?.stopPropagation()
    startInterval()
    setCounter(0)
    handleRefresh && handleRefresh()
  }

  const startInterval = () => {
    clearInterval(timeout.current)
    timeout.current = setInterval(() => {
      setCounter(e => e + 1)
    }, 1000)
  }

  const getCountDownTimer = () => {
    const distance = TIMER - counter
    const minutes = Math.floor(distance / 60)
    const seconds = Math.floor(distance % 60)
    return minutes ? `${minutes}:${seconds}s` : `${seconds}s`
  }

  return (
    <Styled onClick={onRefresh}>
      <div className="text">Cập nhật lại sau: {getCountDownTimer()}</div>
      <SvgIcon name="refresh-icon" />
    </Styled>
  )
}

export default Refresh
