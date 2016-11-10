import React, {Component} from 'react';
import Note from './Note';


class NotesSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Note: "",
      Notes: [],
    };
  this.handleNewNoteClick = this.handleNewNoteClick.bind(this);
  this.handleEditNoteClick = this.handleEditNoteClick.bind(this);
  this.handleDeleteNoteClick = this.handleDeleteNoteClick.bind(this);
  this.handleFieldChange = this.handleFieldChange.bind(this)
  };

  handleFieldChange(e) {
    this.setState({Note: e.target.value});
  };

  handleNewNoteClick() {
    let request = $.ajax({
      url: "api/v1/tasks",
      method: "POST",
      data: {
        task: {
          body: this.state.Note,
          project_id: this.props.projectId
      }
    }
    })
    .done(data => {
      var newArray = this.state.Notes;
      newArray.push(data.task);
      this.setState({Notes: newArray});
      this.setState({Note: ""});
    });
  };

  handleEditNoteClick() {
  };

  handleDeleteNoteClick(id) {
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
      var newArray = this.state.Notes;
      let Notes = newArray.filter(note => {
        return note.id !== id })
      this.setState({Notes: Notes});
      this.setState({Note: ""});
    });
  };

  componentDidMount() {
    let request = $.ajax({
      url: `api/v1/tasks/${this.props.projectId}`,
      method: "GET",
    })
      .done(data => {
        this.setState({ Notes: data.tasks});
      });
    }

    render() {
      let notes = "";
        if (this.state.Notes.length !== 0) {
            notes = this.state.Notes.map(note => {
              let newNoteClick = () => this.handleNewNoteClick();
              let editNoteClick = () => this.handleEditNoteClick(note.id);
              let deleteNoteClick = () => this.handleDeleteNoteClick(note.id);
            return(
              <Note
              key={note.id}
              projectId={this.props.projectId}
              newNoteClick={newNoteClick}
              editNoteClick={editNoteClick}
              deleteNoteClick={deleteNoteClick}
              body={note.body}
              />
            )
          });
        }
      return(
        <div className="projects">
          <input type="text" value={this.state.Note} name="new_note" onChange={this.handleFieldChange} />
          <button className="AddNote btn" onClick={this.handleNewNoteClick}>Add Note</button>
          {notes}
        </div>
      );
    }
}

export default NotesSection;
