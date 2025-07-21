import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

export const fetchMyTeam = createAsyncThunk(
  "team/fetchMyTeam",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/team/my-team");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch team"
      );
    }
  }
);

export const listPlayer = createAsyncThunk(
  "team/listPlayer",
  async ({ playerId, askingPrice }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/transfer/list-player", {
        playerId,
        askingPrice,
      });
      return response.data.player;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to list player"
      );
    }
  }
);

export const unlistPlayer = createAsyncThunk(
  "team/unlistPlayer",
  async ({ playerId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/transfer/unlist-player", {
        playerId,
      });
      return response.data.player;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to unlist player"
      );
    }
  }
);

const teamSlice = createSlice({
  name: "team",
  initialState: {
    team: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyTeam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyTeam.fulfilled, (state, action) => {
        state.loading = false;
        state.team = action.payload;
      })
      .addCase(fetchMyTeam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(listPlayer.pending, (state) => {
        state.loading = true;
      })
      .addCase(listPlayer.fulfilled, (state, action) => {
        state.loading = false;
        if (state.team) {
          const updatedPlayer = action.payload;
          const idx = state.team.players.findIndex(
            (p) => p._id === updatedPlayer._id
          );
          if (idx !== -1) {
            state.team.players[idx] = updatedPlayer;
          }
        }
      })
      .addCase(listPlayer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(unlistPlayer.pending, (state) => {
        state.loading = true;
      })
      .addCase(unlistPlayer.fulfilled, (state, action) => {
        state.loading = false;
        if (state.team) {
          const updatedPlayer = action.payload;
          const idx = state.team.players.findIndex(
            (p) => p._id === updatedPlayer._id
          );
          if (idx !== -1) {
            state.team.players[idx] = updatedPlayer;
          }
        }
      })
      .addCase(unlistPlayer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default teamSlice.reducer;
