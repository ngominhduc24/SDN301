/* eslint-disable react/no-danger */
import { notification } from 'antd'
import { words } from 'lodash'

import { getMsgClient } from 'src/lib/stringsUtils'
import SvgIcon from '../SvgIcon'

export default function Notice(props) {
  const { msg, desc, place, isSuccess = true } = props
  const IS_MOBILE = !!(window.innerWidth < 600)

  const style = {
    maxWidth: IS_MOBILE ? '350px' : '450px',
    minWidth: IS_MOBILE ? '300px' : '320px',

    boxShadow: '0px 2px 16px rgba(0, 0, 0, 0.24)',
    borderRadius: '8px',
    background: isSuccess ? '#E5F5EB' : '#FCCED4',
    justifyContent: 'flex-start',
    display: 'flex',
    width: 'max-content'
  }

  notification.open({
    className: `notification-custom ${isSuccess ? 'success' : 'error'}`,
    style,
    placement: place || 'bottomRight',
    message: (
      <div
        dangerouslySetInnerHTML={{
          __html: getMsgClient(msg || '')
        }}
      />
    ),
    description: (
      <div
        dangerouslySetInnerHTML={{
          __html: getMsgClient(desc || '')
        }}
      />
    ),
    icon: isSuccess ? (
      <SvgIcon name="notice-success" />
    ) : (
      <SvgIcon name="notice-error" />
    ),
    duration: words(msg).length > 20 ? 2 : 3.5
  })
}
