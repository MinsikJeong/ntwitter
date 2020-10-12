import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import fBase from "fBase";
console.log(fBase);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
