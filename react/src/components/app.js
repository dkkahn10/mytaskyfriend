import React, {Component} from 'react';
import NotesSection from './NotesSection';
import Note from './Note';


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
    let projects = ""
    if (this.state.projectNames.length !== 0) {
        projects = this.state.projectNames.map(project => {
          let projectClick = () => this.handleProjectClick(project.id);
        return(
          <NotesSection
            key={project.id}
            id={project.id}
            title={project.title}
            projectClick={projectClick}
            projectId={this.state.projectId}
          />
        )
      });
    }

      return(
        <div className="projects-list">
          <input type="text" value={this.state.projectName} name="new_project" onChange={this.handleFieldChange} />
          <button className="NewProject" onClick={this.handleNewProject}>Add New Project</button>
          {projects}
        </div>
      );
    }
}


export default App;
