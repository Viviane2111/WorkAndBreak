// reducer/timerSlice.js
import { createSlice } from "@reduxjs/toolkit";

// 50-5-50-15
// valeurs par défaut => volontairemant déséquilibrées pour le dev
const work = 1;
const shotbreak = 1;
const longbreak = 1;
const currenttime = 1;
const longbreakInterval = 2;

export const initialState = {
  workTime: work * 60, // durée de travail par défaut en secondes
  breakTime: shotbreak * 60, // durée de la petite pause par défaut en secondes
  longBreakTime: longbreak * 60, // durée de la longue pause par défaut en secondes
  currentTime: currenttime * 60, // temps actuel en secondes, initialisé avec la durée de travail
  isRunning: false,
  mode: "work", // ou "break" ou "longBreak"
  isPaused: false,
  cycleCount: 0, // nombre de cycles de travail effectués
  cyclesUntilLongBreak: longbreakInterval, // nombre de cycles de travail avant une longue pause
  autoStartPomodoro: false,
  autoStartBreaks: false,
};

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    // démarrage du compteur
    startTimer: (state) => {
      state.isRunning = true;
    },
    //arrêt du compteur
    stopTimer: (state) => {
      state.isRunning = false;
    },
    // réinitialisation
    resetTimer: (state) => {
      state.isRunning = false;
      state.isPaused = false;
      state.currentTime = state.workTime;
      state.mode = "work";
      state.cycleCount = 0;
    },
    // à chaque seconde
    tick: (state) => {
      if (state.isRunning && !state.isPaused) {
        state.currentTime -= 1;
        if (state.currentTime === 0) {
          if (state.mode === "work") {
            state.cycleCount += 1;
            if (state.cycleCount % state.cyclesUntilLongBreak === 0) {
              state.mode = "longBreak";
              state.currentTime = state.longBreakTime;
            } else {
              state.mode = "break";
              state.currentTime = state.breakTime;
            }
          } else {
            state.mode = "work";
            state.currentTime = state.workTime;
          }
        }
      }
    },
    // changement de mode
    switchMode: (state, action) => {
      state.mode = action.payload;
      if (action.payload === "work") {
        state.currentTime = state.workTime;
      } else if (action.payload === "break") {
        state.currentTime = state.breakTime;
      } else if (action.payload === "longBreak") {
        state.currentTime = state.longBreakTime;
      }
    },
    // bascule pour l'arrêt temporaire
    togglePause: (state) => {
      state.isPaused = !state.isPaused;
    },

    updateWorkTime: (state, action) => {
      state.workTime = action.payload * 60;
      if (state.mode === "work") state.currentTime = state.workTime;
    },
    updateBreakTime: (state, action) => {
      state.breakTime = action.payload * 60;
      if (state.mode === "break") state.currentTime = state.breakTime;
    },
    updateLongBreakTime: (state, action) => {
      state.longBreakTime = action.payload * 60;
      if (state.mode === "longBreak") state.currentTime = state.longBreakTime;
    },
    updateCyclesUntilLongBreak: (state, action) => {
      state.cyclesUntilLongBreak = action.payload;
    },
    toggleAutoStartPomodoro: (state) => {
      state.autoStartPomodoro = !state.autoStartPomodoro;
    },
    toggleAutoStartBreaks: (state) => {
      state.autoStartBreaks = !state.autoStartBreaks;
    }
    ,
  },
});

export const {
  startTimer,
  stopTimer,
  resetTimer,
  tick,
  switchMode,
  togglePause,
  updateWorkTime,
  updateBreakTime,
  updateLongBreakTime,
  updateCyclesUntilLongBreak,
  toggleAutoStartPomodoro,
  toggleAutoStartBreaks,
} = timerSlice.actions;

export default timerSlice.reducer;