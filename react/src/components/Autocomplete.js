import React, { Component } from 'react';

class Autocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  initJquery(options) {
    $('input.autocomplete').autocomplete({
      data: options
    });
  }

  componentDidMount() {
    $.ajax({
      url: "api/v1/users",
      method: "GET"
    })
    .done(data => {
      this.initJquery(data.users);
    });

  }

  render() {
    return(
      <div className="row">
      <div className="col s12">
        <div className="row">
          <div className="input-field col s12">
            <i className="material-icons prefix">textsms</i>
            <input
              type="text"
              id="autocomplete-input"
              className="autocomplete"
              name="addUser"
              value={this.props.addUser}
              onChange={this.props.handleFieldChange}
            />
            <label htmlFor="autocomplete-input">Autocomplete</label>
          </div>
        </div>
      </div>
    </div>
    )
  }


}



export default Autocomplete;
