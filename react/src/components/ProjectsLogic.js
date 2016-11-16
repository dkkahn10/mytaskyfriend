import React from 'react';
import TaskMethods from './TaskMethods';
import Project from './Project';
import ProjectEdit from './ProjectEdit';
import ProjectsSection from './ProjectsSection';

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
          />
      } else {
        projectView =
          <Project
            title={project.title}
            handleProjectClick={handleProjectClick}
            handleEditClick={handleEditClick}
            handleDeleteClick={handleDeleteClick}
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
