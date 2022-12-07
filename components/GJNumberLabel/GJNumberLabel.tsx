import styles from './GJNumberLabel.module.scss'

interface GJNumberLabel {
  data: [string, number]
}

function GJNumberLabel({ data }: GJNumberLabel) {
  return (
    <div className={styles.container}>
      {/* without interpolation the browser gives an error but not typescript */}
      <div className={styles.number}>{`${data[1]}`}</div>
      <div className={styles.label}>{data[0]}</div>
    </div>
  )
}

export default GJNumberLabel
