import { useState, useEffect } from 'react'
import { csvParse, arc, pie } from 'd3'
import { NamedColorsType } from '../../types'
import styles from './namedColors.module.scss'

const NamedColors = () => {
  const [data, setData] = useState<NamedColorsType[] | null>(null)
  const pieArc = arc().innerRadius(0).outerRadius(150)
  const colorPie = pie().value(1)

  useEffect(() => {
    fetch(
      'https://gist.githubusercontent.com/2gi3/c18f1c121ddd85d6171323559bf1a0f4/raw/CSSNamedColors.csv'
    )
      .then((res) => res.text())
      .then((text) => {
        const Data = csvParse(text)
        let message: any = ''
        message = message + (text.length / 1024).toFixed(1) + 'kb\n'
        message = message + Data.length + 'rows\n'
        message = message + Data.columns.length + 'columns\n'
        console.log(message)
        setData(Data)
      })
  }, [])
  console.log(data)
  if (!data) {
    return <pre>Loading...</pre>
  }
  return (
    <>
      <h2>CSS named colors</h2>
      <div className={styles.colorsContainer}>
        <svg width="300" height={300}>
          <g>
            {colorPie(data).map((d, i) => (
              <path key={i} fill={d.data.RGBHexValue} d={pieArc(d)} />
            ))}
            {/* {data.map((d, i) => (
            <path
              fill={d.RGBHexValue}
              d={pieArc({
                startAngle: (i / data.length) * 2 * Math.PI,
                endAngle: ((i + 1) / data.length) * 2 * Math.PI,
              })}
            />
          ))} */}
          </g>
        </svg>
      </div>
    </>
  )
}
export default NamedColors
