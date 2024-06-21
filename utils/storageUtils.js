// utils/storageUtils.js

export const loadSettingsFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const settings = localStorage.getItem("pomodoroSettings");
    return settings ? JSON.parse(settings) : null;
  }
  return null;
};

export const saveSettingsToLocalStorage = (settings) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("pomodoroSettings", JSON.stringify(settings));
  }
};
