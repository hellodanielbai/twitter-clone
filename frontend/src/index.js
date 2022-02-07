import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import axios from "axios";
import jwt_decode from "jwt_decode";

// ReactDOM.render(<App />, document.getElementById('root'));
// window.axios = axios;


document.addEventListener("DOMContentLoaded", () => {
    let store = configureStore();
    if(localStorage.jwtToken) {
        setAuthToken(localStorage.jwtToken);
        const decoded = jwt_decode(localStorage.jwtToekn);

        const preloadedState = {
            session: {
                isAUthenticated: true,
                user: decoded
            }
        }
        store = configureStore(preloadedState)

        const currentTime = Date.now() / 1000;

    } else {

        store = configureStore();
    }
    const root = document.getElementById('root');

    ReactDOM.render(<Root store={store} />, root);
})