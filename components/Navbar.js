// components/NavBar.js
import Link from "next/link";
import { Hourglass, CircleUserRound, BarChart3, Settings } from "lucide-react";

const Navbar = () => {
   const mystyle = "flex items-center gap-1"
  return (
    <div
      className="
      w-full h-16 flex justify-center items-center
      border-b-[1px] border-slate-50 mb-3 bg-slate-800 text-slate-50 top-0 fixed"
    >
      <div className="w-full flex justify-around">
        <Link href="/">
          <div className="flex items-center gap-1">
            <Hourglass color="#ff0000" size={16} />
            POMODORO
          </div>
        </Link>
        <Link href="">
          <div className="flex items-center gap-1">
            <BarChart3 /> Rapport
          </div>
        </Link>
        <Link href="/settings">
          <div className="flex items-center gap-1">
            <Settings /> Paramètres
          </div>
        </Link>
        <Link href="/connexion">
          <div className="flex items-center gap-1">
            <CircleUserRound />
            Connexion
          </div>
        </Link>
      </div>
    </div>
  );
}
export default Navbar
