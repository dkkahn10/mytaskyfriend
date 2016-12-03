import React, { Component } from 'react';

class Autocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.formatUser = this.formatUser.bind(this);
  }

  formatUser() {
    // create artificial "event" for the App component's handleFieldChange to use
    let e = {
      target: {
        name: "addUser",
        value: $('input.autocomplete').val()
      }
    }
    this.props.handleFieldChange(e);
  }

  initJquery(options) {
    $('input.autocomplete').autocomplete({
      data: options
    });

    // handle user clicking on autocomplete dropdown
    // replace typed text in addUser state with full text from clicked dropdown
    $('.autocomplete-content').click(event => {
      let e = {
        target: {
          name: "addUser",
          value: event.target.innerText
        }
      }
      this.props.handleFieldChange(e);
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
              onChange={this.formatUser}
            />
          <label htmlFor="autocomplete-input">Add User to Project</label>
          </div>
        </div>
      </div>
    </div>
    )
  }


}



export default Autocomplete;
