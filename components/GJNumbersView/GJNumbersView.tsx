import styles from './GJNumbersView.module.scss'
import { useState, useContext } from 'react'
import { Context } from '../../pages/index'
import GJNumberLabel from '../GJNumberLabel/GJNumberLabel'

function SelectedInfo({ data }) {
  const [selectedPair, setSelectedPair]: any = useContext(Context)
  // const [selectedPair, setSelectedPair] = useState('BTC/USD')
  const targetPairData = data.filter((pair: any) => {
    pair.pair == selectedPair
    return pair.pair == selectedPair
  })
  const targetPairValues = Object.entries(targetPairData[0])
  const title: any = targetPairValues.pop()

  return (
    <figure className={styles.selectedPairsValue}>
      <h3>Trading values for {title[1]} </h3>
      {targetPairValues.map((entry, index) => (
        <GJNumberLabel key={`${entry}-${index}`} data={entry} />
      ))}
    </figure>
  )
}
export default SelectedInfo
