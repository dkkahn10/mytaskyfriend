import React from 'react';

const Task = props => {
  return(
    <div>
      <div className="card blue-grey darken-1">
        <div className="card-content white-text">
          <span className="card-title"></span>
          <p>{props.body}</p>
        </div>
        <div className="card-action">
          <button className="btn EditTask" onClick={props.handleEditTaskClick}>Edit Task</button>
          <button className="btn DeleteTask"onClick={props.handleDeleteTaskClick}>Delete Task</button>
        </div>
      </div>
    </div>
  );
};

export default Task;
