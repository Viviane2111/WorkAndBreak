// reducer/timerSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { clearLocalStorage, loadSettingsFromLocalStorage } from "../utils/storageUtils";

// 50-5-50-15
// Valeurs par défaut
let defaultWorkTime = 25 * 60;
let defaultBreakTime = 5 * 60;
let defaultLongBreakTime = 15 * 60;
let defaultCyclesUntilLongBreak = 4;

const initialState = {
  workTime: defaultWorkTime,
  breakTime: defaultBreakTime,
  longBreakTime: defaultLongBreakTime,
  currentTime: defaultWorkTime,
  isRunning: false,
  mode: "work",
  isPaused: false,
  cycleCount: 0,
  cyclesUntilLongBreak: defaultCyclesUntilLongBreak,
  autoStartPomodoro: false,
  autoStartBreaks: false,
};

// Récupération des données du stockage local
const settingsFromLocalStorage = loadSettingsFromLocalStorage();
if (settingsFromLocalStorage) {
  initialState.workTime = settingsFromLocalStorage.workTime;
  initialState.breakTime = settingsFromLocalStorage.breakTime;
  initialState.longBreakTime = settingsFromLocalStorage.longBreakTime;
  initialState.cyclesUntilLongBreak = settingsFromLocalStorage.cyclesUntilLongBreak;
  initialState.autoStartPomodoro = settingsFromLocalStorage.autoStartPomodoro;
  initialState.autoStartBreaks = settingsFromLocalStorage.autoStartBreaks;
}

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
    // Réinitialisation avec vidage du localStorage
    resetTimer: (state) => {
      const storage = localStorage;
      state.isRunning = false;
      state.isPaused = false;
      state.currentTime = state.workTime;
      state.mode = "work";
      state.cycleCount = 0;
      clearLocalStorage();
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
              if (!state.autoStartBreaks) state.isRunning = false;
            } else {
              state.mode = "break";
              state.currentTime = state.breakTime;
              if (!state.autoStartPomodoro) state.isRunning = false;
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
      console.log("Switching mode to:", action.payload);
      state.mode = action.payload;
      if (action.payload === "work") {
        state.currentTime = state.workTime;
      } else if (action.payload === "break") {
        state.currentTime = state.breakTime;
      } else if (action.payload === "longBreak") {
        state.currentTime = state.longBreakTime;
      }
      console.log("Updated currentTime to:", state.currentTime);
    },
    // bascule pour l'arrêt temporaire
    togglePause: (state) => {
      state.isPaused = !state.isPaused;
    },

    // mise à jour
    updateWorkTime: (state, action) => {
      state.workTime = action.payload * 60;
      if (state.mode === "work") state.currentTime = state.workTime;
      console.log("Updated workTime to:", state.workTime);
    },
    updateBreakTime: (state, action) => {
      state.breakTime = action.payload * 60;
      if (state.mode === "break") state.currentTime = state.breakTime;
      console.log("Updated breakTime to:", state.breakTime);
    },
    updateLongBreakTime: (state, action) => {
      state.longBreakTime = action.payload * 60;
      if (state.mode === "longBreak") state.currentTime = state.longBreakTime;
      console.log("Updated longBreakTime to:", state.longBreakTime);
    },
    updateCyclesUntilLongBreak: (state, action) => {
      state.cyclesUntilLongBreak = action.payload;
      console.log(
        "Updated cyclesUntilLongBreak to:",
        state.cyclesUntilLongBreak
      );
    },
    toggleAutoStartPomodoro: (state) => {
      state.autoStartPomodoro = !state.autoStartPomodoro;
      console.log("Toggled autoStartPomodoro to:", state.autoStartPomodoro);
    },
    toggleAutoStartBreaks: (state) => {
      state.autoStartBreaks = !state.autoStartBreaks;
      console.log("Toggled autoStartBreaks to:", state.autoStartBreaks);
    },

    // pour garder l'état des checkbox
    setAutoStartPomodoro: (state, action) => {
      state.autoStartPomodoro = action.payload;
      console.log("Set autoStartPomodoro to:", state.autoStartPomodoro);
    },
    setAutoStartBreaks: (state, action) => {
      state.autoStartBreaks = action.payload;
      console.log("Set autoStartBreaks to:", state.autoStartBreaks);
    },
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
  setAutoStartPomodoro,
  setAutoStartBreaks,
} = timerSlice.actions;

export default timerSlice.reducer;