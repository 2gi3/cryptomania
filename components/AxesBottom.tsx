// @ts-nocheck

import { csv, max, scaleBand, scaleLinear } from 'd3'

const AxesBottom = (tickValue, xScale) => {
  return (
    <>
      {/* {xScale.ticks(10).map((tickValue) => ( */}
      <g key={tickValue} transform={`translate(${xScale(tickValue)},0)`}>
        <line y2={300} stroke={'black'} />
        <text y={300 + 5} dy={'.71em'}>
          {tickValue}
        </text>
      </g>
      {/* ))} */}
    </>
  )
}

export default AxesBottom
