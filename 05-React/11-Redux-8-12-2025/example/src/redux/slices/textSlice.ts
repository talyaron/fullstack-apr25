
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface TextState { 
    text: string
}

const initialState: TextState = {
    text: "Hello, Redux!"
}

export const textSlice = createSlice({
    name: 'text',
    initialState,
    reducers: {
        updateText: (state, action: PayloadAction<string>) => {
            state.text = action.payload
        }
    }
})

export const { updateText } = textSlice.actions

export default textSlice.reducer;
