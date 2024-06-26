// components/Timer.js
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Settings, XIcon } from "lucide-react";
import {
  startTimer,
  resetTimer,
  tick,
  switchMode,
  togglePause,
} from "../reducer/timerSlice";
import {
  playSound,
  formatTime,
  getButtonClass,
  getBackgroundClass,
  getSectionClass,
} from "../utils/timerUtils";
import { loadSettingsAndDispatch } from "../utils/storageUtils";
import SettingModal from "./SettingModal";

const Timer = () => {
  const dispatch = useDispatch();
  const {
    currentTime,
    isRunning,
    mode,
    isPaused,
    cycleCount,
    workTime,
    breakTime,
    longBreakTime,
  } = useSelector((state) => state.timer);
  const [previousMode, setPreviousMode] = useState(mode);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  useEffect(() => {
    loadSettingsAndDispatch(dispatch);
    const savedState = JSON.parse(localStorage.getItem("timerState"));
    if (savedState) {
      dispatch({ type: "timer/loadState", payload: savedState });
    }
  }, [dispatch]);

  useEffect(() => {
    let timer = null;
    if (isRunning && !isPaused) {
      timer = setInterval(() => {
        dispatch(tick());
      }, 1000);
    }
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isRunning, isPaused, dispatch]);

  //* mise à jour de l'affichage de l'onglet navigateur
  useEffect(() => {
    document.title = formatTime(currentTime) + " - " + mode.toUpperCase();
  }, [currentTime]);

  //* jouer un son au changement de mode
  useEffect(() => {
    playSound();
  }, [mode]);

  //* Calcul du pourcentage de progression
  const calculateProgress = () => {
    let totalTime;
    if (mode === "work") {
      totalTime = workTime;
    } else if (mode === "break") {
      totalTime = breakTime;
    } else {
      totalTime = longBreakTime;
    }
    // Réinitialisation de la progression si le mode a changé
    if (mode !== previousMode) {
      setPreviousMode(mode);
      return 0;
    }
    return ((totalTime - currentTime) / totalTime) * 100;
  };
  const progress = calculateProgress();

  // basculer de start à pause
  const handleStartPause = () => {
    if (!isRunning) {
      dispatch(startTimer());
    } else {
      dispatch(togglePause());
    }
  };

  const handleReset = () => {
    dispatch(resetTimer());
    setTimeout(() => loadSettingsAndDispatch(dispatch), 0);
  };

  return (
    <div
      className={`timer max-w-4xl w-full mx-auto flex flex-col items-center gap-5 border ${getBackgroundClass(
        mode
      )}`}
    >
      <div>
        <h1 className="text-lg sm:text-xl mt-10 pt-8 text-center">
          {mode === "work"
            ? "Il est temps de se concentrer !"
            : mode === "break"
            ? "Il est temps pour une pause !"
            : "Il est temps de s'étirer et se détendre !"}
        </h1>
        <p className="text-center mt-2 text-lg">
          {Math.floor(currentTime / 60)} minutes
        </p>
      </div>
      {/* Barre de la barre de progression //! à ajuster */}
      <div className="w-full h-1 bg-gray-300 rounded">
        <div
          className="h-full bg-blue-500 rounded transition-all duration-1000 ease-linear"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      {/* Container des boutons des timers */}
      <div
        className={`h-full sm:w-[80%] my-8 flex flex-col items-center relative ${getSectionClass(
          mode
        )}`}
      >
        {/* l'icone pour ouvrir la modale */}
        <div className="w-full">
          <div className=" absolute left-1 top-1 sm:left-6 sm:top-9">
            <Settings onClick={showModal} />
          </div>
          <div className="w-full">
            {isModalVisible && <SettingModal onClose={showModal} />}
          </div>
        </div>
        {/* les boutons Action, Courte Pause, Langue pause */}
        <div className="timeTypeButton flex justify-center gap-3 mx-5 mt-8">
          <button
            className={`w-auto px-2 py-1 rounded-md border ${getButtonClass(
              mode,
              "work"
            )}`}
            onClick={() => dispatch(switchMode("work"))}
          >
            Action
          </button>
          <button
            className={`w-auto px-2 py-1 rounded-md border ${getButtonClass(
              mode,
              "break"
            )}`}
            onClick={() => dispatch(switchMode("break"))}
          >
            Courte pause
          </button>
          <button
            className={`w-auto px-2 py-1 rounded-md border ${getButtonClass(
              mode,
              "longBreak"
            )}`}
            onClick={() => dispatch(switchMode("longBreak"))}
          >
            Longue pause
          </button>
        </div>

        <div className="time mt-4 text-6xl sm:text-9xl font-bold text-white mb-6">
          {formatTime(currentTime)}
        </div>

        <div className="controls flex flex-col gap-2">
          <div className="flex flex-col justify-center gap-2">
            <div className="flex bg-slate-100 m-auto gap-2 rounded-xl">
              <button
                className="w-40 sm:w-[200px] py-4 px-8 shadow-2xl text-black text-lg sm:text-2xl z-10"
                onClick={handleStartPause}
              >
                {isRunning && !isPaused ? "Pause" : "Start"}
              </button>
            </div>

            <div className="m-auto">
              <button
                className="px-2 text-xl sm:text-3xl text-white mb-2"
                onClick={handleReset}
              >
                ♻
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="cycles text-lg font-medium text-white my-4">
        Cycles : {cycleCount}
      </div>
    </div>
  );
};
export default Timer;
