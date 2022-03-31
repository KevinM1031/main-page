import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import {HashRouter} from "react-router-dom";

ReactDOM.render(
    <HashRouter basename={"https://KevinM1031.github.io/main-page"}>
        <App />
    </HashRouter>,
    document.getElementById('root')
);

