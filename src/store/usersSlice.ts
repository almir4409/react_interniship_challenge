import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { User, UsersState } from '../types/user'
import { fetchUsers } from '../services/userService'

// this is the async action that fetches users from API
// Redux Toolkit handles loading/error states automatically
export const fetchUsersThunk = createAsyncThunk(
  'users/fetchAll',
  async () => {
    const users = await fetchUsers()
    return users
  }
)

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // add new user to TOP of list
    addUser: (state, action: PayloadAction<User>) => {
      state.users.unshift(action.payload)
    },

    // delete user by id
    deleteUser: (state, action: PayloadAction<number>) => {
      state.users = state.users.filter(user => user.id !== action.payload)
    },

    // update existing user
    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex(user => user.id === action.payload.id)
      if (index !== -1) {
        state.users[index] = action.payload
      }
    },
  },

  // handles the async fetchUsersThunk states
  extraReducers: (builder) => {
    builder
      // when fetch STARTS
      .addCase(fetchUsersThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      // when fetch SUCCEEDS
      .addCase(fetchUsersThunk.fulfilled, (state, action) => {
        state.loading = false
        state.users = action.payload
      })
      // when fetch FAILS
      .addCase(fetchUsersThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch users'
      })
  },
})

export const { addUser, deleteUser, updateUser } = usersSlice.actions
export default usersSlice.reducer