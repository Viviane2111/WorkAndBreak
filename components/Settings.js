// components/Settings.js
import { useState } from "react";
import Navbar from "./Navbar";

const settings = () => {
  const [work, setWork] = useState(0);
  const [shortbreak, setShortbreak] = useState(0);
  const [longbreak, setLongbreak] = useState(0);
  const [delay, setDelay] = useState(0);

  return (
    <div>
      <Navbar />
      <div className="text-4xl text-center mt-10 mb-20">
        <h1>Settings</h1>
      </div>
      <div className="w-[910px] m-auto flex flex-col items-center gap-8">
        {/* travail */}
        <div className="flex mx-2">
          <label className="w-[375px] text-xl">
            Durée de u temps travaillé :
          </label>
          <div className="flex flex-col">
            <input
              className="w-[100px] bg-transparent border pl-2"
              type="number"
              onChange={(e) => setWork(e.target.value)}
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
              onChange={(e) => setShortbreak(e.target.value)}
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
              onChange={(e) => setLongbreak(e.target.value)}
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
              onChange={(e) => setDelay(e.target.value)}
              value={delay}
            />
            <span className="text-sm text-[#a1a1a1]">en pomodoros</span>
          </div>
        </div>
        {/* lancement automatique du temps travaillé */}
        <div className="flex mx-2">
          <label className="w-[375px] text-xl">
            lancement automatique du pomodoro :
          </label>
          <div className="flex flex-col items-center justify-center">
            <input
              className="w-[100px] bg-transparent border"
              type="checkbox"
              onChange={(e) => setDelay(e.target.value)}
              value={delay}
            />
          </div>
        </div>
        {/* lancement automatique des pauses */}
        <div className="flex mx-2">
          <label className="w-[375px] text-xl">
            lancement automatique des pauses :
          </label>
          <div className="flex flex-col items-center justify-center">
            <input
              className="w-[100px] bg-transparent border"
              type="checkbox"
              onChange={(e) => setDelay(e.target.value)}
              value={delay}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default settings;
