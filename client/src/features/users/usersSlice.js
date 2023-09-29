import { createSlice } from '@reduxjs/toolkit';

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    list: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
  },
  reducers: {
    setUsers: (state, action) => {
      state.list = action.payload;
    },
    removeUser: (state, action) => {
      state.list = state.list.filter(user => user.id.toString() !== action.payload);
  },
  
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { setUsers, removeUser, setStatus, setError } = usersSlice.actions;

export default usersSlice.reducer;
