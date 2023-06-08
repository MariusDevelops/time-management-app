'use client';
import TaskForm from '@/components/taskForm';
import ResultsTable from '@/components/resultsTable';
import { getAllTasks } from '@/utils/dataManagement';
import { useState } from 'react';
import { deleteTask, editTask } from '@/utils/dataManagement';

export default function Home() {
  const [tasks, setTasks] = useState(getAllTasks());
  const [editMode, setEditMode] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);

  const handleAddTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleEdit = (taskId) => {
    setEditMode(true);
    setEditTaskId(taskId);
  };

  const handleUpdateTask = (updatedTask) => {
    editTask(editTaskId, updatedTask);
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === editTaskId ? { ...task, ...updatedTask } : task
      )
    );
    setEditMode(false);
    setEditTaskId(null);
  };

  const handleDelete = (taskId) => {
    deleteTask(taskId);
    setTasks((tasks) => tasks.filter((task) => task.id !== taskId));
  };

  return (
    <main>
      <TaskForm
        onAddTask={handleAddTask}
        onUpdateTask={handleUpdateTask}
        editMode={editMode}
        editTaskId={editTaskId}
        tasks={tasks}
      />
      <ResultsTable
        tasks={tasks}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    </main>
  );
}
