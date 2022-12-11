import styles from './worldPopulation.module.scss'
import { useState, useEffect } from 'react'
import { csv, max, scaleBand, scaleLinear } from 'd3'

//https://gist.githubusercontent.com/2gi3/fb7be8ab47ce70df56e5de8315837692/raw/worldPopulation2022.csv

export interface worldPopulationData {
  '#': string
  'Country (or dependency)': string
  'Population(2020)': string
  YearlyChange: string
  NetChange: string
  'Density(P/Km²)': string
  'Land Area(Km²)': string
  'Migrants(net)': string
  'Fert.Rate': string
  'Med.Age': string
  'UrbanPop %': string
  WorldShare: string
}
const WorldPopulation = () => {
  const [data, setData] = useState<worldPopulationData[] | null>(null)
  const height = 300
  const margin = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20,
  }
  const innerHeightX = height - (margin.left + margin.right)
  const innerHeightY = height - (margin.top + margin.bottom)

  const row = (d) => {
    d['Population(2020)'] = +d['Population(2020)']
    return d
  }
  useEffect(() => {
    csv(
      'https://gist.githubusercontent.com/2gi3/fb7be8ab47ce70df56e5de8315837692/raw/worldPopulation2022.csv',
      row
    )
      .then((d) => setData(d.slice(0, 10)))
      .then(console.log(data))
  }, [])
  let a
  if (!data) {
    return <pre>Loading...</pre>
  }

  const yScale = scaleBand()
    .domain(data.map((d) => d['Country (or dependency)']))
    .range([0, innerHeightY])

  const xScale = scaleLinear()
    .domain([0, max(data, (d) => d['Population(2020)'])])
    .range([0, innerHeightX])

  return (
    <>
      <h2>World population</h2>
      <div className={styles.populationContainer}>
        <svg width="310" height={height}>
          <g className={styles.graph}>
            {xScale.ticks(10).map((tickValue) => (
              <g
                key={tickValue}
                transform={`translate(${xScale(tickValue)},0)`}
              >
                <line y2={innerHeightY} stroke={'black'} />
                <text
                  className={styles.xAxes}
                  y={innerHeightY + 5}
                  dy={'.71em'}
                >
                  {tickValue}
                </text>
              </g>
            ))}
            {yScale.domain().map((tickValue) => (
              <text
                key={tickValue}
                className={styles.yAxes}
                x={-5}
                y={yScale(tickValue) + yScale.bandwidth() / 2}
                dy={'.32em'}
              >
                {tickValue}
              </text>
            ))}
            {data.map((d, i) => {
              //   const yScale = scaleBand()
              //     .domain(data.map((d) => d['Country (or dependency)']))
              //     .range([0, 300 - (margin.top + margin.bottom)])

              //   const xScale = scaleLinear()
              //     .domain([0, max(data, (d) => d['Population(2020)'])])
              //     .range([0, 300 - (margin.left + margin.right)])

              const elem = (
                <rect
                  key={d['Country (or dependency)']}
                  x={0}
                  y={yScale(d['Country (or dependency)'])}
                  width={xScale(d['Population(2020)'])}
                  height={yScale.bandwidth()}
                  // height={20}
                />
              )

              return elem
            })}
          </g>
        </svg>
        {/* <svg width="300" height={300}>
          {data.map((d, i) => (
            <p key={i}>{d['Country (or dependency)']}</p>
          ))}
        </svg> */}
      </div>
    </>
  )
}
export default WorldPopulation
