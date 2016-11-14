import React from 'react';

const ProjectsSection = props => {

  return(
    <div className="row">
      <div className="projects-list col s4">
        <input type="text" value={props.newProjectName} name="newProjectName" onChange={props.handleFieldChange} />
        <button className="NewProject btn" onClick={props.handleNewProject}>Add New Project</button>
        {props.allProjects}
      </div>
      <div className="tasks-list col s4">
        {props.projectTasks}
      </div>
    </div>
  )
}
