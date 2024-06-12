import styled from "styled-components"
const StatusWrapper = styled.div.attrs(props => {
  let color
  switch (props.statusId) {
    case 1:
      color = "#FF720D"
      break
    case 2:
      color = "#0D99FF"
      break
    case 3:
      color = "#00AEAC"
      break
    case 4:
      color = "#00C590"
      break
    default:
      color = "#6A7688"
  }
  return {
    color,
  }
})`
  padding: 4px 8px;
  border-radius: 65px;
  color: ${props => props.color};
  font-weight: 600;
  font-size: 13px;
  text-align: center;
  line-height: 12px;
  white-space: nowrap;
`
export default StatusWrapper
