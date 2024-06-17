// reducer/timerSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  workTime: 25 * 60,
  breakTime: 5 * 60,
  longBreakTime: 15 * 60,
  currentTime: 25 * 60,
  isRunning: false,
  mode: "work", // could be 'work', 'break', or 'longBreak'
};

const timerSlice = createSlice({
   name: 'timer',
   initialState,
   reducers: {
      startTimer: (state, action) => {},
      stopTimer: (state, action) => {},
      resetTimer: (state, action) => {},
      tickTimer: (state, action) => {},
      switchMode: (state, action) => {},
   },
});

export const {startTimer, stopTimer, resetTimer, switchMode} = timerSlice.actions;
export default timerSlice.reducer;