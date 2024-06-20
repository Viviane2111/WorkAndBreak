// components/Settings.js
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./Navbar";
import {
  updateWorkTime,
  updateBreakTime,
  updateLongBreakTime,
  updateCyclesUntilLongBreak,
  toggleAutoStartPomodoro,
  toggleAutoStartBreaks,
} from "../reducer/timerSlice";

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

  const handleUpdateWorkTime = (e) => {
    setWork(e.target.value);
    dispatch(updateWorkTime(e.target.value));
  };

  const handleUpdateBreakTime = (e) => {
    setShortbreak(e.target.value);
    dispatch(updateBreakTime(e.target.value));
  };

  const handleUpdateLongBreakTime = (e) => {
    setLongbreak(e.target.value);
    dispatch(updateLongBreakTime(e.target.value));
  };

  const handleUpdateCyclesUntilLongBreak = (e) => {
    setDelay(e.target.value);
    dispatch(updateCyclesUntilLongBreak(e.target.value));
  };

  return (
    <div className="bg-[#293546] h-[100vh]">
      <Navbar />
      <div className="">
        <div className="text-4xl text-center mt-10 mb-20">
          <h1>Settings</h1>
        </div>
        <div className="w-[910px] m-auto flex flex-col items-center gap-8">
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
              <span className="text-sm text-[#a1a1a1]">en pomodoros</span>
            </div>
          </div>
          {/* lancement automatique du temps travaillé */}
          <div className="flex mx-2">
            <label className="w-[375px] text-xl">
              Lancement automatique du pomodoro :
            </label>
            <div className="flex flex-col items-center justify-center">
              <input
                className="w-[100px] bg-transparent border"
                type="checkbox"
                onChange={() => dispatch(toggleAutoStartPomodoro())}
                checked={autoStartPomodoro}
              />
            </div>
          </div>
          {/* lancement automatique des pauses */}
          <div className="flex mx-2">
            <label className="w-[375px] text-xl">
              Lancement automatique des pauses :
            </label>
            <div className="flex flex-col items-center justify-center">
              <input
                className="w-[100px] bg-transparent border"
                type="checkbox"
                onChange={() => dispatch(toggleAutoStartBreaks())}
                checked={autoStartBreaks}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
