// pages/_app.js
import { Provider } from "react-redux";
import store from "../reducers/store";
import Head from "next/head";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Head>
        <link rel="icon" href="./tomat.png" type="image/png" />
        <title>Pomodoro</title>
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}
