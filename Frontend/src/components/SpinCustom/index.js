import { Spin } from "antd"
import { LoadingOutlined } from '@ant-design/icons'

const SpinCustom = (props) => {
  return (
    <Spin
      {...props}
      indicator={
        <LoadingOutlined
          style={{
            color: '#FF5079'
          }}
          spin
        />
      }
    />
  )
}

export default SpinCustom