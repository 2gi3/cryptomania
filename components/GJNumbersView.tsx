// @ts-nocheck
import { useState, useEffect, useContext } from 'react'
// import { Context } from "../../pages/index";
import GJNumberLabel from './GJNumberLabel'
import { useSelector, useDispatch } from 'react-redux'
import PairLineGraph from './PairLineGraph'

function SelectedInfo({ data }) {
  // const [selectedPair, setSelectedPair]: any = useContext(Context);
  const selectedPair = useSelector((state) => state.currency.selected)
  const [time, setTime] = useState()

  const targetPairData = data.filter((pair: any) => {
    pair.pair == selectedPair
    return pair.pair == selectedPair
  })
  const targetPairValues = Object.entries(targetPairData[0])
  const pair = targetPairValues.pop()
  const timestamp = targetPairValues.shift()
  let date = new Date(timestamp[1] * 1000)
  // console.log(timestamp)
  // console.log(date.toLocaleString())

  let prop: [string, number]

  useEffect(() => {
    setTime(date.toLocaleString())
  }, [selectedPair])

  return (
    <figure className="w-full flex flex-wrap justify-around">
      <h3 className="w-full text-center">Trading values for {selectedPair} </h3>
      <PairLineGraph pair={selectedPair} />
      <p className="w-full text-center mb-5">Last update: {time}</p>
      {targetPairValues.map((entry, index: number) => {
        prop = [entry[0], Number(entry[1])]
        return <GJNumberLabel key={`${entry}-${index}`} data={prop} />
      })}
    </figure>
  )
}
export default SelectedInfo
