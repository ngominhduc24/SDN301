import { Spin } from "antd"
import LoadingOverlay from "src/components/LoadingOverlay"

export default function SpinCustom(props) {
  const { className } = props

  const spinIcon = <LoadingOverlay isLoadingTable sizeSmall />

  return <Spin {...props} className={className} indicator={spinIcon} />
}
