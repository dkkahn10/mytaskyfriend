import React, {Component} from 'react';
import Project from './Project';


class NotesSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedButtonId: null,
    }

  this.handleButtonClick = this.handleButtonClick.bind(this);
  };


    render() {
      let projects = this.props.data.map(project => {
        let specialClass;

        if (question.id === this.state.clickedButtonId) {
          specialClass = "selected"
        }

        let onProjectClick = () => this.handleButtonClick(project.id)
        return (
          <Project
            key={project.id}
            handleButtonClick={onQuestionClick}
          />
        )
      });

      return(
        <div className="projects">
          {projects}
        </div>
      );
    }
}


export default NotesSection;
