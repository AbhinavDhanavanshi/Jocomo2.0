import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = JSON.parse(localStorage.getItem('cart')) || [];

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            // Check if the item is already in the cart
            const existingItemIndex = state.findIndex(item => item.id === action.payload.id);
            if (existingItemIndex !== -1) {
                toast.error('Item is already in the cart');
                return;
            }
            state.push(action.payload);
            toast.success('Item added to cart');
            localStorage.setItem('cart', JSON.stringify(state)); // Update localStorage
        },
        deleteFromCart(state, action) {
            const updatedCart = state.filter(item => item.id !== action.payload.id);
            localStorage.setItem('cart', JSON.stringify(updatedCart)); // Update localStorage
            return updatedCart;
        }
    }
});

export const { addToCart, deleteFromCart } = cartSlice.actions;
export default cartSlice.reducer;
