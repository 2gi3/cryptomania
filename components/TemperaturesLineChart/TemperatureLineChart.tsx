import { useState, useEffect } from 'react'
import {
  csv,
  max,
  curveNatural,
  extent,
  line,
  scaleLinear,
  timeFormat,
} from 'd3'
import { IrisType, Species } from '../../types'
import styles from './temperatureLineChart.module.scss'

const TemperatureLineChart = () => {
  const [data, setData] = useState<IrisType[] | null>(null)

  const height = 300
  const margin = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20,
  }
  const innerWidth = height - (margin.left + margin.right)
  const innerHeightY = height - (margin.top + margin.bottom)

  const row = (d) => {
    d.sepal_length = +d.temperature
    d.timestamp = new Date(d.timestamp)
    return d
  }

  useEffect(() => {
    csv(
      'https://gist.githubusercontent.com/curran/90240a6d88bdb1411467b21ea0769029/raw/week_temperature_sf.csv',
      row
    ).then((res) => setData(res))
    //   .then((res) => console.log(res))
  }, [])

  if (!data) {
    return <pre>Loading...</pre>
  }

  const xValue = (d) => d.timestamp
  const xAxisLable = 'Time'

  const yValue = (d) => d.temperature
  const yAxisLable = 'Temperature'

  const xScale = scaleLinear()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice()

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([innerHeightY, 0])

  return (
    <>
      Iris
      <div className={styles.populationContainer}>
        <svg width="310" height={height + 40}>
          <g className={styles.graph}>
            <text x={innerWidth / 2} y={innerHeightY + 40} textAnchor="middle">
              {xAxisLable}
            </text>
            <text
              transform={`translate(-30, ${innerWidth / 2}) rotate(-90)`}
              textAnchor="middle"
            >
              {yAxisLable}
            </text>
            {xScale.ticks().map((tickValue) => (
              <g
                key={tickValue}
                transform={`translate(${xScale(tickValue)},0)`}
              >
                <line y2={innerHeightY} stroke={'black'} />
                <text
                  className={styles.xAxes}
                  y={innerHeightY + 15}
                  dy={'.71em'}
                >
                  {timeFormat('%a')(tickValue)}
                </text>
              </g>
            ))}
            {yScale.ticks().map((tickValue) => (
              <g
                key={tickValue}
                transform={`translate(0,${yScale(tickValue)})`}
              >
                <line x2={innerWidth} stroke={'black'} />
                <text
                  className={styles.yAxes}
                  x={-5}
                  //   y={yScale(tickValue)}
                  dy={'.32em'}
                >
                  {tickValue}
                </text>
              </g>
            ))}
            <path
              fill="none"
              stroke="black"
              //css stroke-linejoin: round;
              //css stroke-linecap: round;
              d={line()
                .x((d) => xScale(xValue(d)))
                .y((d) => yScale(yValue(d)))
                .curve(curveNatural)(data)}
            />
            {data.map((d, i) => {
              const elem = (
                <circle
                  key={i}
                  cx={xScale(xValue(d))}
                  cy={yScale(yValue(d))}
                  r={2}
                  // height={20}
                >
                  {/* <title>{formatNumber(d['Population(2020)'])}</title> */}
                </circle>
              )

              return elem
            })}
          </g>
        </svg>
      </div>
    </>
  )
}

export default TemperatureLineChart
