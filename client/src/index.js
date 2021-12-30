import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Game from './Game';
import reportWebVitals from './reportWebVitals';
import config from 'react-global-configuration';

config.set({
  blockSize: 20,
  gameDelay: 50
});

ReactDOM.render(
  <React.StrictMode>
    <Game blockSize={config.get('blockSize')}></Game>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
