import React from 'react';

let Note = props => {

  return(
    <div className="notes">
      <p onClick={props.newNoteClick}>
        <button className="NewNote">Add New Note</button>
      </p>
      <p onClick={props.editNoteClick}></p>
        <button className="EditNote">Edit Note</button>
      </p>
      <p onClick={props.deleteNoteClick}></p>
        <button className="DeleteNote">Delete Note</button>
      </p>
    </div>
  );
};

export default Note;
