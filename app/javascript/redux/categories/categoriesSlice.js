// app/javascript/redux/categories/categoriesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const base_url = 'http://localhost:3000/api/v1';

// Define the async thunk to fetch Categories data
export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  const response = await fetch(`${base_url}/categories`);
  const data = await response.json();
  return data;
});

// Define the async thunk to create a new Category
export const createCategory = createAsyncThunk('categories/createCategory', async (formData) => {
  try {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
    const response = await fetch(`${base_url}/categories`, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken, // Add the CSRF token to the headers
      },
    });

    if (!response.ok) {
      throw new Error(`Error creating category: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return { error: error.message };
  }
});

// Define the async thunk to update a Category
export const updateCategory = createAsyncThunk('categories/updateCategory', async ({ categoryId, formData }) => {
    try {
      const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
      const response = await fetch(`${base_url}/categories/${categoryId}`, {
        method: 'PUT',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
      });

      if (!response.ok) {
        throw new Error(`Error updating category: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return { error: error.message };
    }
  }
);

// Define the async thunk to delete a Category
export const deleteCategory = createAsyncThunk('categories/deleteCategory', async (categoryId) => {
    try {
      const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
      const response = await fetch(`${base_url}/categories/${categoryId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
      });

      if (!response.ok) {
        throw new Error(`Error deleting category: ${response.statusText}`);
      }

      return { id: categoryId };
    } catch (error) {
      return { error: error.message };
    }
  }
);

// Create the slice
const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    
    .addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.loading = false;
      state.error = null;
    })

    .addCase(fetchCategories.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })

    .addCase(createCategory.fulfilled, (state, action) => {
      state.categories.push(action.payload);
      state.loading = false;
      state.error = null;
    })

    .addCase(createCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })

    .addCase(updateCategory.fulfilled, (state, action) => {
      const updatedCategory = action.payload;
      const index = state.categories.findIndex((category) => category.id === updatedCategory.id);
      if (index !== -1) {
        state.categories[index] = updatedCategory;
      }
      state.loading = false;
      state.error = null;
    })
    
    .addCase(updateCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })

    .addCase(deleteCategory.fulfilled, (state, action) => {
      const deletedCategoryId = action.payload.id;
      state.categories = state.categories.filter((category) => category.id !== deletedCategoryId);
      state.loading = false;
      state.error = null;
    })

    .addCase(deleteCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default categoriesSlice.reducer;