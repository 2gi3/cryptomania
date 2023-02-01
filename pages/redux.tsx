//@ts-nocheck

import React from 'react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment, incrementByAmount } from '../redux/counter'

function Counter() {
  //   const [count, setCount] = useState(0);
  const { count } = useSelector((state) => state.counter)
  const dispatch = useDispatch()
  return (
    <div>
      <h1 className="flex justify-center max-w-xs"> The count is {count} </h1>
      <div className="flex justify-between max-w-xs">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={() => {
            dispatch(increment())
          }}
        >
          Increment
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={() => {
            dispatch(decrement())
          }}
        >
          decrement
        </button>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        onClick={() => {
          dispatch(incrementByAmount(11))
        }}
      >
        Increment by 11
      </button>
    </div>
  )
}

export default Counter
