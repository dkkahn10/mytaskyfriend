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
    var newArray = this.state.projectNames;
    newArray.push(this.state.projectName);
    this.setState({projectNames: newArray})
    this.setState({projectName: ""})
  }

  handleProjectClick(id) {
    event.preventDefault();
    .done(data => {
      this.setState({ projectId: id});
    });
  };

  componentDidMount() {
    .done(data => {
      this.setState({ projects: data });
    });
  }

  render() {
    let projects = ""
    let i = 0;
    if (this.state.projectNames.length !== 0) {
        projects = this.state.projectNames.map(project => {
          let key = i++;
          let projectClick = () => this.handleProjectClick(project.id);
        return(
        <NotesSection
        key={key}
        id={key}
        name={project}
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
