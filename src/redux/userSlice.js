
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import santral from '../Helpers/Helpers';
import urls from '../ApiUrls/Urls';


const initialState = {
  user: {}, 
  authMeUser:{},
  catalogDatas: [],
  userToken: localStorage.getItem("token") || null,
  isLogin: !!localStorage.getItem("token"),
  bpUser: false,
  isError: null,
  showOpenEnterSiteArea: false,
};

   

export const getAllCatalogDatas = createAsyncThunk(
  "categoryData",
  async (_, { rejectWithValue }) => {
    try {
      const res = await santral.api().post(urls.catalog);
      return res.data.data
    } catch (isError) {
       return rejectWithValue(isError.response?.data || "Xəta var");
    }
  }
)

// user register 
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

// user auth me
export const authMe = createAsyncThunk(
  "authMe",
  async (_, { rejectWithValue }) => {
    try {
      const resData = await santral.api().get(urls.authMe);
      return resData.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response?.data || "xeta var ");
    }
  }
);   

// user login
export const login = createAsyncThunk(
  "login",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const resData = await santral.api().post(urls.login, JSON.stringify(data));
      localStorage.setItem("token", resData?.data?.access_token);
      dispatch(authMe());
      return { user: resData.data, userToken: resData?.data?.access_token};
    } catch (isError) {
      return rejectWithValue(isError.response?.data || "Xəta var");
    }
  }
);
 
// user logout 
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
    // register
      .addCase(register.fulfilled, (state, actions) => {
        state.user = actions.payload;
      })
      .addCase(register.rejected, (state, actions) => {
        state.isError = actions.payload ?? actions.payload.isError;
      })
      // category
      .addCase(getAllCatalogDatas.fulfilled, (state, actions) => {
        state.catalogDatas = actions.payload;
      })
      .addCase(getAllCatalogDatas.rejected, (state, actions) => {
        state.isError = actions.payload ?? actions.payload.isError;
      })
      // login
      .addCase(login.fulfilled, (state, actions) => {
        state.user = actions.payload.user;
        state.userToken = actions.payload.userToken;
        state.isLogin = true;
        state.showOpenEnterSiteArea = false
      })
      .addCase(login.rejected, (state, actions) => {
        state.isError = actions.payload ?? actions.payload.isError;
      })
      // logout
      .addCase(logout.fulfilled, (state) => {
        state.user = {};
        state.userToken = null;
        state.isLogin = false;
        state.bpUser = false;
        state.showOpenEnterSiteArea = false; 
      })
      // authMe
      .addCase(authMe.fulfilled, (state, actions) => {
        state.authMeUser = actions.payload;
        state.bpUser = actions.payload.position === 'bp_user';
      })
      .addCase(authMe.rejected, (state, actions) => {
        state.isError = actions.payload ?? actions.payload.isError;
        state.user = {};
        state.userToken = null;
        state.isLogin = false;
			localStorage.removeItem('token'); 
			window.location.href = '/login'; 
      })
  },
});

export const { toggleShowEnterSiteArea } = userSlice.actions;
export default userSlice.reducer;
