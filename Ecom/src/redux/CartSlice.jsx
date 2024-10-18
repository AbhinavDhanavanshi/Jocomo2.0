import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = JSON.parse(localStorage.getItem('cart')) || [];

const customToastSuccess = (message) => {
    // Show the toast with the message passed as input
    const toastId = toast.success(message, {
      autoClose: false, // Keep the toast open until it's dismissed by the user
      closeOnClick: false, // Prevent closing when clicking the toast itself
    });
  
    // Add a slight delay before attaching the click event listener
    setTimeout(() => {
      const handleClick = () => {
        toast.dismiss(toastId); // Close the toast
        document.removeEventListener("click", handleClick); // Remove listener after toast is dismissed
      };
  
      document.addEventListener("click", handleClick);
    }, 200); // 200ms delay
  };
  
  const customToastError = (message) => {
    // Show the toast with the message passed as input
    const toastId = toast.error(message, {
      autoClose: false, // Keep the toast open until it's dismissed by the user
      closeOnClick: false, // Prevent closing when clicking the toast itself
    });
  
    // Add a slight delay before attaching the click event listener
    setTimeout(() => {
      const handleClick = () => {
        toast.dismiss(toastId); // Close the toast
        document.removeEventListener("click", handleClick); // Remove listener after toast is dismissed
      };
  
      document.addEventListener("click", handleClick);
    }, 200); // 200ms delay
  };

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            // Check if the item is already in the cart
            const existingItemIndex = state.findIndex(item => item.id === action.payload.id);
            if (existingItemIndex !== -1) {
                customToastError('Item is already in the cart');
                return;
            }
            state.push(action.payload);
            customToastSuccess('Item added to cart');
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
