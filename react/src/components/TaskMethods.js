import React, {Component} from 'react';
import TasksLogic from './TasksLogic';

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
    let Tasks = this.state.Tasks;
    let handleNewTaskClick = this.handleNewTaskClick;
    let handleEditTaskClick = this.handleEditTaskClick;
    let handleEditTask = this.handleEditTask;
    let handleDeleteTaskClick = this.handleDeleteTaskClick;
    let handleTaskClick = this.handleTaskClick;
    let taskId = this.state.taskId;
    let projectId = this.props.projectId;
    let editTask = this.state.editTask;
    let handleEditChange = this.handleEditChange;
    let handleCancelTask = this.handleCancelTask;
    let Task = this.state.Task;
    let handleFieldChange = this.handleFieldChange;

    return(
      <TasksLogic
        Tasks={Tasks}
        Task={Task}
        handleNewTaskClick={handleNewTaskClick}
        handleEditTaskClick={handleEditTaskClick}
        handleEditTask={handleEditTask}
        handleDeleteTaskClick={handleDeleteTaskClick}
        handleTaskClick={handleTaskClick}
        taskId={taskId}
        projectId={projectId}
        editTask={editTask}
        handleEditChange={handleEditChange}
        handleCancelTask={handleCancelTask}
        handleFieldChange={handleFieldChange}
      />
    )
  }
}

export default TaskMethods;
