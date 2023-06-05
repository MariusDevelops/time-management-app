'use client';
import React, { useState } from 'react';

const TaskForm = () => {
  const [task, setTask] = useState('');
  const [startDate, setStartDate] = useState('');
  const [deadline, setDeadline] = useState('');
  const [totalTaskHours, setTotalTaskHours] = useState('');
  const [occupiedHours, setOccupiedHours] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Task:', task);
    console.log('Start Date:', startDate);
    console.log('Deadline:', deadline);
    console.log('Total Task Hours:', totalTaskHours);
    console.log('Occupied Hours:', occupiedHours);

    setTask('');
    setStartDate('');
    setDeadline('');
    setTotalTaskHours('');
    setOccupiedHours('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Task Name:
        <input
          type='text'
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
      </label>
      <br />
      <label>
        Start Date:
        <input
          type='date'
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </label>
      <label>
        Deadline:
        <input
          type='date'
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
      </label>
      <br />
      <label>
        Total Hours to Complete Task:
        <input
          type='number'
          value={totalTaskHours}
          onChange={(e) => setTotalTaskHours(e.target.value)}
        />
      </label>
      <br />
      <label>
        Occupied Hours per Day:
        <input
          type='number'
          value={occupiedHours}
          onChange={(e) => setOccupiedHours(e.target.value)}
        />
      </label>
      <br />
      <button
        type='submit'
        className='border-solid border-2 border-sky-500 px-4 py-2'
      >
        Submit
      </button>
    </form>
  );
};

export default TaskForm;
