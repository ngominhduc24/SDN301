import React from "react"
import StatusWrapper from "./Styled"
const StatusLabel = ({ statusId, statusName }) => {
  return <StatusWrapper statusId={statusId}>{statusName}</StatusWrapper>
}

export default StatusLabel
