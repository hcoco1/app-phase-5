// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null
};

export const checkSession = createAsyncThunk('auth/checkSession', async () => {
  const response = await fetch('/check_session');
  
  if (!response.ok) {
    throw new Error('Session check failed.');
  }

  const user = await response.json();
  return user;
});

export const signInUser = createAsyncThunk('auth/signInUser', async (credentials) => {
  const response = await fetch('/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || 'Sign in failed.');
  }

  const user = await response.json();
  return user;
});


// Declare the thunk first
export const signOutUser = createAsyncThunk('auth/signOutUser', async () => {
  const response = await fetch('/sign_out', {
    method: 'DELETE'
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || 'Logout failed.');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    }
  },
  extraReducers: {
    [signOutUser.fulfilled]: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    [checkSession.fulfilled]: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    [signInUser.fulfilled]: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    }
  }
   // Corrected the closing bracket here
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

