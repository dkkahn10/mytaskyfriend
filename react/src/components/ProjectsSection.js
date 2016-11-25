import React from 'react';
import Color from './Color';

const ProjectsSection = props => {

  return(
    <div>
    <div className="row">

      <form className="new-project col s8">
        <div className="row valign-wrapper">
          <div className="input-field col s6">
            <i className="material-icons prefix">whatshot</i>
            <input id="icon_prefix" type="text" className="validate" value={props.newProjectName} name="newProjectName" onChange={props.handleFieldChange} />
            <label name="icon_prefix">New Project Title</label>
          </div>

          <button className="NewProject btn waves-effect waves-teal col s3" onClick={props.handleNewProject}>Add Project</button>
        </div>
      </form>

        <div className="col s4">
          <Color
            color={props.color}
            projectColor=''
            handleChange={props.handleFieldChange}
          />
        </div>

    </div>

    <div className="row">
      <div className="projects-list col s5">
        {props.allProjects}
      </div>
      <div className="tasks-list col s7">
        {props.projectTasks}
      </div>
    </div>
    </div>
  )
}

export default ProjectsSection;
