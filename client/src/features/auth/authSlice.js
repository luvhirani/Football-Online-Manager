import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
import { toast } from "react-toastify";

export const loginOrRegister = createAsyncThunk(
  "auth/loginOrRegister",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth", {
        email,
        password,
      });

      if (response.data.isNewUser) {
        toast.success("Registered successfully");
      } else {
        toast.success("Logged in successfully");
      }

      return response.data;
    } catch (error) {
      const msg = error.response?.data?.message || "Something went wrong";
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

const initialState = {
  token: localStorage.getItem("token") || null,
  userId: localStorage.getItem("userId") || null,
  isNewUser: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.userId = null;
      state.isNewUser = false;
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
    },
    setIsNewUser(state, action) {
      state.isNewUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginOrRegister.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginOrRegister.fulfilled, (state, action) => {
        const { token, userId, isNewUser } = action.payload;
        state.loading = false;
        state.token = token;
        state.userId = userId;
        state.isNewUser = !!isNewUser;

        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
      })
      .addCase(loginOrRegister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, setIsNewUser } = authSlice.actions;
export default authSlice.reducer;
