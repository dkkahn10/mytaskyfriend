import React from 'react';

const Project = props => {
  return(
    <div className="card blue-grey darken-1">
      <div className="card-content white-text">
        <span className="card-title">{props.title}</span>
      </div>
      <div className="card-action">
        <button className="btn" onClick={props.handleProjectClick}>View Tasks</button>
        <button className="btn" onClick={props.handleDeleteClick}>Delete</button>
        <button className="btn" onClick={props.handleEditClick}>Edit</button>
      </div>
    </div>
  )
}

export default Project;
