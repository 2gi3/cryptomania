import styles from './Smile.module.scss'
import { arc } from 'd3'

function Smile() {
  const mouthArc = arc()
    .innerRadius(90)
    .outerRadius(100)
    .startAngle(Math.PI / 2)
    .endAngle((Math.PI * 3) / 2)

  return (
    <div className={styles.smileContainer}>
      <svg width="300" height={300}>
        <g transform={` translate(${150}, ${150})`}>
          <circle
            r="140"
            fill="yellow"
            stroke="black"
            strokeWidth="10"
          ></circle>
          <circle cx="-60" cy="-70" r="20" fill="black"></circle>
          <circle cx="60" cy="-70" r="20" fill="black"></circle>
          <path d={mouthArc()} />
        </g>
      </svg>
    </div>
  )
}

export default Smile
