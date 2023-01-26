import { createSlice } from '@reduxjs/toolkit'

export const pairSlice = createSlice({
    name: 'currency',
    initialState: {
      selected: 'BTC/USD'
    },
    reducers: {
      selectPair: (state, action) => {
        state.selected = action.payload
      }
    }
  })

  
export const {selectPair} = pairSlice.actions

export default pairSlice.reducer