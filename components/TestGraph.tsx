//@ts-nocheck

import { useRef, useState, useEffect } from 'react'
import * as d3 from 'd3'
function TestGraph() {
  const [data] = useState([25, 50, 35, 15, 94, 10])
  const svgRef = useRef()

  useEffect(() => {
    //set up the svg
    const w = 400
    const h = 100
    const svg = d3
      .select(svgRef.current)
      .attr('width', w)
      .attr('height', h)
      .style('background', '#d3d3d3')
      .style('margin-top', '50')
      .style('overflow', 'visible')

    //set up the scaling
    const xScale = d3
      .scaleLinear()
      .domain([0, data.length - 1])
      .range([0, w])

    const yScale = d3.scaleLinear().domain([0, h]).range([h, 0])

    const generateScaledLine = d3
      .line()
      .x((d, i) => xScale(i))
      .y(yScale)
      .curve(d3.curveCardinal)

    //set the axes
    const xAxes = d3
      .axisBottom(xScale)
      .ticks(data.length)
      .tickFormat((i) => i + 1)

    const yAxes = d3.axisLeft(yScale).ticks(5)

    svg.append('g').call(xAxes).attr('transform', `translate(0, ${h})`)

    svg.append('g').call(yAxes)
    //set up the data
    svg
      .selectAll('.line')
      .data([data])
      .join('path')
      .attr('d', (d) => generateScaledLine(d))
      .attr('fill', 'none')
      .attr('stroke', 'black')
  }, [data])
  return (
    <div className="flex justify-center">
      <svg ref={svgRef}></svg>
    </div>
  )
}

export default TestGraph
