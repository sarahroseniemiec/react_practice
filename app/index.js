import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/App'

document.addEventListener('DOMContentLoaded', function() {
  console.log('hello');
  ReactDOM.render(<App />, document.getElementById('app'));


});
