import React from 'react';
import Autocomplete from './Autocomplete';

const ProjectEdit = props => {

  return(
    <div>
      {props.colorSelect}
      <input type="text" value={props.editProject} name="editProject" onChange={props.handleFieldChange} />
      <Autocomplete
        handleFieldChange={props.handleFieldChange}
        addUser={props.addUser}
      />
      <div className="buttons project-edit">
      <button className="EditProject btn" onClick={props.handleEdit}>Save Edit</button>
      <button className="Cancel btn" onClick={props.handleCancel}>Cancel</button>
      </div>
    </div>
  )
}

export default ProjectEdit;
