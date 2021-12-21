/*
 * @Date: 2021-12-21 18:08:09
 * @LastEditTime: 2021-12-21 18:17:34
 * @FilePath: /new-simple-todo/my-todo/frontend/src/components/App.tsx
 */
import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Layout } from 'antd'
// import {observer} from "mo"



// default
function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
