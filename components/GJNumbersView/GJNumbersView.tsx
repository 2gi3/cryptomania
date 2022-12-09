import styles from './GJNumbersView.module.scss'
import { useState, useEffect, useContext } from 'react'
import { Context } from '../../pages/index'
import GJNumberLabel from '../GJNumberLabel/GJNumberLabel'

function SelectedInfo({ data }) {
  const [selectedPair, setSelectedPair]: any = useContext(Context)
  const targetPairData = data.filter((pair: any) => {
    pair.pair == selectedPair
    return pair.pair == selectedPair
  })
  const targetPairValues = Object.entries(targetPairData[0])
  useEffect(() => {
    targetPairValues.pop()
  })

  let prop: [string, number]

  return (
    <figure className={styles.selectedPairsValue}>
      <h3>Trading values for {selectedPair} </h3>
      {targetPairValues.map((entry, index: number) => {
        prop = [entry[0], Number(entry[1])]
        return <GJNumberLabel key={`${entry}-${index}`} data={prop} />
      })}
    </figure>
  )
}
export default SelectedInfo
