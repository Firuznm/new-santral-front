import { createSlice } from '@reduxjs/toolkit';


const basketFromLocalStorage = () => {
    let basket = localStorage.getItem("basket")

    if (basket) {
        return JSON.parse(localStorage.getItem("basket"))
    } else {
        return []
    }
}
 
const storeInLocalStorage = (data) => {
    localStorage.setItem("basket", JSON.stringify(data))
}

const initialState = {
  baskets: basketFromLocalStorage()
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
}

}

 
});

export const { addToBasket } = basketSlice.actions;
export default basketSlice.reducer;
