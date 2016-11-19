import React, { Component } from 'react';

class Color extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: '',
      selectedProjectId: null
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    let option = e.target.value;
    this.setState({
      color: option
    });
    $('.browser-default').css({
      'background-color': option,
      'color': '#fff'});
  }

  render() {
    let icon = <i className="fa fa-circle"></i>;

    return (
      <form className="color-select col s12">
      <div className="col s6">
      <label>Label Color</label>
      </div>
      <div className="row">
      <div className="input-field col s12">
      <select
        value={this.state.color}
        className="browser-default"
        onChange={this.handleChange}>
        <option value="">Choose a color</option>
        <option name="teal" value="#00bfa5">Teal</option>
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
}

export default Color;
