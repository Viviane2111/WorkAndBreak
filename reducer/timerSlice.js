// reducer/timerSlice.js
import { createSlice } from "@reduxjs/toolkit";

const work = 5;
const shotbreak = 1;
const longbreak = 1;
const currenttime = 5;

const initialState = {
  workTime: work * 60,
  breakTime: shotbreak * 60,
  longBreakTime: longbreak * 60,
  currentTime: currenttime * 60,
  isRunning: false,
  mode: "work", // ou "break" ou "longBreak"
  isPaused: false, // nouveau champ pour gérer la pause
  cycleCount: 0, // nombre de cycles de travail effectués
};

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    startTimer: (state) => {
      state.isRunning = true;
      state.isPaused = false;
    },
    stopTimer: (state) => {
      state.isRunning = false;
      state.isPaused = false;
    },
    resetTimer: (state) => {
      state.isRunning = false;
      state.isPaused = false;
      state.currentTime = initialState[state.mode + "Time"];
    },
    // A chaque tick
    tick: (state) => {
      if (state.isRunning && state.currentTime > 0) {
        state.currentTime -= 1;
      } else if (state.isRunning && state.currentTime === 0) {
         // Transition automatique entre les modes
         state.isRunning = false;
         if (state.mode === "work") {
            state.cycleCount +=1;
            state.mode = state.cycleCount % 4 === 0 ? "longBreak" : "break";
         } else {
            state.mode = "work";
         }
         state.currentTime = initialState[state.mode + "Time"];
      }
    },
    switchMode: (state, action) => {
      state.mode = action.payload;
      state.currentTime = initialState[state.mode + "Time"];
    },
    togglePause: (state) => {
      state.isPaused = !state.isPaused;
      state.isRunning = !state.isPaused; // bascule entre pause et reprise
    }
  },
});

export const {startTimer, stopTimer, resetTimer, tick, switchMode, togglePause} = timerSlice.actions;
export default timerSlice.reducer;