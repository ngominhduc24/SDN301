import React from 'react'
import PropTypes from 'prop-types'

import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { getImageBase64 } from 'constants/constants'

import styles from './styles.module.scss'

BasicProfile.propTypes = {
  info: PropTypes.shape({
    account: PropTypes.string,
    fullName: PropTypes.string,
    department: PropTypes.string,
    avatar: PropTypes.string,
  }),
}

BasicProfile.defaultProps = {
  info: {},
}

export default function BasicProfile(props) {
  const { info } = props

  return (
    <div className={styles.cardWrapper}>
      <Avatar src={getImageBase64(info?.avatar)} icon={<UserOutlined />} size={64} alt="avatar" />
      <div className={styles.info}>
        <span className={styles.name}>
          {info?.account} - {info?.fullName}
        </span>
        {info?.department?.split(';').map((item, idx) => {
          return (
            <span key={idx} className={styles.position}>
              {item}
            </span>
          )
        })}
      </div>
    </div>
  )
}
