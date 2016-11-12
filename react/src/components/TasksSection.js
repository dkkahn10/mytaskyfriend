import React, {Component} from 'react';
import Task from './Task';


class TasksSection extends Component {
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
    let request = $.ajax({
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
      this.setState({ Tasks: newArray });
      this.setState({ Task: "" });
    });
  };

  handleEditTaskClick(task) {
    this.setState({ taskId: task.id, editTask: task.body });
  };

  handleCancelTask() {
    this.setState({ taskId: ""});
  }

  handleEditTask() {
    let _this = this;
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
        var newArray = _this.state.Tasks;
        let tasks = newArray.filter(task => {
          return task.id !== this.state.taskId })
        tasks.push(data.task);
        _this.setState({ Tasks: tasks });
        _this.setState({ taskId: "" });
      }
    })
  }

  handleDeleteTaskClick(id) {
    let request = $.ajax({
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
      this.setState({ Tasks: tasks });
      this.setState({ Task: "" });
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
    let nonEditTask = "";
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
              nonEditTask = <Task
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
              {nonEditTask}
            </div>
          )
        });
      }
    return(
      <div className="projects">
        <input type="text" value={this.state.Task} name="new_note" onChange={this.handleFieldChange} />
        <button className="AddTask btn" onClick={this.handleNewTaskClick}>Add Task</button>
        {tasks}
      </div>
    );
  }
}

export default TasksSection;
