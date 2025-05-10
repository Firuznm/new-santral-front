import { createSlice } from "@reduxjs/toolkit";

const FavoriteItemsFromLocalStorege = () => {
  let favoriteItems = localStorage.getItem("favoriteItems");
  if (favoriteItems) {
    return JSON.parse(favoriteItems);
  } else {
    return [];
  }
};

const favoriteItemsInLocalStorage = (data) => {
  localStorage.setItem("favoriteItems", JSON.stringify(data));
};

const initialState = {
  favoriteItemsList: FavoriteItemsFromLocalStorege(),
};

export const FavoriteItemsSlice = createSlice({
  name: "favoriteItems",
  initialState,
  reducers: {
toggleFavoriteItem: (state, action) => {
  const item = action.payload;
  const exists = state.favoriteItemsList.some(i => i.id === item.id);

  state.favoriteItemsList = exists
    ? state.favoriteItemsList.filter(i => i.id !== item.id)
    : [...state.favoriteItemsList, item];

  favoriteItemsInLocalStorage(state.favoriteItemsList);
},

    removeAllFavoriteItems: (state) => {
      state.favoriteItemsList = []
      favoriteItemsInLocalStorage(state.favoriteItemsList)
    }
  },
});

export const { toggleFavoriteItem, removeAllFavoriteItems} = FavoriteItemsSlice.actions;
export default FavoriteItemsSlice.reducer;
