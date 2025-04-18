import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import  basketReducer  from './BasketSlice';

export const store = configureStore({
  reducer: {
    userInfo: userReducer,  
    basketData:basketReducer
  },
});

