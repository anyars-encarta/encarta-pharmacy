// app/javascript/redux/suppliers/suppliersSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const base_url = 'http://localhost:3000/api/v1';

// Define the async thunk to fetch Suppliers data
export const fetchSuppliers = createAsyncThunk('suppliers/fetchSuppliers', async () => {
  const response = await fetch(`${base_url}/suppliers`);
  const data = await response.json();
  return data;
});

// Create the slice
const suppliersSlice = createSlice({
  name: 'suppliers',
  initialState: {
    suppliers: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSuppliers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchSuppliers.fulfilled, (state, action) => {
      state.suppliers = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(fetchSuppliers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default suppliersSlice.reducer;