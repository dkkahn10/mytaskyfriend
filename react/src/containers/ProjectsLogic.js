import React from 'react';
import TaskMethods from './TaskMethods';
import Project from '../components/Project';
import ProjectEdit from '../components/ProjectEdit';
import ProjectsSection from '../components/ProjectsSection';
import Color from '../components/Color';

const ProjectsLogic = props => {
  let allProjects = "";
  let projectTasks = "";
  let projectView = "";
  let projectNames = props.projectNames;
  let editProject = props.editProject;
  let handleFieldChange = props.handleFieldChange;
  let handleEdit = props.handleEdit;
  let handleCancel = props.handleCancel;
  let projectId = props.projectId;
  let editId = props.editId;
  let newProjectName = props.newProjectName;
  let handleNewProject = props.handleNewProject;

  if (projectNames.length !== 0) {
    allProjects = projectNames.map(project => {
      let handleProjectClick = () => props.handleProjectClick(project);
      let handleDeleteClick = () => props.handleDeleteClick(project);
      let handleEditClick = () => props.handleEditClick(project);
      let colorSelect =
        <Color
          color={props.color}
          projectColor={project.color}
          handleChange={props.handleFieldChange}
        />;
      if (projectId === project.id) {
        projectTasks =
          <TaskMethods
            key={project.id}
            id={project.id}
            title={project.title}
            projectId={projectId}
          />
      }
      if (editId === project.id) {
        projectView =
          <ProjectEdit
            editProject={editProject}
            handleFieldChange={handleFieldChange}
            handleEdit={handleEdit}
            handleCancel={handleCancel}
            id={editId}
            colorSelect={colorSelect}
          />
      } else {
        projectView =
          <Project
            title={project.title}
            id={project.id}
            handleProjectClick={handleProjectClick}
            handleEditClick={handleEditClick}
            handleDeleteClick={handleDeleteClick}
            color={project.color}
          />
      }
      return(
        <div key={project.id}>
          {projectView}
        </div>
      )
    });
  }

  return(
    <ProjectsSection
      newProjectName={newProjectName}
      handleFieldChange={handleFieldChange}
      handleNewProject={handleNewProject}
      allProjects={allProjects}
      projectTasks={projectTasks}
    />
  );
}

export default ProjectsLogic;
