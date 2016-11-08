import React from 'react';

let Note = props => {

  return(
    <div className="notes">
      <p onClick={props.newNoteClick}></p>
      <p onClick={props.editNoteClick}></p>
      <p onClick={props.deleteNoteClick}></p>
    </div>
  );
};

export default Note;
