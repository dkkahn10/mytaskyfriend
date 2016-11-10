import React from 'react';

let Note = props => {
  return(
    <div className="notes">
      <p> {props.body} </p>
      <p onClick={props.editTaskClick}>
        <button className="btn EditNote">Edit Note</button>
      </p>
      <p onClick={props.deleteTaskClick}>
        <button className="btn DeleteNote">Delete Note</button>
      </p>
    </div>
  );
};

export default Note;
