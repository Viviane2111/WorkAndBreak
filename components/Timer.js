// components/Home.js
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  startTimer,
  resetTimer,
  tick,
  switchMode,
  togglePause,
} from "../reducer/timerSlice";

const Timer = () => {
  const dispatch = useDispatch();
  const { currentTime, isRunning, mode, isPaused, cycleCount } = useSelector((state) => state.timer);

  // compte ou décompte du temps qui passe
  useEffect(() => {
    if (isRunning && !isPaused) {
      const interval = setInterval(() => {
        dispatch(tick());
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isRunning, isPaused,dispatch]);

  // jouer un son au changement de mode
  useEffect(() => {
    if (currentTime === 0) {
      playSound();
    }
  }, [currentTime]);
  const playSound = () => {
    const audio = new Audio('/sound/changes.mp3');
    audio.play();
  }

  // formatage du l'affichage du temps
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // basculer de start à pause
  const handleStartPause = () => {
    if (!isRunning) {
      dispatch(startTimer());
    } else {
      dispatch(togglePause());
    }
  }

  return (
    <div className="timer w-[620px] mx-auto flex flex-col items-center gap-5 border bg-amber-600">
      <h1 className="text-xl">{mode.toUpperCase()} TIMER</h1>

      <div className="bg-orange-700 mb-8 flex flex-col items-center">
        <div className="timeTypeButton flex justify-center">
          <button
            className="cursor-pointer w-32 py-2 px-2"
            onClick={() => dispatch(switchMode("work"))}
          >
            Work
          </button>
          <button
            className="cursor-pointer w-32 py-2 px-2"
            onClick={() => dispatch(switchMode("break"))}
          >
            Break
          </button>
          <button
            className="cursor-pointer w-32 py-2 px-2"
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
            <div className="flex bg-slate-100 m-auto gap-2">
              <button
                className="w-[200px] py-4 px-8 border rounded-xl shadow-xl"
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
