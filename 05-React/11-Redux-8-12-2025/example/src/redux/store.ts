import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slices/counterSlice'
import textReducer from './slices/textSlice'

export const store = configureStore({
  reducer: {
    // Add your reducers here
    counter: counterReducer,
    text: textReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState> // the type of the store
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch // the type of the dispatch function