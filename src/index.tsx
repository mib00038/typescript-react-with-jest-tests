import React from 'react';
import ReactDOM from 'react-dom';
import { AAPL, AMZN, DIS, WMT } from './__test__/fixtures';
import './index.css';
import Widget from "./components/Widget";

ReactDOM.render(
  <React.StrictMode>
    <Widget positions={[AAPL, AMZN, DIS, WMT]} />
  </React.StrictMode>,
  document.getElementsByTagName('main')[0],
);
