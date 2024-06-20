// pages/_app.js
import { Provider } from "react-redux";
import store from "../reducer/store";
import Head from "next/head";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Head>
        <link
          rel="icon"
          href="./apple1.png"
          
          type="image/png"
        />
        <title>Pomodoro</title>
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}
