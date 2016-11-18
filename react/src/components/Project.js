import React from 'react';

const Project = props => {
  return(
    <div className="card">
      <div className="card-content black-text">
        <div className="card-title">{props.title}</div>
      </div>
      <div className="card-action">
        <ul>
          <li className="teal-text text-lighten-1" onClick={props.handleProjectClick}>
            <i className="material-icons">view_list</i>
            <a style={{color: 'inherit'}}>View Tasks</a></li>
          <li className="green-text text-lighten-2" onClick={props.handleEditClick}>
            <i className="material-icons">edit</i>
            <a style={{color: 'inherit'}}>Edit</a></li>
          <li className="red-text text-lighten-3" onClick={props.handleDeleteClick}>
            <i className="material-icons">delete</i>
            <a style={{color: 'inherit'}}>Delete</a></li>
        </ul>
      </div>
    </div>
  )
}

export default Project;
