// @ts-nocheck
import { useEffect, useState, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectPair } from '../redux/currency'
// import { Context } from "../../pages/index";

function Buttons({ pairs }) {
  const selectedPair = useSelector((state) => state.currency.selected)
  const dispatch = useDispatch()
  const [toggle, setToggle] = useState('hidden')
  const [value, setValue] = useState(selectedPair)
  const [src, setSrc] = useState('')
  const oninput = (e) => {}

  return (
    <div>
      <input
        type="text"
        placeholder="search"
        onChange={(e) => setSrc(e.target.value)}
      />
      <div className="flex flex-wrap max-h-320 w-44 overflow-y-scroll">
        <ul>
          {pairs
            .filter((pair) => {
              if (src === '') {
                return pair
              } else if (
                pair.name.toLowerCase().includes(src.toLocaleLowerCase())
              ) {
                return pair
              }
            })
            .map((pair: any, index: number) => (
              <li>
                <button
                  // className="pairButton"
                  className="dropdown-item
              text-sm
              py-2
              px-4
              font-normal
              block
              w-full
              whitespace-nowrap
              bg-transparent
              text-gray-700
              hover:bg-gray-100"
                  key={`${pair.name}-${index}`}
                  onClick={() => {
                    dispatch(selectPair(pair.name))
                  }}
                >
                  {pair.name}
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}
export default Buttons
