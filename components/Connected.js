// components/Connected.js
import styles from "../styles/Connected.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserRound, Lock } from "lucide-react";
function Connected() {
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.user.value);
  // [signupUsername, signupEmail, signupPassword,] >>> inscription
  const [signupUsername, setSignupUsername] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  // [loginEmail, loginPassword,] >>> connexion
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  //* INSCRIPTION
  const handleRegister = () => {
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

  // *CONNECTION
  const handleConnection = () => {
    fetch("http://localhost:3000/users/login", {
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

  //*  DECONNEXION
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <form action="" className={styles.form}>
          <h1 className={styles.h1}>Connexion</h1>
          <div className={styles.inputBox}>
            <input
              className={styles.input}
              type="text"
              placeholder="Ton email"
              required
            />
            <span className={styles.icon}>
              <UserRound size={18} stroke-width="2.5px" color="#fff" />
            </span>
          </div>
          <div className={styles.inputBox}>
            <input
              className={styles.input}
              type="password"
              placeholder="Ton mot de passe"
              required
            />
            <span className={styles.icon}>
              <Lock size={18} stroke-width="2.5px" color="#fff" />
            </span>
          </div>

          <div className={styles.rememberForgot}>
            <label className={styles.label}>
              <input type="checkbox" className={styles.input} />
              Souviens-toi de moi
            </label>
            <a href="#" className={styles.a}>
              Mot de passe oublié ?
            </a>
          </div>

          <div className="button">
            <button type="submit" className={styles.button}>
              Se connecter
            </button>
          </div>

          <div class={styles.registerLink}>
            <p className={styles.p}>
              Vous n'avez pas de compte ?{" "}
              <a href="#" className={styles.a}>
                S'enregistrer
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Connected;
