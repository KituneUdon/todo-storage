import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { StylesProvider } from '@material-ui/styles';
import App from './App';
import '@csstools/normalize.css';

ReactDOM.render(
  <React.StrictMode>
    <StylesProvider injectFirst>
      <App />
    </StylesProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
