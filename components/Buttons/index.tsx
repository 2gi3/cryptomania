import styles from './buttons.module.scss'
import { useEffect, useState, useContext } from 'react'
import { Context } from '../../pages/index'

function Buttons({ pairs }) {
  const [selectedPair, setSelectedPair] = useContext(Context)
  useEffect(() => {
    // console.log(pairs)
  }, [])
  return (
    <>
      <h1 className={styles.title}>
        displaying only the first 15 buttons for now
      </h1>
      {pairs.map((pair: any, index: any) =>
        index < 15 ? (
          <button
            key={`${pair.name}-${index}`}
            onClick={() => {
              setSelectedPair(pair.name)
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
