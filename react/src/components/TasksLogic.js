import React, {Component} from 'react';
import Task from './Task';


class TasksLogic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Task: "",
      Tasks: [],
      taskId: "",
      editTask: "",
    };
  this.handleTaskClick = this.handleTaskClick.bind(this);
  this.handleNewTaskClick = this.handleNewTaskClick.bind(this);
  this.handleEditTaskClick = this.handleEditTaskClick.bind(this);
  this.handleDeleteTaskClick = this.handleDeleteTaskClick.bind(this);
  this.handleFieldChange = this.handleFieldChange.bind(this);
  this.handleEditTask = this.handleEditTask.bind(this);
  this.handleEditChange = this.handleEditChange.bind(this);
  this.handleCancelTask = this.handleCancelTask.bind(this);
  };

  handleFieldChange(e) {
    this.setState({ Task: e.target.value });
  };

  handleEditChange(e) {
    this.setState({ editTask: e.target.value });
  }

  handleNewTaskClick() {
    $.ajax({
      url: "api/v1/tasks",
      method: "POST",
      data: {
        task: {
          body: this.state.Task,
          project_id: this.props.projectId
        }
      }
    })
    .done(data => {
      var newArray = this.state.Tasks;
      newArray.push(data.task);
      this.setState({
        Tasks: newArray,
        Task: ""
      })
    });
  };

  handleEditTaskClick(task) {
    this.setState({ taskId: task.id, editTask: task.body });
  };

  handleCancelTask() {
    this.setState({ taskId: ""});
  }

  handleEditTask() {
    $.ajax({
      url: `api/v1/tasks/${this.state.taskId}`,
      method: "PATCH",
      data: {
        task: {
          task_id: this.state.taskId,
          body: this.state.editTask
        }
      },
      success: (data) => {
        var newArray = this.state.Tasks;
        let tasks = newArray.filter(task => {
          return task.id !== this.state.taskId })
        tasks.push(data.task);
        this.setState({
          Tasks: tasks,
          taskId: ""
        })
      }
    })
  }

  handleDeleteTaskClick(id) {
    $.ajax({
      url: `api/v1/tasks/${id}`,
      method: "DELETE",
      data: {
        task: {
          task_id: id,
        }
      }
    })
    .done(data => {
      var newArray = this.state.Tasks;
      let tasks = newArray.filter(task => {
        return task.id !== id })
      this.setState({
        Tasks: tasks,
        Task: ""
      })
    });
  };

  handleTaskClick(id) {
  };

  componentDidMount() {
    let request = $.ajax({
      url: `api/v1/tasks/${this.props.projectId}`,
      method: "GET",
    })
    .done(data => {
      this.setState({ Tasks: data.tasks });
    });
  }

  render() {
    let tasks = "";
    let editTask = "";
      if (this.state.Tasks.length !== 0) {
          tasks = this.state.Tasks.map(task => {
            let nonEditKey = `nonEdit_${task.id}`;
            let taskBlock = `taskBlock_${task.id}`;
            let newTaskClick = () => this.handleNewTaskClick();
            let editTaskClick = () => this.handleEditTaskClick(task);
            let editTask = () => this.handleEditTask();
            let deleteTaskClick = () => this.handleDeleteTaskClick(task.id);
            let taskClick = () => this.handleTaskClick(task.id);
            if (this.state.taskId !== task.id) {
              editTask = <Task
              key={nonEditKey}
              projectId={this.props.projectId}
              newTaskClick={newTaskClick}
              editTaskClick={editTaskClick}
              deleteTaskClick={deleteTaskClick}
              taskClick={taskClick}
              body={task.body}
              />
            } else {
              editTask =
              <div>
                <input type="text" value={this.state.editTask} name="new_note" onChange={this.handleEditChange} />
                <button className="EditNote btn" onClick={editTask}>Edit Task</button>
                <button className="Cancel btn" onClick={this.handleCancelTask}>Cancel</button>
              </div>
            }
          return(
            <div key={taskBlock}>
              {editTask}
            </div>
          )
        });
      }
    return(

      <div>
      <div className="row">
        <form className="new-task col s12">
          <div className="row valign-wrapper">
            <div className="input-field col s12">
              <i className="material-icons prefix">new_releases</i>
              <input id="icon_prefix" type="text" className="validate" value={this.state.Task} name="new_note" onChange={this.handleFieldChange} />
              <label name="icon_prefix">New Task</label>
            </div>

            <button className="AddTask btn col s4" onClick={this.handleNewTaskClick}>Add Task</button>
          </div>
        </form>
      </div>
      <div className="row">
      {tasks}
      </div>
      </div>

    );
  }
}

export default TasksLogic;
