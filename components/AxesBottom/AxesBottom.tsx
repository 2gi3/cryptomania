import styles from './axesBottom.module.scss'
import { csv, max, scaleBand, scaleLinear } from 'd3'

const AxesBottom = (tickValue, xScale) => {
  return (
    <>
      {/* {xScale.ticks(10).map((tickValue) => ( */}
      <g key={tickValue} transform={`translate(${xScale(tickValue)},0)`}>
        <line y2={300} stroke={'black'} />
        <text className={styles.xAxes} y={300 + 5} dy={'.71em'}>
          {tickValue}
        </text>
      </g>
      {/* ))} */}
    </>
  )
}

export default AxesBottom
