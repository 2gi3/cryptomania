import { LineGraphData, PairLineGraphProps } from '../types/types'
import { useState, useEffect } from 'react'

function PairLineGraph({ pair }: PairLineGraphProps) {
  const [graphData, setGraphData] = useState<LineGraphData>()
  const endpoint = pair.replace('/', '').toLowerCase()

  useEffect(() => {
    fetch(`/api/pairsData/${endpoint}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [pair])
  return (
    <div>
      <h1>{pair}</h1>
      <h3>kjh</h3>
    </div>
  )
}

export default PairLineGraph
