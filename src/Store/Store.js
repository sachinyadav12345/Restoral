import { configureStore } from '@reduxjs/toolkit'
import postResto from '../RestoSlice/RestoSlice'
export const store = configureStore({
    reducer: {
        RestoData : postResto
    },
  })

