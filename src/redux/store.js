import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import basketReducer from './BasketSlice';
import favoriteItemsReducer from "./FavoriteItemsSlice"

export const store = configureStore({
  reducer: {
    userInfo: userReducer,  
    basketData: basketReducer,
    favoriteItemsData: favoriteItemsReducer
  },
});

