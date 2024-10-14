import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = JSON.parse(localStorage.getItem('cart')) || [];

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            state.push(action.payload);
            toast.success(`${action.payload.name} added to cart!`);
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
