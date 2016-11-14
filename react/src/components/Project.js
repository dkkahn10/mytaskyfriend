import React from 'react';

const Project = props => {

  return(
    <div className="card blue-grey darken-1">
      <div className="card-content white-text">
        <span className="card-title">{props.project.title}</span>
      </div>
      <div className="card-action">
        <button className="btn" onClick={props.projectClick}>View Tasks</button>
        <button className="btn" onClick={props.projectDelete}>Delete</button>
        <button className="btn" onClick={props.projectEdit}>Edit</button>
      </div>
    </div>
  )
}

export default Project;
