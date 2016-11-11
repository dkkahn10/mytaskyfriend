import React, {Component} from 'react';
import TasksSection from './TasksSection';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectName: "",
      projectNames: [],
      projectId: "",
    };
    this.handleProjectClick = this.handleProjectClick.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleNewProject = this.handleNewProject.bind(this);
    this.handleDeleteProject = this.handleDeleteProject.bind(this);
  };


  handleFieldChange(e) {
    this.setState({projectName: e.target.value});
  }

  handleNewProject() {
    let request = $.ajax({
      url: "api/v1/projects",
      method: "POST",
      data: {
        project: {
          title: this.state.projectName,
      }
    }
    })
    .done(data => {
      var newArray = this.state.projectNames;
      newArray.push(data.project);
      this.setState({projectNames: newArray});
      this.setState({projectName: ""});
    });
  }

  handleProjectClick(id) {
    this.setState({ projectId: id});
  };

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
      if (this.state.projectNames.length !== 0) {
          projects = this.state.projectNames.map(project => {
            let projectClick = () => this.handleProjectClick(project.id);
            let projectDelete = () => this.handleDeleteProject(project.id);
            if (this.state.projectId === project.id) {
              projectTasks = <TasksSection
                key={project.id}
                id={project.id}
                title={project.title}
                projectId={this.state.projectId}
              />
            }
          return(
            <div key={project.id}>
              <div className="card blue-grey darken-1">
                <div className="card-content white-text">
                  <span className="card-title">{project.title}</span>
                  <p></p>
                </div>
                <div className="card-action">
                  <button className="btn" onClick={projectClick}>View Tasks</button>
                  <button className="btn" onClick={projectDelete}>Delete</button>
                </div>
              </div>
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
