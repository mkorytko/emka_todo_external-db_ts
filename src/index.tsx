import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

import store from "./store";
import "./assets/fonts/Roboto.scss";
import "react-toastify/dist/ReactToastify.css";
import "rc-pagination/assets/index.css";

import {
    TOAST_AUTO_CLOSE_TIME,
} from "./constants";
import "./style.scss";

import App from "./App";
import Loader from "./components/Loader";

const Initial = () => (
    <Provider store={store}>
        <ToastContainer
            position="top-left"
            autoClose={TOAST_AUTO_CLOSE_TIME}
            hideProgressBar
            draggable={false} />
        <App />
        <Loader />
    </Provider>
);

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement,
);
root.render(<Initial />);
