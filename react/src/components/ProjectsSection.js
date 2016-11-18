import React from 'react';

const ProjectsSection = props => {
  let color = `${props.color}`;

  return(
    <div>
    <div className="row">
      <form className="new-project col s12">
        <div className="row valign-wrapper">
          <div className="input-field col s6">
            <i className="material-icons prefix">whatshot</i>
            <input id="icon_prefix" type="text" className="validate" value={props.newProjectName} name="newProjectName" onChange={props.handleFieldChange} />
            <label name="icon_prefix">New Project Title</label>
          </div>

          <button className="NewProject btn col s3" onClick={props.handleNewProject}>Add Project</button>
        </div>
      </form>
    </div>

    <div className="row">
      <div className="projects-list col s5">
        {props.allProjects}
      </div>
      <div className="tasks-list col s6">
        {props.projectTasks}
      </div>
    </div>

    </div>
  )
}

export default ProjectsSection;
