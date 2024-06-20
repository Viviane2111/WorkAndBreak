// components/Home.js
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  startTimer,
  resetTimer,
  tick,
  switchMode,
  togglePause,
  initialState,
} from "../reducer/timerSlice";
import {
  playSound,
  formatTime,
  calculateProgress,
  getButtonClass,
  getBackgroundClass,
  getSectionClass,
} from "../utils/timerUtils";

const Timer = () => {
  const dispatch = useDispatch();
  const { currentTime, isRunning, mode, isPaused, cycleCount } = useSelector(
    (state) => state.timer
  );

  // compte ou décompte du temps qui passe
  useEffect(() => {
    if (isRunning && !isPaused) {
      const interval = setInterval(() => {
        dispatch(tick());
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isRunning, isPaused, dispatch]);

  // mise à jour de l'affichage de l'onglet navigateur
  useEffect(() => {
    document.title = formatTime(currentTime) + " - " + mode.toUpperCase();
  }, [currentTime]);

  // jouer un son au changement de mode
  useEffect(() => {
    playSound();
  }, [mode]);


  // Calcul du pourcentage de progression
  const calculateProgress = () => {
    let totalTime;
    if (mode === "work") {
      totalTime = initialState.workTime;
    } else if (mode === "break") {
      totalTime = initialState.breakTime;
    } else {
      totalTime = initialState.longBreakTime;
    }
    return ((totalTime - currentTime) / totalTime) * 100;
  };

  // basculer de start à pause
  const handleStartPause = () => {
    if (!isRunning) {
      dispatch(startTimer());
    } else {
      dispatch(togglePause());
    }
  };

  return (
    <div
      className={`timer w-[620px] mx-auto flex flex-col items-center gap-5 border ${getBackgroundClass(mode)}`}
    >
      <h1 className="text-xl mt-3">{mode.toUpperCase()} TIMER</h1>

      {/* Barre de la barre de progression */}
      <div className="progress-bar-container">
        <div
          className="progress-bar"
          style={{ width: `${calculateProgress(mode)}%` }}
        ></div>
      </div>

      <div className={`${getSectionClass(mode)} mb-8 flex flex-col items-center`}>
        <div className="timeTypeButton flex justify-center gap-3 mx-5 mt-3">
          <button
            className={getButtonClass(mode,"work")}
            onClick={() => dispatch(switchMode("work"))}
          >
            Work
          </button>
          <button
            className={getButtonClass(mode,"break")}
            onClick={() => dispatch(switchMode("break"))}
          >
            Break
          </button>
          <button
            className={getButtonClass(mode,"longBreak")}
            onClick={() => dispatch(switchMode("longBreak"))}
          >
            Long break
          </button>
        </div>

        <div className="time text-[120px] font-bold text-white">
          {formatTime(currentTime)}
        </div>

        <div className="controls flex flex-col gap-2">
          <div className="flex flex-col justify-center gap-2">
            <div className="flex bg-slate-100 m-auto gap-2 rounded-xl">
              <button
                className="w-[200px] py-4 px-8 shadow-2xl text-black text-2xl z-10"
                onClick={handleStartPause}
              >
                {isRunning && !isPaused ? "Pause" : "Start"}
              </button>
            </div>

            <div className="m-auto">
              <button
                className=" px-2 text-2xl text-white mb-2"
                onClick={() => dispatch(resetTimer())}
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
