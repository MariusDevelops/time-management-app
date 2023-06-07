'use client';
import TaskForm from '@/components/taskForm';
import ResultsTable from '@/components/resultsTable';
import { getAllTasks } from '@/utils/dataManagement';
import { useState } from 'react';
import { deleteTask } from '@/utils/dataManagement';

export default function Home() {
  const [tasks, setTasks] = useState(getAllTasks());

  const handleAddTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleDelete = (taskId) => {
    deleteTask(taskId);
    setTasks((tasks) => tasks.filter((task) => task.id !== taskId));
  };

  return (
    <main>
      <h1 className='text-center py-5'>Time Management App</h1>
      <TaskForm onAddTask={handleAddTask} />
      <ResultsTable tasks={tasks} handleDelete={handleDelete} />
    </main>
  );
}
