// components/Settings.js
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./Navbar";
import {
  updateWorkTime,
  updateBreakTime,
  updateLongBreakTime,
  updateCyclesUntilLongBreak,
  // toggleAutoStartPomodoro,
  // toggleAutoStartBreaks,
  setAutoStartPomodoro,
  setAutoStartBreaks,
} from "../reducer/timerSlice";
import ToggleCheckButton from "./ToggleCheckButton";
import {
  saveSettingsToLocalStorage,
  loadSettingsFromLocalStorage,
  loadSettingsAndDispatch,
} from "../utils/storageUtils";

const Settings = () => {
  const dispatch = useDispatch();
  const {
    workTime,
    breakTime,
    longBreakTime,
    cyclesUntilLongBreak,
    autoStartPomodoro,
    autoStartBreaks,
  } = useSelector((state) => state.timer);

  const [work, setWork] = useState(workTime / 60);
  const [shortbreak, setShortbreak] = useState(breakTime / 60);
  const [longbreak, setLongbreak] = useState(longBreakTime / 60);
  const [delay, setDelay] = useState(cyclesUntilLongBreak);

  useEffect(() => {
    loadSettingsAndDispatch(dispatch);
  }, [dispatch]);

// temps travaillé
  const handleUpdateWorkTime = (e) => {
    const value = e.target.value;
    setWork(value);
    dispatch(updateWorkTime(value));
    saveSettingsToLocalStorage({
      workTime: value * 60,
      breakTime: shortbreak * 60,
      longBreakTime: longbreak * 60,
      cyclesUntilLongBreak: delay,
      autoStartPomodoro,
      autoStartBreaks,
    });
  };
// temps courte pause
  const handleUpdateBreakTime = (e) => {
    const value = e.target.value;
    setShortbreak(value);
    dispatch(updateBreakTime(value));
    saveSettingsToLocalStorage({
      workTime: work * 60,
      breakTime: value * 60,
      longBreakTime: longbreak * 60,
      cyclesUntilLongBreak: delay,
      autoStartPomodoro,
      autoStartBreaks,
    });
  };
// temps longue pause
  const handleUpdateLongBreakTime = (e) => {
    const value = e.target.value;
    setLongbreak(value);
    dispatch(updateLongBreakTime(value));
    saveSettingsToLocalStorage({
      workTime: work * 60,
      breakTime: shortbreak * 60,
      longBreakTime: value * 60,
      cyclesUntilLongBreak: delay,
      autoStartPomodoro,
      autoStartBreaks,
    });
  };
// nombre de cycles
  const handleUpdateCyclesUntilLongBreak = (e) => {
    const value = e.target.value;
    setDelay(value);
    dispatch(updateCyclesUntilLongBreak(value));
    saveSettingsToLocalStorage({
      workTime: work * 60,
      breakTime: shortbreak * 60,
      longBreakTime: longbreak * 60,
      cyclesUntilLongBreak: value,
      autoStartPomodoro,
      autoStartBreaks,
    });
  };
// start auto du temps travaillé
  const handleToggleAutoStartPomodoro = () => {
    dispatch(setAutoStartPomodoro(!autoStartPomodoro));
    saveSettingsToLocalStorage({
      workTime: work * 60,
      breakTime: shortbreak * 60,
      longBreakTime: longbreak * 60,
      cyclesUntilLongBreak: delay,
      autoStartPomodoro: !autoStartPomodoro,
      autoStartBreaks,
    });
  };
// sart auto des pauses
  const handleToggleAutoStartBreaks = () => {
    dispatch(setAutoStartBreaks(!autoStartBreaks));
    saveSettingsToLocalStorage({
      workTime: work * 60,
      breakTime: shortbreak * 60,
      longBreakTime: longbreak * 60,
      cyclesUntilLongBreak: delay,
      autoStartPomodoro,
      autoStartBreaks: !autoStartBreaks,
    });
  };

  return (
    <div className="bg-[#293546] min-h-[100vh]">
      <Navbar />
      <div className="min-h-[100vh] mt-16">
        <div className="text-4xl text-center mb-20">
          <h1 className="pt-8">Settings</h1>
        </div>
        <div className="w-[910px] h-[100vh] m-auto flex flex-col items-center gap-8">
          {/* travail */}
          <div className="flex mx-2">
            <label className="w-[375px] text-xl">
              Durée de temps travaillé :
            </label>
            <div className="flex flex-col">
              <input
                className="w-[100px] bg-transparent border pl-2"
                type="number"
                onChange={handleUpdateWorkTime}
                value={work}
              />
              <span className="text-sm text-[#a1a1a1]">en minutes</span>
            </div>
          </div>

          {/* pause 1 */}
          <div className="flex mx-2">
            <label className="w-[375px] text-xl">
              Durée de la petite pause :
            </label>
            <div className="flex flex-col">
              <input
                className="w-[100px] bg-transparent border pl-2"
                type="number"
                onChange={handleUpdateBreakTime}
                value={shortbreak}
              />
              <span className="text-sm text-[#a1a1a1]">en minutes</span>
            </div>
          </div>

          {/* pause 2 */}
          <div className="flex mx-2">
            <label className="w-[375px] text-xl">
              Durée de la longue pause :
            </label>
            <div className="flex flex-col">
              <input
                className="w-[100px] bg-transparent border pl-2"
                type="number"
                onChange={handleUpdateLongBreakTime}
                value={longbreak}
              />
              <span className="text-sm text-[#a1a1a1]">en minutes</span>
            </div>
          </div>

          {/* nombre de cycle */}
          <div className="flex mx-2">
            <label className="w-[375px] text-xl">
              Délai avant la longue pause :
            </label>
            <div className="flex flex-col">
              <input
                className="w-[100px] bg-transparent border pl-2"
                type="number"
                onChange={handleUpdateCyclesUntilLongBreak}
                value={delay}
              />
              <span className="text-sm text-[#a1a1a1]">en cycle travaillé</span>
            </div>
          </div>

          <div className="mt-5">
            {/* lancement automatique du temps travaillé */}
            <div className="flex mx-2">
              <label className="w-[375px] text-xl">
                Lancement automatique du pomodoro :
              </label>
              <div className="flex flex-col items-center justify-center">
                <ToggleCheckButton
                  id="togglePomodoro"
                  label=""
                  isChecked={autoStartPomodoro}
                  onChange={handleToggleAutoStartPomodoro}
                />
              </div>
            </div>
            {/* lancement automatique des pauses */}
            <div className="flex mx-2">
              <label className="w-[375px] text-xl">
                Lancement automatique des pauses :
              </label>
              <div className="flex flex-col items-center justify-center">
                <ToggleCheckButton
                  id="toggleBreaks"
                  label=""
                  isChecked={autoStartBreaks}
                  onChange={handleToggleAutoStartBreaks}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
