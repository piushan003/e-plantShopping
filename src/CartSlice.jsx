import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Array of cart items { name, image, description, cost, quantity }
  },
  reducers: {
    // Add item to cart
    addItem: (state, action) => {
      const plant = action.payload;
      const existingItem = state.items.find(item => item.name === plant.name);

      if (existingItem) {
        // If already in cart, increase quantity
        existingItem.quantity += 1;
      } else {
        // Add new item with quantity from payload (or default to 1)
        state.items.push({ ...plant, quantity: plant.quantity || 1 });
      }
    },

    // Remove item from cart
    removeItem: (state, action) => {
      const nameToRemove = action.payload.name;
      state.items = state.items.filter(item => item.name !== nameToRemove);
    },

    // Update quantity of a specific item
    updateQuantity: (state, action) => {
      const { name, amount } = action.payload;
      const itemToUpdate = state.items.find(item => item.name === name);

      if (itemToUpdate) {
        // Prevent quantity from being set to less than 1
        if (amount < 1) {
          state.items = state.items.filter(item => item.name !== name);
        } else {
          itemToUpdate.quantity = amount;
        }
      }
    },
  },
});

// Export actions
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

// Export reducer
export default CartSlice.reducer;
