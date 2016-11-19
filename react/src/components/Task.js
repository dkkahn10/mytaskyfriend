import React from 'react';

const Task = props => {
  return(
    <p>
      <span className="task">{props.body}</span>
      <span className="icons">
      <i className="material-icons" onClick={props.handleEditTaskClick}>edit</i>
      <i className="material-icons" onClick={props.handleDeleteTaskClick}>clear</i>
      </span>
    </p>
  );
};

export default Task;
