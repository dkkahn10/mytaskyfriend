import React from 'react';


const ProjectEdit = props => {
  return(
    <div>
      {props.colorSelect}
      <input type="text" value={props.editProject} name="editProject" onChange={props.handleFieldChange} />
      <div className="buttons project-edit">
      <button className="EditProject btn" onClick={props.handleEdit}>Save Edit</button>
      <button className="Cancel btn" onClick={props.handleCancel}>Cancel</button>
      </div>
    </div>
  )
}

export default ProjectEdit;
