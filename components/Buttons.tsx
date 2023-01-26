// @ts-nocheck
import { useEffect, useState, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectPair } from '../redux/currency'
// import { Context } from "../../pages/index";

function Buttons({ pairs }) {
  // const [selectedPair, setSelectedPair] = useContext(Context);
  // const selectedPair = useSelector((state) => state.currency.selected);
  const dispatch = useDispatch()

  useEffect(() => {
    // console.log(pairs)
  }, [])
  return (
    <>
      <h1>displaying only the first 15 buttons for now</h1>
      {pairs.map((pair: any, index: number) =>
        index < 15 ? (
          <button
            key={`${pair.name}-${index}`}
            onClick={() => {
              dispatch(selectPair(pair.name))
            }}
          >
            {pair.name}
          </button>
        ) : null
      )}
    </>
  )
}
export default Buttons
