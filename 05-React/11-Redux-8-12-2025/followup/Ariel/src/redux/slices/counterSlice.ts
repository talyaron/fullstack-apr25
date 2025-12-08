
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
  value: number,
  text?: string
}

const initialState: CounterState = {
  value: 0,
  text: "Initial text"
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState, 

  reducers: { 
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
  
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer;