import React, {Component} from 'react';
import TasksLogic from './TasksLogic';
import Project from './Project';
import ProjectEdit from './ProjectEdit';
import ProjectsSection from './ProjectsSection';
import ProjectsLogic from './ProjectsLogic';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newProjectName: "",
      projectNames: [],
      projectId: "",
      editProject: "",
      editId: "",
      color: '',
      userProvider: ""
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

  handleNewProject(e) {
    e.preventDefault();
    $.ajax({
      url: "api/v1/projects",
      method: "POST",
      data: {
        project: {
          title: this.state.newProjectName
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
          title: this.state.editProject,
          color: this.state.color
        }
      },
      success: (data => {
        let currentArray = this.state.projectNames;
        let objIndex = currentArray.findIndex((obj) => obj.id === this.state.editId)
        let newProjectsArray = [...currentArray.slice(0, objIndex), data.project, ...currentArray.slice(objIndex + 1)]
        this.setState({
          projectNames: newProjectsArray,
          editId: "",
          color: ""
        })
      }).bind(this)
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

    $.ajax({
      url: "api/v1/users",
      method: "GET"
    })
    .done(data => {
      this.setState({ userProvider: data.user });
    })
  }

  render() {
    debugger;
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
        color={this.state.color}
      />
    );
  }
}

export default App;
