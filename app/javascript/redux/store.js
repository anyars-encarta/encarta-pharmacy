// app/javascript/redux/store.js

import { configureStore } from '@reduxjs/toolkit';
import suppliersReducer from './suppliers/suppliersSlice';

const store = configureStore({
  reducer: {
    suppliers: suppliersReducer,
  },
});

export default store;
