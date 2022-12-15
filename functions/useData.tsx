import { useState, useEffect } from 'react'
import { csv } from 'd3'
import { worldPopulationData } from '../types'

const row = (d: any[]): worldPopulationData[] => {
  d['Population(2020)'] = +d['Population(2020)']
  return d
}

const useData = (URL: string) => {
  const [data, setData] = useState<worldPopulationData[] | null>(null)

  useEffect(() => {
    csv(URL, row)
      .then((d: worldPopulationData[]) => setData(d.slice(0, 10)))
      .then(console.log(data))
  }, [])

  return data
}

export default useData
