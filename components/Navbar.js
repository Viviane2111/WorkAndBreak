import Link from "next/link";
import {
  Hourglass,
  CircleUserRound,
  BarChart3,
  Settings,
  Menu,
} from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full h-16 flex justify-between items-center border-b-[1px] border-slate-50 bg-slate-800 text-slate-50 top-0 fixed px-4 md:px-8 z-50">
      <Link href="/" className="flex items-center gap-1">
        <Hourglass color="#ff0000" size={16} />
        <span className="text-lg font-bold">POMODORO</span>
      </Link>
      <div className="md:hidden flex items-center justify-end flex-grow">
        <button onClick={toggleMenu}>
          <Menu size={24} />
        </button>
      </div>
      <div
        className={`absolute top-16 left-0 w-full bg-slate-800 md:static md:w-auto md:flex ${
          isOpen ? "block" : "hidden"
        } md:block`}
      >
        <div className="flex flex-col items-right ml-5 pb-2 md:flex-row md:gap-4">
          <Link href="/" className="flex items-center gap-1 mt-4 md:mt-0">
            <BarChart3 />
            <span>Rapport</span>
          </Link>
          <Link
            href="/settings"
            className="flex items-center gap-1 mt-4 md:mt-0"
          >
            <Settings />
            <span>Paramètres</span>
          </Link>
          <Link
            href="/connexion"
            className="flex items-center gap-1 mt-4 md:mt-0"
          >
            <CircleUserRound />
            <span>Connexion</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
