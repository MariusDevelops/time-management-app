import React, { useState } from 'react';
import { addTask } from '@/utils/dataManagement';

const TaskForm = ({ onAddTask }) => {
  const [taskName, setTaskName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [deadline, setDeadline] = useState('');
  const [totalTaskHours, setTotalTaskHours] = useState('');
  const [busyDays, setBusyDays] = useState([]);

  const generateBusyDays = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const days = [];
    for (
      let date = startDate;
      date <= endDate;
      date.setDate(date.getDate() + 1)
    ) {
      days.push({ date: new Date(date), busyHours: '' });
    }
    setBusyDays(days);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
    if (deadline) {
      generateBusyDays(e.target.value, deadline);
    }
  };

  const handleDeadlineChange = (e) => {
    setDeadline(e.target.value);
    if (startDate) {
      generateBusyDays(startDate, e.target.value);
    }
  };

  const handleBusyHoursChange = (index, value) => {
    setBusyDays((prevBusyDays) =>
      prevBusyDays.map((day, i) =>
        i === index ? { ...day, busyHours: value } : day
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const totalOccupiedHours = busyDays.reduce(
      (sum, day) => sum + (day.busyHours ? Number(day.busyHours) : 0),
      0
    );

    const newTask = {
      id: Date.now(),
      taskName,
      startDate,
      deadline,
      totalTaskHours,
      totalOccupiedHours,
      busyDays,
    };

    addTask(newTask);
    onAddTask(newTask);

    setTaskName('');
    setStartDate('');
    setDeadline('');
    setTotalTaskHours('');
    setBusyDays([]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Task Name:
        <input
          type='text'
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
      </label>
      <br />
      <label>
        Start Date:
        <input type='date' value={startDate} onChange={handleStartDateChange} />
      </label>
      <label>
        Deadline:
        <input type='date' value={deadline} onChange={handleDeadlineChange} />
      </label>
      <br />
      {busyDays.map((day, index) => (
        <label key={index}>
          {day.date.toDateString()}:
          <input
            type='number'
            value={day.busyHours}
            onChange={(e) => handleBusyHoursChange(index, e.target.value)}
          />
        </label>
      ))}
      <br />
      Total Occupied Hours:{' '}
      {busyDays.reduce((sum, day) => sum + Number(day.busyHours), 0)}
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
