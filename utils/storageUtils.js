// utils/storageUtils.js
import {
  updateWorkTime,
  updateBreakTime,
  updateLongBreakTime,
  updateCyclesUntilLongBreak,
  setAutoStartPomodoro,
  setAutoStartBreaks,
  switchMode,
} from "../reducer/timerSlice";

// récupérer les données
export const loadSettingsFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const settings = localStorage.getItem("pomodoroSettings");
    return settings ? JSON.parse(settings) : null;
  }
  return null;
};

// sauvegarder les données
export const saveSettingsToLocalStorage = (settings) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("pomodoroSettings", JSON.stringify(settings));
  }
};

// effacer les données
export const clearLocalStorage = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("pomodoroSettings");
    window.location.reload();
  }
};

// dispatch les données
export const loadSettingsAndDispatch = (dispatch) => {
  const settings = loadSettingsFromLocalStorage();
  if (settings) {
    console.log("Settings loaded from localStorage:", settings);
    dispatch(updateWorkTime(settings.workTime / 60));
    dispatch(updateBreakTime(settings.breakTime / 60));
    dispatch(updateLongBreakTime(settings.longBreakTime / 60));
    dispatch(updateCyclesUntilLongBreak(settings.cyclesUntilLongBreak));
    dispatch(setAutoStartPomodoro(settings.autoStartPomodoro));
    dispatch(setAutoStartBreaks(settings.autoStartBreaks));
    dispatch(switchMode("work"));
  }
};
