import React from 'react'
import { Modal } from 'antd'
import PropTypes from 'prop-types'
import SvgIcon from 'src/components/SvgIcon'
import get from 'lodash/get'

import styles from './styles.module.scss'

SignResultModal.propTypes = {
  className: PropTypes.string,
  isOpen: PropTypes.bool,
  onCancel: PropTypes.func,
  detailInfo: PropTypes.object
}

SignResultModal.defaultProps = {
  className: '',
  isOpen: true,
  onCancel: () => {},
  detailInfo: {
    Code: 'HĐ00755',
    Account: 'Nguyễn Văn A',
    Date: '25/07/2021'
  }
}

export default function SignResultModal(props) {
  const { className, isOpen, onCancel, detailInfo } = props

  const renderTitleAndValue = (title, value, fontNormal = false) => {
    return (
      <>
        <span className={`text-left ${styles.titleContent}`}>{title}:</span>
        {<span className={fontNormal ? styles.titleContent : styles.valueContent}>{value}</span>}
      </>
    )
  }

  return (
    <Modal
      width={700}
      visible={isOpen}
      destroyOnClose
      maskClosable={false}
      onCancel={onCancel}
      className={`modal-orange ${className} ${styles.titleFlexStart}`}
      maskTransitionName=""
      title="Thông báo kết quả ký Hồ sơ"
      footer={null}
    >
      <div className={styles.wapper}>
        <SvgIcon name="sign_success" />
        <div>
          <div className={styles.title}>Ký Hồ sơ điện tử thành công</div>
          <div className={styles.detail}>
            {renderTitleAndValue('Mã Hồ sơ', get(detailInfo, 'Code'))}
            {renderTitleAndValue('Người ký', get(detailInfo, 'Account'))}
            {renderTitleAndValue('Thời gian ký', get(detailInfo, 'Date'))}
          </div>
          <div className={styles.info}>
            Các thông tin Hồ sơ được lưu trữ tại trang myaccount của quý khách. Vui lòng truy cập{' '}
            <a href="http://www.myaccountvndirect.com.vn/" target="_blank" rel="noreferrer" className={styles.linkInfo}>
              www.myaccountvndirect.com.vn
            </a>{' '}
            để tra cứu lúc cần.
          </div>
        </div>
      </div>
    </Modal>
  )
}
