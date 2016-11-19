import React from 'react';


const ProjectEdit = props => {

  return(
    <div>
      {props.color}
      <input type="text" value={props.editProject} name="editProject" onChange={props.handleFieldChange} />
      <button className="EditProject btn" onClick={props.handleEdit}>Save Edit</button>
      <button className="Cancel btn" onClick={props.handleCancel}>Cancel</button>
    </div>
  )
}

export default ProjectEdit;
