import React from 'react';
import Select from 'react-select';
// import 'react-select/dist/react-select.css';

const ProjectEdit = props => {

  const getOptions = (input) => {
    return fetch(`api/v1/users/`)
      .then((response) => {
        return response.json();
      }).then((json) => {
        return { options: json.users };
      });
  }

  const eventNormalizer = (selection) => {
    // create artificial "event" for the App component's handleFieldChange to use
    let e = {
      target: {
        name: "addUser",
        value: selection.value
      }
    }
    props.handleFieldChange(e);
  }

  return(
    <div>
      {props.colorSelect}
      <input type="text" value={props.editProject} name="editProject" onChange={props.handleFieldChange} />
      <Select.Async
        name="addUser"
        loadOptions={getOptions}
        onChange={eventNormalizer}
        placeholder="Add User to Project (username)"
      />
      <div className="buttons project-edit">
      <button className="EditProject btn" onClick={props.handleEdit}>Save Edit</button>
      <button className="Cancel btn" onClick={props.handleCancel}>Cancel</button>
      </div>
    </div>
  )
}

export default ProjectEdit;
