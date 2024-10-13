import { configureStore } from '@reduxjs/toolkit' 
import CartSlice from './CartSlice'

const store = configureStore({
  reducer: {
    // Add
    cart: CartSlice
  },
  devTools:true
})

export default store;