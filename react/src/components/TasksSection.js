import React from 'react';

const TasksSection = props => {
  return(
    <div>
      <div className="row">
        <form className="new-task col s12">
          <div className="row valign-wrapper">
            <div className="input-field col s12">
              <i className="material-icons prefix">lightbulb_outline</i>
              <input id="icon_prefix" type="text" className="validate" value={props.individualTask} name="new_note" onChange={props.handleFieldChange} />
              <label name="icon_prefix">New Task</label>
            </div>

            <button className="AddTask btn col s4" onClick={props.handleNewTaskClick}>Add Task</button>
          </div>
        </form>
      </div>
      <div className="row tasks">
        <ul className="collection col s11">
        {props.taskList}
        </ul>
      </div>
    </div>
  )
}

export default TasksSection;
