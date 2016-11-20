import React, {Component} from 'react';
import TasksLogic from './TasksLogic';

class TaskMethods extends Component {
  constructor(props) {
    super(props);
    this.state = {
      individualTask: "",
      allTasks: [],
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
    this.handleCommit = this.handleCommit.bind(this);
    this.handlePullRequest = this.handlePullRequest.bind(this);
  };

  handleFieldChange(e) {
    this.setState({ individualTask: e.target.value });
  };

  handleEditChange(e) {
    this.setState({ editTask: e.target.value });
  }

  handleNewTaskClick(e) {
    e.preventDefault();
    $.ajax({
      url: "api/v1/tasks",
      method: "POST",
      data: {
        task: {
          body: this.state.individualTask,
          project_id: this.props.projectId
        }
      }
    })
    .done(data => {
      var newArray = this.state.allTasks;
      newArray.push(data.task);
      this.setState({
        allTasks: newArray,
        individualTask: ""
      });
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
        var newArray = this.state.allTasks;
        let tasks = newArray.filter(task => {
          return task.id !== this.state.taskId })
        tasks.push(data.task);
        this.setState({
          allTasks: tasks,
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
      var newArray = this.state.allTasks;
      let tasks = newArray.filter(task => {
        return task.id !== id })
      this.setState({
        allTasks: tasks,
        individualTask: ""
      })
    });
  };

  handleTaskClick(id) {
  };

  handleCommit(id) {
    $.ajax({
      url: `api/v1/tasks/${id}/commit`,
      method: "GET",
    })
  }

  handlePullRequest(id) {
    $.ajax({
      url: `api/v1/tasks/${id}/pullrequest`,
      method: "GET",
    })
  }

  componentDidMount() {
    let request = $.ajax({
      url: `api/v1/tasks/${this.props.projectId}`,
      method: "GET",
    })
    .done(data => {
      this.setState({ allTasks: data.tasks });
    });
  }

  render() {
    let allTasks = this.state.allTasks;
    let individualTask = this.state.individualTask;
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
    let handleFieldChange = this.handleFieldChange;
    let handleCommit = this.handleCommit;
    let handlePullRequest = this.handlePullRequest;

    return(
      <TasksLogic
        allTasks={allTasks}
        individualTask={individualTask}
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
        handleCommit={handleCommit}
        handlePullRequest={handlePullRequest}
      />
    )
  }
}

export default TaskMethods;
