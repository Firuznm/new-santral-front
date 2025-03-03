// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// import santral from '../Helpers/Helpers'
// import urls from '../ApiUrls/Urls'

// const initialState = {
//   user: {},
//   userToken:localStorage.getItem("token") || null,
//   isError:null
// }



// export const register = createAsyncThunk(
//   "register",
//   async (data, { rejectWithValue }) => {
//     try {
//       const resData = await santral.api().post(urls.register, JSON.stringify(data))
//       return resData.data
//     } catch (isError) {
//       return rejectWithValue(isError.response?.data || "Xəta var")
//     }
//   }
// )

// export const login = createAsyncThunk(
//   "login",
//   async (data, { rejectWithValue }) => {
//     try {
//       const resData = await santral.api().post(urls.login, JSON.stringify(data));
      
//       localStorage.setItem("token", resData?.data?.access_token);
//       const userT= resData?.data?.access_token;
//       return { user: resData.data, userToken: userT };
//     } catch (isError) {
//       return rejectWithValue(isError.response?.data || "Xəta var");
//     }
//   }
// );

// // **user login silinmesi**
// export const logout = createAsyncThunk("user/logout", async () => {
//   localStorage.removeItem("token");
//   return null
// })

// export const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {},
//   extraReducers:(builder)=>{
 
//     builder.addCase(register.fulfilled, (state,actions)=>{
//         state.user=actions.payload
//     })
//     builder.addCase(register.rejected, (state,actions)=>{
//       state.isError = actions.payload ?? actions.payload.isError
//   })
    
  
//   builder.addCase(login.fulfilled, (state, actions) => {
//     state.user = actions.payload.user;
//     state.userToken = actions.payload.userToken;
//   });
  
//   builder.addCase(login.rejected, (state,actions)=>{
//     state.isError = actions.payload ?? actions.payload.isError
// })

// .addCase(logout.fulfilled, (state) => {
//   state.user = {}; 
//   state.userToken = null; 
// });
//   }
// })


// export default userSlice.reducer



import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import santral from '../Helpers/Helpers';
import urls from '../ApiUrls/Urls';

const initialState = {
  user: {},
  userToken: localStorage.getItem("token") || null,
  isError: null,
  showOpenEnterSiteArea: false,
};

export const register = createAsyncThunk(
  "register",
  async (data, { rejectWithValue }) => {
    try {
      const resData = await santral.api().post(urls.register, JSON.stringify(data));
      return resData.data;
    } catch (isError) {
      return rejectWithValue(isError.response?.data || "Xəta var");
    }
  }
);

export const login = createAsyncThunk(
  "login",
  async (data, { rejectWithValue }) => {
    try {
      const resData = await santral.api().post(urls.login, JSON.stringify(data));
      localStorage.setItem("token", resData?.data?.access_token);
      return { user: resData.data, userToken: resData?.data?.access_token };

    } catch (isError) {
      return rejectWithValue(isError.response?.data || "Xəta var");
    }
  }
);

export const logout = createAsyncThunk("user/logout", async () => {
  localStorage.removeItem("token");
  return null;
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toggleShowEnterSiteArea: (state) => {
      state.showOpenEnterSiteArea = !state.showOpenEnterSiteArea;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, actions) => {
        state.user = actions.payload;
      })
      .addCase(register.rejected, (state, actions) => {
        state.isError = actions.payload ?? actions.payload.isError;
      })
      .addCase(login.fulfilled, (state, actions) => {
        state.user = actions.payload.user;
        state.userToken = actions.payload.userToken;
        state.showOpenEnterSiteArea = false
      })
      .addCase(login.rejected, (state, actions) => {
        state.isError = actions.payload ?? actions.payload.isError;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = {};
        state.userToken = null;
        state.showOpenEnterSiteArea = false; 
      });
  },
});

export const { toggleShowEnterSiteArea } = userSlice.actions;
export default userSlice.reducer;
