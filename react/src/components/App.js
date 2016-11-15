import React, {Component} from 'react';
import ProjectsLogic from './ProjectsLogic';

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
    let projectNames = this.state.projectNames;
    let editProject = this.state.editProject;
    let handleFieldChange = this.handleFieldChange;
    let handleEdit = this.handleEdit;
    let handleCancel = this.handleCancel;
    let projectId = this.state.projectId;
    let editId = this.state.editId;
    let newProjectName = this.state.newProjectName;
    let handleNewProject = this.handleNewProject;
    let handleProjectClick = this.handleProjectClick;
    let handleDeleteClick = this.handleDeleteProject;
    let handleEditClick = this.handleEditProjectClick;

    return(
      <ProjectsLogic
        projectNames={projectNames}
        editProject={editProject}
        handleFieldChange={handleFieldChange}
        handleEdit={handleEdit}
        handleCancel={handleCancel}
        projectId={projectId}
        editId={editId}
        newProjectName={newProjectName}
        handleNewProject={handleNewProject}
        handleProjectClick={handleProjectClick}
        handleDeleteClick={handleDeleteClick}
        handleEditClick={handleEditClick}
      />
    );
  }
}

export default App;
