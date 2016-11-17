import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.js';

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
});

$(document).ready(function(){
    $('.collapsible').collapsible();
  });
     

$('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrain_width: false, // Does not change width of dropdown to that of the activator
      hover: true, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: false, // Displays dropdown below the button
      alignment: 'left' // Displays dropdown with edge aligned to the left of button
    }
  );

  $('.dropdown-button').dropdown('open');
