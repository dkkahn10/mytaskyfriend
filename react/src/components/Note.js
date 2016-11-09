import React, {Component} from 'react';

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Note: "",
      Notes: [],
    };
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleNewNote = this.handleNewNote.bind(this);
  };


  handleFieldChange(e) {
    this.setState({Note: e.target.value});
  }

  handleNewNote() {
    var newArray = this.state.Notes;
    newArray.push(this.state.Note);
    this.setState({Notes: newArray});
    this.setState({Note: ""});
  }

  render() {
    let notes = ""
    let i = 0;
    if (this.state.Notes.length !== 0) {
        notes = this.state.Notes.map(note => {
          let key = i++;
        return(
          <div key={key}>
            {note}
          </div>
        )
      });
    }

      return(
        <div className="notes">
          <p onClick={props.newNoteClick}>
            <button className="NewNote">Add New Note</button>
          </p>
          <p onClick={props.editNoteClick}>
            <button className="EditNote">Edit Note</button>
          </p>
          <p onClick={props.deleteNoteClick}>
            <button className="DeleteNote">Delete Note</button>
          </p>
          <p>
            <input type="text" value={this.state.Note} name="new_note" onChange={this.handleFieldChange} />
            <button className="AddNote" onClick={this.handleNewNote}>Add Note</button>
          </p>
          {notes}
        </div>
      );
    }
}


export default Note;


// import React from 'react';

// let Note = props => {
//   return(
//     <div className="notes">
//       <p onClick={props.newNoteClick}>
//         <button className="NewNote">Add New Note</button>
//       </p>
//       <p onClick={props.editNoteClick}>
//         <button className="EditNote">Edit Note</button>
//       </p>
//       <p onClick={props.deleteNoteClick}>
//         <button className="DeleteNote">Delete Note</button>
//       </p>
//     </div>
//   );
// };
//
// export default Note;
