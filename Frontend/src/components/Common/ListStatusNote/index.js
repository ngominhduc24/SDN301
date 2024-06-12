import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles.module.scss'

ListStatusNote.propTypes = {
  listStatus: PropTypes.array,
}

ListStatusNote.defaultProps = {
  listStatus: [],
}

export default function ListStatusNote(props) {
  const { listStatus } = props

  return listStatus.map((item) => (
    <div key={item.id} className={styles.noteStatus}>
      <div className={styles.box} style={{ background: item.color }} />
      {item.label}
    </div>
  ))
}
