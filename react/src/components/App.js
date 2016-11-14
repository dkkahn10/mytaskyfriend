import React, {Component} from 'react';
import TasksSection from './TasksSection';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newProjectName: "",
      projectNames: [],
      projectId: "",
      editProject: "",
      editId: ""
    };
    this.handleProjectClick = this.handleProjectClick.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleNewProject = this.handleNewProject.bind(this);
    this.handleDeleteProject = this.handleDeleteProject.bind(this);
    this.handleEditProjectClick = this.handleEditProjectClick.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  };


  handleFieldChange(e) {
    let shift = {};
    shift[e.target.name] = e.target.value;
    this.setState(shift);
  }

  handleNewProject() {
    $.ajax({
      url: "api/v1/projects",
      method: "POST",
      data: {
        project: {
          title: this.state.newProjectName,
        }
      }
    })
    .done(data => {
      var newArray = this.state.projectNames;
      newArray.push(data.project);
      this.setState ({
        projectNames: newArray,
        newProjectName: ""
      })
    });
  }

  handleProjectClick(project) {
    this.setState({ projectId: project.id });
  };

  handleEditProjectClick(project) {
    this.setState({ editId: project.id, editProject: project.title });
  };

  handleEdit() {
    $.ajax({
      url: `api/v1/projects/${this.state.editId}`,
      method: "PATCH",
      data: {
        project: {
          project_id: this.state.editId,
          title: this.state.editProject
        }
      },
      success: (data) => {
        var newArray = this.state.projectNames;
        let projects = newArray.filter(project => {
          return project.id !== this.state.editId })
        projects.push(data.project);
        this.setState({
          projectNames: projects,
          editId: ""
        })
      }
    })
  }

  handleCancel() {
    this.setState({ editId: "" });
  }

  handleDeleteProject(project) {
    $.ajax({
      url: `api/v1/projects/${project.id}`,
      method: "DELETE",
      data: {
        project: {
          project_id: project.id,
        }
      },
      success: (data) => {
        var newArray = this.state.projectNames;
        let projects = newArray.filter(survivingProject => {
          return survivingProject.id !== project.id })
        this.setState ({
          projectNames: projects,
          newProjectName: ""
        })
      }
    })
  };

  componentDidMount() {
    $.ajax({
      url: "api/v1/projects",
      method: "GET"
    })
    .done(data => {
      this.setState({ projectNames: data.projects });
    });
  }

  render() {
    let projects = "";
    let projectTasks = "";
    let projectList = "";
      if (this.state.projectNames.length !== 0) {
          projects = this.state.projectNames.map(project => {
            let projectClick = () => this.handleProjectClick(project);
            let projectDelete = () => this.handleDeleteProject(project);
            let projectEdit = () => this.handleEditProjectClick(project);
            if (this.state.projectId === project.id) {
              projectTasks = <TasksSection
                key={project.id}
                id={project.id}
                title={project.title}
                projectId={this.state.projectId}
              />
            }
            if (this.state.editId === project.id) {
              projectList =
                <div>
                  <input type="text" value={this.state.editProject} name="editProject" onChange={this.handleFieldChange} />
                  <button className="EditProject btn" onClick={this.handleEdit}>Save Edit</button>
                  <button className="Cancel btn" onClick={this.handleCancel}>Cancel</button>
                </div>
            } else {
              projectList =
                <div className="card blue-grey darken-1">
                  <div className="card-content white-text">
                    <span className="card-title">{project.title}</span>
                    <p></p>
                  </div>
                  <div className="card-action">
                    <button className="btn" onClick={projectClick}>View Tasks</button>
                    <button className="btn" onClick={projectDelete}>Delete</button>
                    <button className="btn" onClick={projectEdit}>Edit</button>
                  </div>
                </div>
            }
          return(
            <div key={project.id}>
              {projectList}
            </div>
          )
        });
      }

      return(
        <div className="row">
          <div className="projects-list col s4">
            <input type="text" value={this.state.newProjectName} name="newProjectName" onChange={this.handleFieldChange} />
            <button className="NewProject btn" onClick={this.handleNewProject}>Add New Project</button>
            {projects}
          </div>
          <div className="tasks-list col s4">
            {projectTasks}
          </div>
        </div>
      );
    }
}

export default App;
