
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import santral from '../Helpers/Helpers';
import urls from '../ApiUrls/Urls';

const initialState = {
  user: {},
  authMeUser:{},
  userToken: localStorage.getItem("token") || null,
  isError: null,
  showOpenEnterSiteArea: false,
};


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
// user login
export const login = createAsyncThunk(
  "login",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const resData = await santral.api().post(urls.login, JSON.stringify(data));
      localStorage.setItem("token", resData?.data?.access_token);
      dispatch(authMe())
      return { user: resData.data, userToken: resData?.data?.access_token };
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
      // login
      .addCase(login.fulfilled, (state, actions) => {
        state.user = actions.payload.user;
        state.userToken = actions.payload.userToken;
        state.showOpenEnterSiteArea = false
      })
      .addCase(login.rejected, (state, actions) => {
        state.isError = actions.payload ?? actions.payload.isError;
      })
      // logout
      .addCase(logout.fulfilled, (state) => {
        state.user = {};
        state.userToken = null;
        state.showOpenEnterSiteArea = false; 
      })
      // authMe
      .addCase(authMe.fulfilled, (state, actions) => {
        state.authMeUser = actions.payload;
      })
      .addCase(authMe.rejected, (state, actions) => {
        state.isError = actions.payload ?? actions.payload.isError;
        state.user = {};
			state.userToken = null;
			localStorage.removeItem('token'); 
			window.location.href = '/login'; 
      })
  },
});

export const { toggleShowEnterSiteArea } = userSlice.actions;
export default userSlice.reducer;
