import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'

// Configure store with reducers
export const store = configureStore({
  reducer: {
    auth: authReducer,
    // Add other reducers here as needed
  }
})

// Export types for TypeScript
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
