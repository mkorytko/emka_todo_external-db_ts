import React, { memo, useEffect } from "react";
import { useAppDispatch } from "./store/hooks";
import { getInitialState } from "./store/actions/app";
import Header from "./layout/header";
import Main from "./layout/main";

import "./App.scss";

function App() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getInitialState());
    }, []);

    return (
        <div className="App-wrapper">
            <Header />
            <Main />
        </div>
    );
}

export default memo(App);
