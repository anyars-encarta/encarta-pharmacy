// app/javascript/redux/products/productsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const base_url = 'http://localhost:3000/api/v1';

// Define the async thunk to fetch Products data
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await fetch(`${base_url}/products`);
  const data = await response.json();
  return data;
});

// Define the async thunk to create a new Product
export const createProduct = createAsyncThunk('products/createProduct', async (formData) => {
  try {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
    const response = await fetch(`${base_url}/products`, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken, // Add the CSRF token to the headers
      },
    });

    if (!response.ok) {
      throw new Error(`Error creating product: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return { error: error.message };
  }
});

// Define the async thunk to update a Product
export const updateProduct = createAsyncThunk('products/updateProduct', async ({ productId, formData }) => {
    try {
      const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
      const response = await fetch(`${base_url}/products/${productId}`, {
        method: 'PUT',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
      });

      if (!response.ok) {
        throw new Error(`Error updating product: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return { error: error.message };
    }
  }
);

// Define the async thunk to delete a Product
export const deleteProduct = createAsyncThunk('products/deleteProduct', async (productId) => {
    try {
      const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
      const response = await fetch(`${base_url}/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
      });

      if (!response.ok) {
        throw new Error(`Error deleting product: ${response.statusText}`);
      }

      return { id: productId };
    } catch (error) {
      return { error: error.message };
    }
  }
);

// Create the slice
const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    
    .addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
      state.loading = false;
      state.error = null;
    })

    .addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })

    .addCase(createProduct.fulfilled, (state, action) => {
      state.products.push(action.payload);
      state.loading = false;
      state.error = null;
    })

    .addCase(createProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })

    .addCase(updateProduct.fulfilled, (state, action) => {
      const updatedProduct = action.payload;
      const index = state.products.findIndex((product) => product.id === updatedProduct.id);
      if (index !== -1) {
        state.products[index] = updatedProduct;
      }
      state.loading = false;
      state.error = null;
    })
    
    .addCase(updateProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })

    .addCase(deleteProduct.fulfilled, (state, action) => {
      const deletedProductId = action.payload.id;
      state.products = state.products.filter((product) => product.id !== deletedProductId);
      state.loading = false;
      state.error = null;
    })

    .addCase(deleteProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default productsSlice.reducer;