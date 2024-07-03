import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type UserInfo = {
  location: string;
    phoneNumber: string;
    photoProfileUrl: string;
};

type UserInfoState = {
  userInfo: UserInfo;
  user: string;
  loading: boolean;
  success: boolean;
  error: string | null;
};

const initialState: UserInfoState = {
    userInfo: {
        location: "",
        phoneNumber: "",
        photoProfileUrl: "",
      },
      user: "userInfo",
      loading: false,
    success: false,
      error: null,
};

export const fetchUserData = createAsyncThunk(
    'userInfo/fetchUserData',
    async (_, { rejectWithValue }) => {
      try {
        const response = await fetch("http://localhost:8080/fetch-user-data", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1")}`,
          },
        });
  
        if (!response.ok) {
          throw new Error("Failed to get user profile");
        }
  
        const data = await response.json();
        return data;
      } catch (error:any) {
        return rejectWithValue(error.message);
      }
    }
  );
// Update user data
export const updateUserData = createAsyncThunk(
    'userInfo/updateUserData',
    async (userInfo: UserInfo, { rejectWithValue }) => {
      try {
        const response = await fetch("http://localhost:8080/update-user-data", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1")}`,
          },
          body: JSON.stringify(userInfo),
        });
  
        if (!response.ok) {
          throw new Error("Unauthorized, please login...");
        }
  
        return await response.json();
      } catch (error:any) {
        return rejectWithValue(error.message);
      }
    }
  );

  export const userInfo = createSlice({
    name: "userInfo",
    initialState,
    reducers: {
      updateUserInfo: (state, action) => {
        state.userInfo = action.payload;
      },
      deleteUserInfo: (state) => {
        state.userInfo = initialState.userInfo;
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchUserData.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchUserData.fulfilled, (state, action) => {
          state.loading = false;
          state.userInfo = action.payload.data;
        })
        .addCase(fetchUserData.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
        .addCase(updateUserData.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.success = false;

        })
        .addCase(updateUserData.fulfilled, (state, action) => {
          state.loading = false;
          state.userInfo = action.payload.data;
            state.success = true;
        })
        .addCase(updateUserData.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
            state.success = false;
        });
    },
  });
  
  export const { updateUserInfo, deleteUserInfo } = userInfo.actions;
export default userInfo.reducer;