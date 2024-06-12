/* eslint-disable react/no-danger */
import { CloseCircleOutlined } from '@ant-design/icons'
import { Progress } from 'antd'
import { WrapNotice } from './styled'

const NoticeCreateRequest = ({ handleNext = '' }) => {
  const percent = 100

  const IS_MOBILE = !!(window.innerWidth < 600)

  return (
    <WrapNotice
      className={`${IS_MOBILE ? 'mobile' : 'pc'} ${
        percent === 100 ? 'done' : ''
      }`}
    >
      <CloseCircleOutlined className="icon-close" />
      <div>
        <div style={{ marginBottom: 6 }}></div>
        <Progress
          percent={percent}
          status={percent === 100 ? 'success' : 'active'}
        />
      </div>
    </WrapNotice>
  )
}

export default NoticeCreateRequest

