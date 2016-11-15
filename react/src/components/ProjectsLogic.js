import React from 'react';
import TasksLogic from './TasksLogic';
import Project from './Project';
import ProjectEdit from './ProjectEdit';
import ProjectsSection from './ProjectsSection';

const ProjectsLogic = props => {
  let allProjects = "";
  let projectTasks = "";
  let projectList = "";
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
      let handleProjectClick = props.handleProjectClick(project);
      let handleDeleteClick = props.handleDeleteClick(project);
      let handleEditClick = props.handleEditClick(project);
      if (projectId === project.id) {
        projectTasks =
          <TasksLogic
            key={project.id}
            id={project.id}
            title={project.title}
            projectId={projectId}
          />
      }
      if (editId === project.id) {
        projectList =
          <ProjectEdit
            editProject={editProject}
            handleFieldChange={handleFieldChange}
            handleEdit={handleEdit}
            handleCancel={handleCancel}
          />
      } else {
        projectList =
          <Project
            title={project.title}
            handleProjectClick={handleProjectClick}
            handleEditClick={handleEditClick}
            handleDeleteClick={handleDeleteClick}
          />
      }
      return(
        <div key={project.id}>
          {projectList}
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
