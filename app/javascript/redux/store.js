// app/javascript/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import suppliersReducer from './suppliers/suppliersSlice';
import usersReducer from './users/usersSlice';

const store = configureStore({
  reducer: {
    suppliers: suppliersReducer,
    users: usersReducer,
  },
});

export default store;
