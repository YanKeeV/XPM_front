import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUser, updateUser } from '../api/userApi.js';

const initialState = {
  email: null,
  name: null,
  surname: null,
  image: null,
  status: 'idle',
  error: null,
};

export const selectToken = (state) => state.auth.accessToken;

export const getUserAction = createAsyncThunk(
  'user/getUser',
  async (loginToken, { rejectWithValue, getState }) => {
    try {
      const token = loginToken || selectToken(getState());
      const response = await getUser(token);
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const updateUserAction = createAsyncThunk(
  'user/updateUser',
  async ({loginToken, data}, { rejectWithValue, getState }) => {
    try {
      const token = loginToken || selectToken(getState());
      const response = await updateUser(token, data);
      console.log(response)
      return response.user;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getUserAction.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getUserAction.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.email = action.payload.email;
        state.name = action.payload.name;
        state.surname = action.payload.surname;
        state.image = action.payload.image;
      })
      .addCase(getUserAction.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateUserAction.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateUserAction.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.email = action.payload.email;
        state.name = action.payload.name;
        state.surname = action.payload.surname;
        state.image = action.payload.image;
      })
      .addCase(updateUserAction.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
