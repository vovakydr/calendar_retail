import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "/rosbank/review.html";

export const sendRating = createAsyncThunk(
  "rating/sendRating",

  async ({ rating, review }, thunkAPI) => {
    console.log(rating, review);
    try {
      const response = await axios.patch(
        URL,
        {
          response_type_id: "7017520163405529709",
          review: review,
          rating: rating,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.log(error.response.statusText);
      thunkAPI.rejectWithValue(error.response.statusText);
    }
  }
);

const initialState = {
  loadingRating: false,
  ratingSent: false,
};

const ratingSlice = createSlice({
  name: "rating",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(sendRating.pending, (state, action) => {
        state.loadingRating = true;
      })
      .addCase(sendRating.fulfilled, (state, action) => {
        state.loadingRating = false;
        state.ratingSent = true;
      })
      .addCase(sendRating.rejected, (state, action) => {
        state.loadingRating = false;
      });
  },
});

export default ratingSlice.reducer;
