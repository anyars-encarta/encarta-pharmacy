// app/javascript/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import suppliersReducer from './suppliers/suppliersSlice';
import usersReducer from './users/usersSlice';
import categoriesReducer from './categories/categoriesSlice';
import productsReducer from './products/productsSlice';

const store = configureStore({
  reducer: {
    suppliers: suppliersReducer,
    users: usersReducer,
    categories: categoriesReducer,
    products: productsReducer,
  },
});

export default store;
