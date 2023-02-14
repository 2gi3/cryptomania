// @ts-nocheck

import React, { useState, useRef, useEffect } from 'react'
import * as d3 from 'd3'

function PairGraph2({ pair }) {
  const [graphData, setGraphData] = useState([
    { timestamp: 1676377194, last: 21843 },
    { timestamp: 1676377300, last: 21842 },
  ])

  const endpoint = pair.replace('/', '').toLowerCase()

  const svgRef = useRef(null)
  const margin = { top: 10, right: 30, bottom: 30, left: 60 }
  const width = 460 - margin.left - margin.right
  const height = 400 - margin.top - margin.bottom

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const res = await fetch(
        `https://cryptomania-draft-giuseppe.netlify.app/api/pairsData/${endpoint}`
      ).then((response) => response.json())
      setGraphData((prevGraphData) => {
        const newGraphData = [...prevGraphData, res].slice(-10)
        return newGraphData
      })
    }, 10000)

    return () => clearInterval(intervalId)
  }, [endpoint])

  useEffect(() => {
    const svg = d3.select(svgRef.current)

    const x = d3
      .scaleTime()
      .domain([
        d3.min(graphData, (d) => new Date(parseInt(d.timestamp))),
        d3.max(graphData, (d) => new Date(parseInt(d.timestamp))),
      ])
      .range([margin.left, width - margin.right])

    const y = d3
      .scaleLinear()
      .domain([
        d3.min(graphData, (d) => parseInt(d.last)),
        d3.max(graphData, (d) => parseInt(d.last)),
      ])
      .range([height - margin.bottom, margin.top])

    const xAxis = (g) =>
      g
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x))

    const yAxis = (g) =>
      g.attr('transform', `translate(${margin.left},0)`).call(d3.axisLeft(y))

    const line = d3
      .line()
      .x((d) => x(new Date(parseInt(d.timestamp))))
      .y((d) => y(parseInt(d.last)))

    svg
      .select('.x-axis')
      .transition()
      .duration(1000)
      .call(xAxis)
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('dx', '-.8em')
      .attr('dy', '.15em')
      .attr('transform', 'rotate(-65)')

    svg.select('.y-axis').transition().duration(1000).call(yAxis)

    svg
      .select('.line')
      .datum(graphData)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('d', line)
  }, [graphData, margin, width, height])

  return (
    <div>
      <svg ref={svgRef} width={width} height={height}>
        <g className="x-axis" />
        <g className="y-axis" />
        <path className="line" />
      </svg>
    </div>
  )
}

export default PairGraph2
