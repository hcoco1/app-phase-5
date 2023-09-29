// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import authReducer from '../features/counter/auth/authSlice'; // Adjust the path to point to your authSlice.js
import usersReducer from '../features/users/usersSlice';




const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    users: usersReducer
  },
  devTools: process.env.NODE_ENV !== 'production'
});

export default store;
