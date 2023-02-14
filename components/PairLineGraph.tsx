import { LineGraphData, PairLineGraphProps } from '../types/types'
import { useState, useEffect, useRef } from 'react'

function PairLineGraph({ pair }: PairLineGraphProps) {
  const [graphData, setGraphData] = useState<LineGraphData>([
    { timestamp: 4567, last: 656 },
    { timestamp: 67, last: 66 },
  ])
  const endpoint = pair.replace('/', '').toLowerCase()

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const res = await fetch(`/api/pairsData/${endpoint}`).then((response) =>
        response.json()
      )
      setGraphData((prevGraphData) => {
        const newGraphData = [...prevGraphData, res].slice(-10)
        return newGraphData
      })
    }, 10000)

    return () => clearInterval(intervalId)
  }, [pair])

  return (
    <div>
      {graphData.map((data) => {
        return (
          <div>
            <p>{data.timestamp}</p>
            <p>{data.last}</p>
          </div>
        )
      })}
    </div>
  )
}

export default PairLineGraph
