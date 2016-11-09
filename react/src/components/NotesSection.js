import React, {Component} from 'react';
import Note from './Note';


class NotesSection extends Component {
  constructor(props) {
    super(props);
  this.handleNewNoteClick = this.handleNewNoteClick.bind(this);
  this.handleEditNoteClick = this.handleEditNoteClick.bind(this);
  this.handleDeleteNoteClick = this.handleDeleteNoteClick.bind(this);
  };

  handleNewNoteClick() {

  };

  handleEditNoteClick() {

  };

  handleDeleteNoteClick() {

  };

    render() {
      let options = "";
      if (this.props.projectId === this.props.id) {
        let newNoteClick = () => this.handleNewNoteClick();
        let editNoteClick = () => this.handleEditNoteClick();
        let deleteNoteClick = () => this.handleDeleteNoteClick();
        options = <Note
        newNoteClick={newNoteClick}
        editNoteClick={editNoteClick}
        deleteNoteClick={deleteNoteClick}
        />
        }
      return(
        <div className="projects">
          <div onClick={this.props.projectClick}>
            <p>{this.props.title}</p>
            {options}
          </div>
        </div>
      );
    }
}

export default NotesSection;
