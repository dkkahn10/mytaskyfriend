import React from 'react';

let Task = props => {
  return(
    <div>
      <div className="card">
        <div className="card-content white-text">
          <span className="card-title"></span>
          <p>{props.body}</p>
        </div>
        <div className="card-action">
          <button className="btn EditTask" onClick={props.editTaskClick}>Edit Task</button>
          <button className="btn DeleteTask"onClick={props.deleteTaskClick}>Delete Task</button>
        </div>
      </div>
    </div>
  );
};

export default Task;
