import { createSlice } from '@reduxjs/toolkit';

const basketFromLocalStorage = () => {
  let basket = localStorage.getItem("basket");
  if (basket) {
    return JSON.parse(basket);
  } else {
    return [];
  }
};

const storeInLocalStorage = (data) => {
  localStorage.setItem("basket", JSON.stringify(data));
};

const initialState = {
  baskets: basketFromLocalStorage(),
};

export const basketSlice = createSlice({
  name: 'baskets',
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      const quantityToAdd = Number(action.payload.quantity) || 1;
      const isItemBasket = state.baskets.find(item => item.id === action.payload.id);

      if (isItemBasket) {
        const updatedBasket = state.baskets.map(item => {
          if (item.id === action.payload.id) {
            return {
              ...item,
              quantity: item.quantity + quantityToAdd,
            };
          }
          return item;
        });

        state.baskets = updatedBasket;
        storeInLocalStorage(state.baskets);
      } else {
        const newItem = {
          ...action.payload,
          quantity: quantityToAdd,
        };

        state.baskets.push(newItem);
        storeInLocalStorage(state.baskets);
      }
    },

    incrementQuantity: (state, action) => {
      const updatedBasket = state.baskets.map(item => {
        if (item.id === action.payload.id && item.quantity < item.stock) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });

      state.baskets = updatedBasket;
      storeInLocalStorage(state.baskets);
    },

    decrementQuantity: (state, action) => {
      const updatedBasket = state.baskets.map(item => {
        if (item.id === action.payload.id && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });

      state.baskets = updatedBasket;
      storeInLocalStorage(state.baskets);
    },

    removeFromCart: (state, action) => {
      const updatedBasket = state.baskets.filter(item => item.id != action.payload.id);
      state.baskets = updatedBasket;
      storeInLocalStorage(state.baskets)
    },

    clearBaskets: (state) => {
      state.baskets = []
      storeInLocalStorage(state.baskets)
    }
  },
});

export const { addToBasket, incrementQuantity, decrementQuantity, removeFromCart, clearBaskets } = basketSlice.actions;

export default basketSlice.reducer;
