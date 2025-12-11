import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
  value: string
}

const initialState: CounterState = {
    value: 'user'
}

const nameSlice = createSlice({
  name: 'name',
  initialState,
  reducers: {
    changeName: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    },
    deleteName: (state) => {
      state.value = 'user'
    }
  }
});

export const {changeName, deleteName} = nameSlice.actions

export default nameSlice.reducer
//rxslice - code snippet to create a redux slice
