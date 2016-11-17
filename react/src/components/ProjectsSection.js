import React from 'react';

const ProjectsSection = props => {
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
          <button className="NewProject btn col s4" onClick={props.handleNewProject}>Add Project</button>
        </div>
      </form>
    </div>

    <div className="row">
      <div className="projects-list col s4">
        {props.allProjects}
      </div>
      <div className="tasks-list col s4">
        {props.projectTasks}
      </div>
    </div>
    <div className="row">
    <ul className="collapsible col s6" data-collapsible="expandable">
      <li>
        <div className="collapsible-header"><i className="material-icons">filter_drama</i>First</div>
        <div className="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div>
      </li>
      <li>
        <div className="collapsible-header"><i className="material-icons">place</i>Second</div>
        <div className="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div>
      </li>
    </ul>
    </div>
    </div>
  )
}

export default ProjectsSection;
