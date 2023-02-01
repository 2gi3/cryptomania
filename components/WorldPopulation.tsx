// @ts-nocheck

import { useState, useEffect } from 'react'
import { max, scaleBand, scaleLinear, format } from 'd3'
import { worldPopulationData } from '../types'
import useData from '../functions/useData'

const WorldPopulation = () => {
  const height = 300
  const margin = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20,
  }
  const innerHeightX = height - (margin.left + margin.right)
  const innerHeightY = height - (margin.top + margin.bottom)

  const data = useData(
    'https://gist.githubusercontent.com/2gi3/fb7be8ab47ce70df56e5de8315837692/raw/worldPopulation2022.csv'
  )

  if (!data) {
    return <pre>Loading...</pre>
  }

  const formatNumber = (n: number): string => {
    return format('.2s')(n).replace('G', 'B')
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
      <div>
        <svg width="310" height={height + 40}>
          <g>
            <text
              x={innerHeightX / 2}
              y={innerHeightY + 30}
              textAnchor="middle"
            >
              Population
            </text>
            {xScale.ticks(10).map((tickValue) => (
              <g
                key={tickValue}
                transform={`translate(${xScale(tickValue)},0)`}
              >
                <line y2={innerHeightY} stroke={'black'} />
                <text y={innerHeightY + 5} dy={'.71em'}>
                  {formatNumber(tickValue)}
                </text>
              </g>
            ))}
            {yScale.domain().map((tickValue) => (
              <text
                key={tickValue}
                x={-5}
                y={yScale(tickValue) + yScale.bandwidth() / 2}
                dy={'.32em'}
              >
                {tickValue}
              </text>
            ))}
            {data.map((d, i) => {
              const elem = (
                <rect
                  key={d['Country (or dependency)']}
                  x={0}
                  y={yScale(d['Country (or dependency)'])}
                  width={xScale(d['Population(2020)'])}
                  height={yScale.bandwidth()}
                  // height={20}
                >
                  <title>{formatNumber(d['Population(2020)'])}</title>
                </rect>
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
