import { useState, useEffect } from 'react'
import { csv, max, extent, scaleBand, scaleLinear, format } from 'd3'
import { IrisType, Species } from '../../types'
import styles from './scatterPlot.module.scss'

const ScatterPlot = () => {
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
    ;(d.sepal_length = +d.sepal_length),
      (d.sepal_width = +d.sepal_width),
      (d.petal_length = +d.petal_length),
      (d.petal_width = +d.petal_length)
    return d
  }

  useEffect(() => {
    csv(
      'https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/iris.csv',
      row
    ).then((res) => setData(res))
    //   .then((res) => console.log(res))
  }, [])
  console.log(data)

  if (!data) {
    return <pre>Loading...</pre>
  }

  const xValue = (d) => d.sepal_length
  const xAxisLable = 'Sepal Length'

  const yValue = (d) => d.sepal_width
  const yAxisLable = 'Sepal Width'

  const xScale = scaleLinear()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice()

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([0, innerHeightY])

  return (
    <>
      Scatter plot
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
            {xScale.ticks(10).map((tickValue) => (
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
                  {tickValue}
                </text>
              </g>
            ))}
            {yScale.ticks().map((tickValue) => (
              <g transform={`translate(0,${yScale(tickValue)})`}>
                <line x2={innerWidth} stroke={'black'} />
                <text
                  key={tickValue}
                  className={styles.yAxes}
                  x={-5}
                  //   y={yScale(tickValue)}
                  dy={'.32em'}
                >
                  {tickValue}
                </text>
              </g>
            ))}
            {data.map((d, i) => {
              const elem = (
                <circle
                  key={i}
                  cx={xScale(xValue(d))}
                  cy={yScale(yValue(d))}
                  r={10}
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

export default ScatterPlot
