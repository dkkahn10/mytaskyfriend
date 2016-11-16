import React from 'react';

const TasksSection = props => {
  return(
    <div className="projects">
      <input type="text" value={props.individualTask} name="new_note" onChange={props.handleFieldChange} />
      <button className="AddTask btn" onClick={props.handleNewTaskClick}>Add Task</button>
      {props.taskList}
    </div>
  )
}

export default TasksSection;
