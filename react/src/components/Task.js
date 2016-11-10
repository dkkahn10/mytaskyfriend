import React from 'react';

let Task = props => {
  return(
    <div className="notes">
      <p>
        {props.body}
      </p>
      <p onClick={props.editTaskClick}>
        <button className="btn EditTask">Edit Task</button>
      </p>
      <p onClick={props.deleteTaskClick}>
        <button className="btn DeleteTask">Delete Task</button>
      </p>
    </div>
  );
};

export default Task;
