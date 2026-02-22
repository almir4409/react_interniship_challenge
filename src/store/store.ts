import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './usersSlice'

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
})

// RootState = shape of the whole store
// AppDispatch = type of the dispatch function
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch