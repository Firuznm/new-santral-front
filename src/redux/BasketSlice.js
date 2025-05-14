import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import santral from '../Helpers/Helpers';
import urls from '../ApiUrls/Urls';

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
  localBaskets: basketFromLocalStorage(),
  apiBaskets:[]
};
 
export const apiAddToBasket = createAsyncThunk(
  'basket/apiAddToBasket',
  async ({ productId, count }, { rejectWithValue }) => {
    try {
      const resData = await santral.api().post(urls.apiAddToBasket, {
        product: productId,
        count: count || 1,
      });
      return resData.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

export const GetAllApiBaskets = createAsyncThunk(
  'basket/ApiBaskets',
  async (_, { rejectWithValue }) => {
    try {
      const res = await santral.api().post(urls.apiGetAllBasket);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);



export const basketSlice = createSlice({
  name: 'localBaskets',
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      const quantityToAdd = Number(action.payload.count) || 1;
      const isItemBasket = state.localBaskets.find(item => item.id === action.payload.id);

      if (isItemBasket) {
        const updatedBasket = state.localBaskets.map(item => {
          if (item.id === action.payload.id) {
            return {
              ...item,
              count: item.count + quantityToAdd,  
            };
          }
          return item;
        });

        state.localBaskets = updatedBasket;
        storeInLocalStorage(state.localBaskets);
      } else {
        const newItem = {
          ...action.payload,
          count: quantityToAdd,
        };

        state.localBaskets.push(newItem);
        storeInLocalStorage(state.localBaskets);
      }
    },

    incrementCount: (state, action) => {
      const updatedBasket = state.localBaskets.map(item => {
        if (item.id === action.payload.id && item.count < item.stock) {
          return { ...item, count: item.count + 1 };
        }
        return item;
      });

      state.localBaskets = updatedBasket;
      storeInLocalStorage(state.localBaskets);
    },

    decrementCount: (state, action) => {
      const updatedBasket = state.localBaskets.map(item => {
        if (item.id === action.payload.id && item.count > 1) {
          return { ...item, count: item.count - 1 };
        }
        return item;
      });

      state.localBaskets = updatedBasket;
      storeInLocalStorage(state.localBaskets);
    },

    removeFromCart: (state, action) => {
      const updatedBasket = state.localBaskets.filter(item => item.id != action.payload.id);
      state.localBaskets = updatedBasket;
      storeInLocalStorage(state.localBaskets)
    },

    clearBaskets: (state) => {
      state.localBaskets = []
      storeInLocalStorage(state.localBaskets)
    }

  },  
    extraReducers: (builder) => {
    builder
       .addCase(GetAllApiBaskets.fulfilled, (state, action) => {
        state.apiBaskets = action.payload;
      })
      .addCase(GetAllApiBaskets.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { addToBasket, incrementCount, decrementCount, removeFromCart, clearBaskets } = basketSlice.actions;

export default basketSlice.reducer;
