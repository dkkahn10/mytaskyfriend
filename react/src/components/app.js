import React, {Component} from 'react';
import TasksSection from './TasksSection';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectName: "",
      projectNames: [],
      projectId: "",
      editProject: "",
      editId: "",
    };
    this.handleProjectClick = this.handleProjectClick.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleNewProject = this.handleNewProject.bind(this);
    this.handleDeleteProject = this.handleDeleteProject.bind(this);
    this.handleEditProject = this.handleEditProject.bind(this);
    this.handleEditProjectClick = this.handleEditProjectClick.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  };


  handleFieldChange(e) {
    this.setState({projectName: e.target.value});
  }

  handleEditProject(e) {
    this.setState({editProject: e.target.value})
  }

  handleNewProject() {
    let _this = this;
    debugger;
    let request = $.ajax({
      url: "api/v1/projects",
      method: "POST",
      data: {
        project: {
          title: _this.state.projectName,
      }
    }
    })
    .done(data => {
      var newArray = _this.state.projectNames;
      newArray.push(data.project);
      _this.setState({projectNames: newArray});
      _this.setState({projectName: ""});
    });
  }

  handleProjectClick(id) {
    this.setState({ projectId: id});
  };

  handleEditProjectClick(project) {
    this.setState({ editId: project.id, editProject: project.title });
  };

  handleEdit() {
    let _this = this;
    $.ajax({
      url: `api/v1/projects/${_this.state.editId}`,
      method: "PATCH",
      data: {
        project: {
          project_id: this.state.editId,
          title: this.state.editProject
        }
      },
      success: (data) => {
        var newArray = _this.state.projectNames;
        let projects = newArray.filter(project => {
          return project.id !== _this.state.editId })
        projects.push(data.project);
        _this.setState({ projectNames: projects });
        _this.setState({ editId: "" });
      }
    })
  }

  handleCancel() {
    this.setState({ editId: "",});
  }

  handleDeleteProject(id) {
    let _this = this;
    let request = $.ajax({
      url: `api/v1/projects/${id}`,
      method: "DELETE",
      data: {
        project: {
          project_id: id,
        }
      },
      success: (data) => {
        var newArray = _this.state.projectNames;
        let projects = newArray.filter(project => {
          return project.id !== id })
        _this.setState({ projectNames: projects });
        _this.setState({ projectName: "" });
      }
    })
  };

  componentDidMount() {
    let request = $.ajax({
      url: "api/v1/projects",
      method: "GET",
    })
      .done(data => {
        this.setState({ projectNames: data.projects});
      });
    }

  render() {
    let projects = "";
    let projectTasks = "";
    let ProjectList = "";
      if (this.state.projectNames.length !== 0) {
          projects = this.state.projectNames.map(project => {
            let projectClick = () => this.handleProjectClick(project.id);
            let projectDelete = () => this.handleDeleteProject(project.id);
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
              ProjectList =
                <div>
                  <input type="text" value={this.state.editProject} name="new_project" onChange={this.handleEditProject} />
                  <button className="EditProject btn" onClick={this.handleEdit}>Edit Project</button>
                  <button className="Cancel btn" onClick={this.handleCancel}>Cancel</button>
                </div>
            } else {
              ProjectList =
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
              {ProjectList}
            </div>
          )
        });
      }

      return(
        <div className="row">
          <div className="projects-list col s4">
            <input type="text" value={this.state.projectName} name="new_project" onChange={this.handleFieldChange} />
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
