import React from 'react';
import ReactDOM from 'react-dom';
import DemoApp from './DemoApp';
import Example from './Example';

ReactDOM.render(
  <React.StrictMode>
    <DemoApp />
    <Example />
  </React.StrictMode>,
  document.getElementById('root'),
);
