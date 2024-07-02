// conponents/ConnectModal.js
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../reducers/user";
import { User, UserIcon, LockIcon, MailIcon } from "lucide-react";

function ConnectModal({ onClose }) {
  const dispatch = useDispatch();
  // inscription
  const [signupUsername, setSignupUsername] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  // connexion
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  // formulaires
  const [isRegistering, setIsRegistering] = useState(false);
  const toggleForm = () => {
    setIsRegistering(!isRegistering);
  };
  //* INSCRIPTION
  const handleRegister = (event) => {
    event.preventDefault();
    fetch("http://localhost:3000/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: signupUsername,
        email: signupEmail,
        password: signupPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(
            login({
              username: signupUsername,
              email: signupEmail,
              token: data.token,
            })
          );
          setSignupUsername("");
          setSignupEmail("");
          setSignupPassword("");
        }
      });
  };
  // *CONNEXION
  const handleConnection = (event) => {
    event.preventDefault();
    fetch("http://localhost:3000/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: loginEmail,
        password: loginPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(login({ email: loginEmail, token: data.token }));
          setLoginEmail("");
          setLoginPassword("");
        }
      });
  };
  //*  DÉCONNEXION
  const handleLogout = () => {
    dispatch(logout());
  };

  const RegisterForm = () => (
    <div className="form">
      <div className="inputs space-y-10 flex flex-col">
        <div className="flex flex-col w-full ml-4">
          <label htmlFor="email" className="text-gray-50 mb-1">
            Nom
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              id="name"
              className="w-full p-2 rounded-3xl bg-transparent border text-gray-50 placeholder:text-grey-200 placeholder:pl-2"
              placeholder="Entrez votre nom"
            />
            <span className="translate-x-[-40px]">
              <UserIcon size={18} stroke-width="2.5px" color="#fff" />
            </span>
          </div>
        </div>

        <div className="flex flex-col w-full ml-4">
          <label htmlFor="email" className="text-gray-50 mb-1">
            Email
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              id="email"
              className="w-full p-2 rounded-3xl bg-transparent border text-gray-50 placeholder:text-grey-200 placeholder:pl-2"
              placeholder="Entrez votre email"
            />
            <span className="translate-x-[-40px]">
              <MailIcon size={18} stroke-width="2.5px" color="#fff" />
            </span>
          </div>
        </div>

        <div className="flex flex-col w-full ml-4">
          <label htmlFor="password" className="text-gray-50 mb-1">
            Mot de passe
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="password"
              id="password"
              className="w-full p-2 rounded-3xl bg-transparent border text-gray-50 placeholder:text-grey-200 placeholder:pl-2"
              placeholder="Entrez votre mot de passe"
            />
            <span className="translate-x-[-40px]">
              <LockIcon size={18} stroke-width="2.5px" color="#fff" />
            </span>
          </div>
        </div>
      </div>

      <div className="button flex w-[95%] mx-auto h-12 bg-white text-gray-900 border-none outline-none rounded-3xl cursor-pointer text-xl font-semibold items-center justify-center mt-16">
        <button type="submit" className="">
          S'inscrire
        </button>
      </div>
      <div className="">
        <p className="text-white text-center mt-5">
          Vous avez déjà un compte ?{" "}
          <span
            onClick={toggleForm}
            className="cursor-pointer hover:underline hover:text-xl hover:tansition-all hover:duration-200 hover:ease-out hover:text-red-100"
          >
            Se connecter
          </span>
        </p>
      </div>
    </div>
  );

  const LoginForm = () => (
    <div className="form">
      <div className="inputs space-y-10 flex flex-col">
        <div className="flex flex-col w-full ml-4">
          <label htmlFor="email" className="text-gray-50 mb-1">
            Email
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              id="email"
              className="w-full p-2 rounded-3xl bg-transparent border text-gray-50 placeholder:text-grey-200 placeholder:pl-2"
              placeholder="Entrez votre email"
            />
            <span className="translate-x-[-40px]">
              <MailIcon size={18} stroke-width="2.5px" color="#fff" />
            </span>
          </div>
        </div>

        <div className="flex flex-col w-full ml-4">
          <label htmlFor="password" className="text-gray-50 mb-1">
            Mot de passe
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="password"
              id="password"
              className="w-full p-2 rounded-3xl bg-transparent border text-gray-50 placeholder:text-grey-200 placeholder:pl-2"
              placeholder="Entrez votre mot de passe"
            />
            <span className="translate-x-[-40px]">
              <LockIcon size={18} stroke-width="2.5px" color="#fff" />
            </span>
          </div>
        </div>
      </div>

      <div className="button flex w-[95%] mx-auto h-12 bg-white text-gray-900 border-none outline-none rounded-3xl cursor-pointer text-xl font-semibold items-center justify-center mt-16">
        <button type="submit" className="">
          Se connecter
        </button>
      </div>
      <div className="">
        <p className="text-white text-center mt-6">
          Vous n'avez pas de compte ?{" "}
          <span
            onClick={toggleForm}
            className="cursor-pointer hover:underline hover:text-xl hover:tansition-all hover:duration-200 hover:ease-out hover:text-red-100"
          >
            S'Enregistrer
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 mt-16 flex flex-col gap-5 bg-gray-800 bg-opacity-95 shadow-2xl rounded-md p-6 w-full max-w-md mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center text-gray-50">
          <User className="mr-2 text-red-500" />
          <span>Se Connecter</span>
        </div>
        <button onClick={onClose} className="text-gray-50 text-2xl">
          &times;
        </button>
      </div>
      <div className="wrapper">
        {isRegistering ? <RegisterForm /> : <LoginForm />}
      </div>
    </div>
  );
}
export default ConnectModal;
