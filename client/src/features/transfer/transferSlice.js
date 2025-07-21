import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
import { toast } from "react-toastify";
export const fetchTransferList = createAsyncThunk(
  "transfer/fetchTransferList",
  async ({ teamName, playerName, maxPrice }, { rejectWithValue }) => {
    try {
      const params = {};
      if (teamName) params.teamName = teamName;
      if (playerName) params.playerName = playerName;
      if (maxPrice) params.maxPrice = maxPrice;

      const response = await axiosInstance.get("/transfer/list", {
        params,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch transfer list"
      );
    }
  }
);

export const buyPlayer = createAsyncThunk(
  "transfer/buyPlayer",
  async ({ playerId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/transfer/buy-player", {
        playerId,
      });
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to buy player");
      return rejectWithValue(
        error.response?.data?.message || "Failed to buy player"
      );
    }
  }
);

const transferSlice = createSlice({
  name: "transfer",
  initialState: {
    players: [],
    loading: false,
    error: null,
    buySuccess: null,
  },
  reducers: {
    clearBuySuccess(state) {
      state.buySuccess = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransferList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransferList.fulfilled, (state, action) => {
        state.loading = false;
        state.players = action.payload;
      })
      .addCase(fetchTransferList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(buyPlayer.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.buySuccess = null;
      })
      .addCase(buyPlayer.fulfilled, (state, action) => {
        state.loading = false;
        state.buySuccess = action.payload.message;
      })
      .addCase(buyPlayer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearBuySuccess } = transferSlice.actions;
export default transferSlice.reducer;
