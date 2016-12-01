import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Router from '../router.js';

$(function() {
  ReactDOM.render(
    <Router/>,
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
