import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.js';
// require('../../../node-modules/react-select/dist/react-select.css');

$(function() {
  ReactDOM.render(
    <App/>,
    document.getElementById('app')
  );
});

$('document').ready(function() {
  setTimeout(function() {
    $('#flash').slideUp();
  }, 10000);

  $('select').material_select();
  $('.collapsible').collapsible();
});
