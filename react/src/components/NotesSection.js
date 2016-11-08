import React, {Component} from 'react';
import Note from './Note';


class NotesSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }

  this.handleNewNoteClick = this.handleNewNoteClick.bind(this);
  this.handleEditNoteClick = this.handleEditNoteClick.bind(this);
  this.handleDeleteNoteClick = this.handleDeleteNoteClick.bind(this);
  };

    render() {
      let notes = this.props.data.map(note => {
          let newNoteClick = () =>
          this.handleNewNoteClick();
          let editNoteClick = () =>
          this.handleEditNoteClick();
          let deleteNoteClick = () =>
          this.handleDeleteNoteClick();
        return (
          <Note
            newNoteClick={newNoteClick}
            editNoteClick={editNoteClick}
            deleteNoteClick={deleteNoteClick}
          />
        )
      });

      return(
        <div className="projects">
          {notes}
        </div>
      );
    }
}

export default NotesSection;
