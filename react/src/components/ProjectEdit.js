import React from 'react';
import Autocomplete from './Autocomplete';

const ProjectEdit = props => {

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
      <Autocomplete
        handleFieldChange={props.handleFieldChange}
      />
      <div className="buttons project-edit">
      <button className="EditProject btn" onClick={props.handleEdit}>Save Edit</button>
      <button className="Cancel btn" onClick={props.handleCancel}>Cancel</button>
      </div>
    </div>
  )
}

export default ProjectEdit;
