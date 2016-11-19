import React from 'react';

const TaskEdit = props => {
  return(
    <div>
      <input type="text" value={props.editTask} name="new_note" onChange={props.handleEditChange} />
      <button className="EditNote btn" onClick={props.handleEditTask}>Edit Task</button>
      <button className="Cancel btn" onClick={props.handleCancelTask}>Cancel</button>
    </div>
  )
}

export default TaskEdit;
