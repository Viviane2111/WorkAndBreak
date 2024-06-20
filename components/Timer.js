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

  const playSound = () => {
    const changeModeSound = "/sound/changes.mp"; //! ajouter 3
    const audio = new Audio(changeModeSound);
    audio.play();
  };

  // formatage du l'affichage du temps
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

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

  // ajout du css sur les boutons concernés, en fonction du mode
  const getButtonClass = (buttonMode) => {
    return `cursor-pointer w-28 py-1 px-1 rounded-md ${
      mode === buttonMode ? "bg-orange-900 text-white" : "bg-orange-500"
    }`;
  };

  // Déterminer la classe du fond d'écran en fonction du mode
  const getBackgroundClass = () => {
    if (mode === "work") return "bg-work";
    if (mode === "break") return "bg-break";
    if (mode === "longBreak") return "bg-longBreak";
    return "";
  };
  
  return (
    <div
      className={`timer w-[620px] mx-auto flex flex-col items-center gap-5 border ${getBackgroundClass()}`}
    >
      <h1 className="text-xl mt-3">{mode.toUpperCase()} TIMER</h1>

      {/* Barre de la barre de progression */}
      <div className="progress-bar-container">
        <div
          className="progress-bar"
          style={{ width: `${calculateProgress()}%` }}
        ></div>
      </div>

      <div className="bg-orange-700 mb-8 flex flex-col items-center">
        <div className="timeTypeButton flex justify-center gap-3 mx-5 mt-3">
          <button
            className={getButtonClass("work")}
            onClick={() => dispatch(switchMode("work"))}
          >
            Work
          </button>
          <button
            className={getButtonClass("break")}
            onClick={() => dispatch(switchMode("break"))}
          >
            Break
          </button>
          <button
            className={getButtonClass("longBreak")}
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
                className="w-[200px] py-4 px-8 shadow-xl"
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
