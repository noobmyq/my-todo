/*
 * @Date: 2021-12-21 18:08:09
 * @LastEditTime: 2021-12-21 19:25:28
 * @FilePath: /new-simple-todo/my-todo/frontend/src/index.tsx
 */
import React from 'react';
// import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
// import reportWebVitals from './reportWebVitals';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import Header from "./components/Header";
import { ThemeProvider } from 'emotion-theming';

ReactDOM.render(<App />, document.getElementById('root'))
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
// serviceWorker.unregister();