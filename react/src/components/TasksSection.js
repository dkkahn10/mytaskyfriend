import React, {Component} from 'react';
import Note from './Note';


class TasksSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Task: "",
      Tasks: [],
    };
  this.handleNewTaskClick = this.handleNewTaskClick.bind(this);
  this.handleEditTaskClick = this.handleEditTaskClick.bind(this);
  this.handleDeleteTaskClick = this.handleDeleteTaskClick.bind(this);
  this.handleFieldChange = this.handleFieldChange.bind(this)
  };

  handleFieldChange(e) {
    this.setState({Task: e.target.value});
  };

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
      this.setState({Tasks: newArray});
      this.setState({Task: ""});
    });
  };

  handleEditTaskClick() {
  };

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
      this.setState({Tasks: tasks});
      this.setState({Task: ""});
    });
  };

  componentDidMount() {
    let request = $.ajax({
      url: `api/v1/tasks/${this.props.projectId}`,
      method: "GET",
    })
      .done(data => {
        this.setState({ Tasks: data.tasks});
      });
    }

    render() {
      let notes = "";
        if (this.state.Tasks.length !== 0) {
            notes = this.state.Tasks.map(note => {
              let newTaskClick = () => this.handleNewTaskClick();
              let editTaskClick = () => this.handleEditTaskClick(note.id);
              let deleteTaskClick = () => this.handleDeleteTaskClick(note.id);
            return(
              <Note
              key={note.id}
              projectId={this.props.projectId}
              newTaskClick={newTaskClick}
              editTaskClick={editTaskClick}
              deleteTaskClick={deleteTaskClick}
              body={note.body}
              />
            )
          });
        }
      return(
        <div className="projects">
            <p>
              <input type="text" value={this.state.Task} name="new_note" onChange={this.handleFieldChange} />
              <button className="AddNote" onClick={this.handleNewTaskClick}>Add Note</button>
            </p>
            {notes}
        </div>
      );
    }
}

export default TasksSection;
