// utils/timerUtils.js

const changeModeSound = "/sound/truc.mp3"; //! ajouter 3

// fonction pour jouer des sons
export const playSound = () => {
  const audio = new Audio(changeModeSound);
  audio.play();
};

// formatage du l'affichage du temps
export const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

// ajout du css sur les boutons concernés, en fonction du mode
export const getButtonClass = (mode, buttonMode) => {
  let baseClass = `cursor-pointer w-28 py-1 px-1 rounded-md `;
  if (mode === buttonMode) {
    if (mode === "work") {
      baseClass += "button-work";
    } else if (mode === "break") {
      baseClass += "button-break";
    } else if (mode === "longBreak") {
      baseClass += "button-longBreak";
    }
  } else {
    // Couleur par défaut si le mode ne correspond pas
    baseClass += "bg-gray-400";
  }
  return baseClass;
};

// Déterminer la classe du fond d'écran en fonction du mode
export const getBackgroundClass = (mode) => {
  if (mode === "work") return "bg-work";
  if (mode === "break") return "bg-break";
  if (mode === "longBreak") return "bg-longBreak";
  return "";
};

// Détermine la classe du fond de la section du timer
export const getSectionClass = (mode) => {
  if (mode === "work") return "box-work";
  if (mode === "break") return "box-break";
  if (mode === "longBreak") return "box-longBreak";
  return "";
};
