import React from 'react';
import Task from './Task';
import TaskEdit from './TaskEdit';
import TasksSection from './TasksSection';

const TasksLogic = props => {
  let taskList = "";
  let taskView = "";
  let allTasks = props.allTasks;
  let handleNewTaskClick = props.handleNewTaskClick;
  let handleEditTaskClick = props.handleEditTaskClick;
  let handleEditTask = props.handleEditTask;
  let handleDeleteTaskClick = props.handleDeleteTaskClick;
  let handleTaskClick = props.handleTaskClick;
  let taskId = props.taskId;
  let projectId = props.projectId;
  let editTask = props.editTask;
  let handleEditChange = props.handleEditChange;
  let handleCancelTask = props.handleCancelTask;
  let individualTask = props.individualTask;
  let handleFieldChange = props.handleFieldChange;

  if (allTasks.length !== 0) {
    taskList = allTasks.map(task => {
      let nonEditKey = `nonEdit_${task.id}`;
      let taskBlock = `taskBlock_${task.id}`;
      let newTaskClick = () => props.handleNewTaskClick();
      let handleEditTaskClick = () => props.handleEditTaskClick(task);
      let handleEditTask = () => props.handleEditTask();
      let handleDeleteTaskClick = () => props.handleDeleteTaskClick(task.id);
      let handleTaskClick = () => props.handleTaskClick(task.id);
      if (taskId !== task.id) {
        taskView =
          <Task
            key={nonEditKey}
            handleEditTaskClick={handleEditTaskClick}
            handleDeleteTaskClick={handleDeleteTaskClick}
            body={task.body}
          />
      } else {
        taskView =
          <TaskEdit
            editTask={editTask}
            handleEditChange={handleEditChange}
            handleEditTask={handleEditTask}
            handleCancelTask={handleCancelTask}
          />
      }
      return(
        <li key={taskBlock} className="collection-item">
          {taskView}
        </li>
      )
    });
  };

  return(
    <TasksSection
      taskList={taskList}
      individualTask={individualTask}
      handleFieldChange={handleFieldChange}
      handleNewTaskClick={handleNewTaskClick}
    />
  );
}

export default TasksLogic;
