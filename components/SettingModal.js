// components/SettingsModal.js
import ToggleCheckButton from "./ToggleCheckButton"
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateWorkTime,
  updateBreakTime,
  updateLongBreakTime,
  updateCyclesUntilLongBreak,
  toggleAutoStartPomodoro,
  toggleAutoStartBreaks,
} from "../reducer/timerSlice";
import { saveSettingsToLocalStorage } from "../utils/storageUtils";
import { Timer } from "lucide-react";

const SettingModal = ({onClose}) => {

   const dispatch = useDispatch();
   const autoStartPomodoro = useSelector((state) => state.timer.autoStartPomodoro);
   const autoStartBreaks = useSelector((state) => state.timer.autoStartBreaks);
   const [work, setWork] = useState(25);
   const [shortBreak, setShortBreak] = useState(5);
   const [longBreak, setLongBreak] = useState(15);
   const [cycles, setCycles] = useState(2);

   const handleUpdateWorkTime = (e) => setWork(e.target.value);
   const handleUpdateBreakTime = (e) => setShortBreak(e.target.value);
   const handleUpdateLongBreakTime = (e) => setLongBreak(e.target.value);
   const handleUpdateCyclesUntilLongBreak = (e) => setCycles(e.target.value);

   const handleToggleAutoStartPomodoro = () => {
     dispatch(toggleAutoStartPomodoro());
   };

   const handleToggleAutoStartBreaks = () => {
     dispatch(toggleAutoStartBreaks());
   };

   const saveSettings = () => {
      const settings = {
         workTime: work * 60,
         breakTime: shortBreak * 60,
         longBreakTime: longBreak * 60,
      };
      saveSettingsToLocalStorage(settings);
      dispatch(updateWorkTime(work));
      dispatch(updateBreakTime(shortBreak));
      dispatch(updateLongBreakTime(longBreak));
      dispatch(updateCyclesUntilLongBreak(cycles));
      onClose();
   }


  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-md p-6 w-full max-w-md mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-gray-700">
            <Timer className="mr-2" />
            <span className="text-xl font-bold">Settings</span>
          </div>
          <button onClick={onClose} className="text-gray-700">
            &times;
          </button>
        </div>
        <div className="space-y-4">
          <div className="flex flex-col">
            <label className="mb-1 text-gray-600">Action (minutes)</label>
            <input
              type="number"
              value={work}
              onChange={handleUpdateWorkTime}
              className="px-3 py-2 border rounded-md text-gray-600"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-gray-600">Courte pause (minutes)</label>
            <input
              type="number"
              value={shortBreak}
              onChange={handleUpdateBreakTime}
              className="px-3 py-2 border rounded-md text-gray-600"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-gray-600">Longue pause (minutes)</label>
            <input
              type="number"
              value={longBreak}
              onChange={handleUpdateLongBreakTime}
              className="px-3 py-2 border rounded-md text-gray-600"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-gray-600">Nombre de cycles</label>
            <input
              type="number"
              value={cycles}
              onChange={handleUpdateCyclesUntilLongBreak}
              className="px-3 py-2 border rounded-md text-gray-600"
            />
          </div>
          <div className="flex pt-2">
            <label className="w-[375px] text-md text-gray-600">
              Lancement automatique de l'action :
            </label>
            <div className="flex flex-col items-center justify-center">
              <ToggleCheckButton
                id="toggleBreaks"
                label=""
                isChecked={autoStartPomodoro}
                onChange={handleToggleAutoStartPomodoro}
              />
            </div>
          </div>
          <div className="flex">
            <label className="w-[375px] text-md text-gray-600">
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
        <div className="flex justify-end mt-4 space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={saveSettings}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
export default SettingModal;
