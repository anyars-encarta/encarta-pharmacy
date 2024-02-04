// app/javascript/redux/suppliers/usersSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const base_url = 'http://localhost:3000/api/v1';

// Define the async thunk to fetch Users data
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await fetch(`${base_url}/users`);
  const data = await response.json();
  return data;
});

// Define the async thunk to create a new User
export const createUser = createAsyncThunk('users/createUser', async (formData) => {
  try {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
    const response = await fetch(`${base_url}/users`, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken, // Add the CSRF token to the headers
      },
    });

    if (!response.ok) {
      throw new Error(`Error creating user: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return { error: error.message };
  }
});

// Define the async thunk to update a User
export const updateUser = createAsyncThunk('users/updateUser', async ({ userId, formData }) => {
    try {
      const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
      const response = await fetch(`${base_url}/users/${userId}`, {
        method: 'PUT',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
      });

      if (!response.ok) {
        throw new Error(`Error updating user: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return { error: error.message };
    }
  }
);

// Define the async thunk to delete a User
export const deleteUser = createAsyncThunk('users/deleteUser', async (userId) => {
    try {
      const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
      const response = await fetch(`${base_url}/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
      });

      if (!response.ok) {
        throw new Error(`Error deleting user: ${response.statusText}`);
      }

      return { id: userId };
    } catch (error) {
      return { error: error.message };
    }
  }
);

// Create the slice
const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    
    .addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loading = false;
      state.error = null;
    })

    .addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })

    .addCase(createUser.fulfilled, (state, action) => {
      state.users.push(action.payload);
      state.loading = false;
      state.error = null;
    })

    .addCase(createUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })

    .addCase(updateUser.fulfilled, (state, action) => {
      const updatedUser = action.payload;
      const index = state.users.findIndex((user) => user.id === updatedUser.id);
      if (index !== -1) {
        state.users[index] = updatedUser;
      }
      state.loading = false;
      state.error = null;
    })
    
    .addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })

    .addCase(deleteUser.fulfilled, (state, action) => {
      const deletedUserId = action.payload.id;
      state.users = state.users.filter((user) => user.id !== deletedUserId);
      state.loading = false;
      state.error = null;
    })

    .addCase(deleteUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default usersSlice.reducer;
