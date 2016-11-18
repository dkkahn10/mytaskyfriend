import React from 'react';

let Task = props => {
  return(
    <p>
      <span className="task">{props.body}</span>
      <span className="icons">
      <i className="material-icons" onClick={props.editTaskClick}>edit</i>
      <i className="material-icons" onClick={props.deleteTaskClick}>clear</i>
      </span>
    </p>
  );
};

export default Task;
