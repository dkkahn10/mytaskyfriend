import React from 'react';

const Task = props => {
  return(
    <p>
      <span className="task">{props.body}</span>
      <span className="icons">
      <i className="material-icons" onClick={props.handleEditTaskClick}>edit</i>
      <i className="material-icons" onClick={props.handleDeleteTaskClick}>clear</i>
      <button className="NewProject Commit Changes" onClick={props.handleCommitClick}>Commit</button>
      <button className="NewProject Pull Request" onClick={props.handlePullRequestClick}>Pull Request</button>
      </span>
    </p>
  );
};

export default Task;
