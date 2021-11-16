import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {UserContext, data} from "./Authentication/UserContext";

ReactDOM.render(
  <UserContext.Provider value={data}>
    <App />
  </UserContext.Provider>,
  document.getElementById('root')
);
