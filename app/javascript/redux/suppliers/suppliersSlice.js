// app/javascript/redux/suppliers/suppliersSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const base_url = 'http://localhost:3000/api/v1';

// Define the async thunk to fetch Suppliers data
export const fetchSuppliers = createAsyncThunk('suppliers/fetchSuppliers', async () => {
  const response = await fetch(`${base_url}/suppliers`);
  const data = await response.json();
  return data;
});

// Define the async thunk to create a new Supplier
export const createSupplier = createAsyncThunk('suppliers/createSupplier', async (formData) => {
  try {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
    const response = await fetch(`${base_url}/suppliers`, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken, // Add the CSRF token to the headers
      },
    });

    if (!response.ok) {
      throw new Error(`Error creating supplier: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return { error: error.message };
  }
});

// Define the async thunk to delete a Supplier
export const deleteSupplier = createAsyncThunk(
  'suppliers/deleteSupplier',
  async (supplierId) => {
    try {
      const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
      const response = await fetch(`${base_url}/suppliers/${supplierId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
      });

      if (!response.ok) {
        throw new Error(`Error deleting supplier: ${response.statusText}`);
      }

      return { id: supplierId };
    } catch (error) {
      return { error: error.message };
    }
  }
);

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
    builder
      .addCase(fetchSuppliers.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    
    .addCase(fetchSuppliers.fulfilled, (state, action) => {
      state.suppliers = action.payload;
      state.loading = false;
      state.error = null;
    })

    .addCase(fetchSuppliers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })

    .addCase(createSupplier.fulfilled, (state, action) => {
      state.suppliers.push(action.payload);
      state.loading = false;
      state.error = null;
    })

    .addCase(createSupplier.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })

    .addCase(deleteSupplier.fulfilled, (state, action) => {
      const deletedSupplierId = action.payload.id;
      state.suppliers = state.suppliers.filter((supplier) => supplier.id !== deletedSupplierId);
      state.loading = false;
      state.error = null;
    })

    .addCase(deleteSupplier.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default suppliersSlice.reducer;