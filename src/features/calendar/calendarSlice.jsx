import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import axios from "axios";
import { getNewData } from "../../utils";
import { getMonth } from "../../getMonth";
import { events as testEvents } from "../../data";

// ---TEST URL---
// const url = "/custom_web_template.html?object_id=6673451655755009275";

// ---PROD URL---
const url = "/custom_web_template.html?object_id=7045132913724882625";

// const url = "http://localhost:3000/events";

export const getCalendarEvents = createAsyncThunk(
  "calendar/getCalendarEvents",
  async (_, thunkAPI) => {
    const { monthIndex } = thunkAPI.getState().calendar;

    let nextMonthIndex = monthIndex % 12;
    if (nextMonthIndex < 0) {
      nextMonthIndex = nextMonthIndex + 12;
    }

    const yearToFetch = dayjs(new Date(dayjs().year(), monthIndex)).format(
      "YYYY"
    );

    try {
      const response = await axios(
        `${url}&date_month=${nextMonthIndex}&date_year=${yearToFetch}`
      );
      if (response.data) {
        const data = getNewData(response.data);

        return data;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(testEvents);
      //return thunkAPI.rejectWithValue(error.response);
    }
  }
);

const initialState = {
  calendarEvents: [],
  monthIndex: dayjs().month(),
  currentMonth: getMonth(),
  calendarDays: "",
  fullEvents: [],
  isLoading: true,
  submitted: false,
  hasRating: false,
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    updateMonthIndex: (state, action) => {
      state.monthIndex = action.payload;
    },
    // ==
    isSubmitted: (state, action) => {
      state.submitted = action.payload;
    },
    // ==
    prevMonth: (state, action) => {
      state.monthIndex = state.monthIndex - 1;
    },
    nextMonth: (state, action) => {
      state.monthIndex = state.monthIndex + 1;
    },
    handleCurrentMonth: (state, action) => {
      state.currentMonth = getMonth(state.monthIndex);
    },
    filterEvents: (state, action) => {
      state.calendarEvents = action.payload;
    },
    handleRating: (state, action) => {
      let rating = state.calendarEvents.find((item) => item.review === 1);
      if (rating) {
        state.hasRating = true;
      }
    },

    // getCalendarEvents: (state, action) => {
    //   state.calendarEvents = getNewData(events);
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCalendarEvents.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getCalendarEvents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.calendarEvents = action.payload;
        state.submitted = true;
      })
      .addCase(getCalendarEvents.rejected, (state, action) => {
        state.isLoading = false;
        console.log(action.error);
        state.calendarEvents = action.payload || testEvents;
      });
  },
});

export const {
  nextMonth,
  prevMonth,
  handleCurrentMonth,
  handleEvents,
  filterEvents,
  // getCalendarEvents,
  isSubmitted,
  updateMonthIndex,
  handleRating,
} = calendarSlice.actions;

export default calendarSlice.reducer;
