import React, { Component } from 'react';

const Color = props => {
  
  let selectedColor = props.color;
  if (props.color === '') {
    selectedColor = props.projectColor;
  }

  let selectedColorStyle = {
    color: '#fff',
    backgroundColor: selectedColor,
  }

  let icon = <i className="fa fa-circle"></i>;

  return (
    <form className="color-select col s12">
      <div className="col s6">
        <label>Label Color</label>
      </div>
      <div className="row">
        <div className="input-field col s12">
          <select
            name="color"
            value={selectedColor}
            className="browser-default"
            style={selectedColorStyle}
            onChange={props.handleChange}>
            <option value="" disabled>Choose a color</option>
            <option value="#00bfa5">Teal</option>
            <option value="#00acc1">Turquoise</option>
            <option value="#ff5722">Red Orange</option>
            <option value="#03a9f4">Sky Blue</option>
            <option value="#ff1744">Red</option>
            <option value="#1a237e">Indigo</option>
          </select>
        </div>
      </div>
    </form>
  );
}

export default Color;
