import React, {Component} from 'react';
import NotesSection from './NotesSection';
import Project from './Project';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectName: "",
      projectNames: [],
    };
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

  render() {
    var projectNames = "";

      return(
        <div className="projects-list">
          <input type="text" value={this.state.projectName} name="new_project" onChange={this.handleFieldChange} />
          <button className="NewProject" onClick={this.handleNewProject}>Add New Project</button>
        </div>
      );
    }
}


export default App;
