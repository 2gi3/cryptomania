// @ts-nocheck

import styles from './GJNumberLabel.module.scss'

function GJNumberLabel({ data }) {
  return (
    <div className={styles.container}>
      <div className={styles.number}>{data[1]}</div>
      <div className={styles.label}>{data[0]}</div>
    </div>
  )
}

export default GJNumberLabel
