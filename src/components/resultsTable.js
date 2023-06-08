import React from 'react';

const ResultsTable = ({ tasks, handleDelete, handleEdit }) => {
  return (
    <div className='results-table flex justify-center text-center'>
      <div className='flex flex-col'>
        <table>
          <thead>
            <tr>
              <th>Task Name</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Total Task Hours</th>
              <th>Total Occupied Hours</th>
              <th>Task Hours Per Day</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => {
              const totalAvailableTime = task.busyDays.reduce(
                (sum, day) =>
                  sum + (24 - (day.busyHours ? Number(day.busyHours) : 0)),
                0
              );
              let updatedBusyDays = [];
              if (totalAvailableTime >= task.totalTaskHours) {
                let remainingTaskHours = task.totalTaskHours;
                updatedBusyDays = task.busyDays.map((day) => ({
                  ...day,
                  taskHours: 0,
                }));
                while (remainingTaskHours > 0) {
                  const remainingDays = updatedBusyDays.filter(
                    (day) =>
                      24 -
                        (day.busyHours ? Number(day.busyHours) : 0) -
                        day.taskHours >
                      0
                  ).length;
                  const additionalTaskHoursPerDay =
                    remainingTaskHours / remainingDays;
                  updatedBusyDays = updatedBusyDays.map((day) => {
                    const availableHours =
                      24 -
                      (day.busyHours ? Number(day.busyHours) : 0) -
                      day.taskHours;
                    if (availableHours > additionalTaskHoursPerDay) {
                      remainingTaskHours -= additionalTaskHoursPerDay;
                      return {
                        ...day,
                        taskHours: day.taskHours + additionalTaskHoursPerDay,
                      };
                    } else {
                      remainingTaskHours -= availableHours;
                      return {
                        ...day,
                        taskHours: day.taskHours + availableHours,
                      };
                    }
                  });
                }
              }
              return (
                <tr key={task.id}>
                  <td>{task.taskName}</td>
                  <td>{task.startDate}</td>
                  <td>{task.deadline}</td>
                  <td>{task.totalTaskHours}</td>
                  <td>{task.totalOccupiedHours}</td>
                  <td>
                    {updatedBusyDays.map((day, index) => (
                      <div key={index}>
                        {day.date.toDateString()}: {Math.floor(day.taskHours)}h{' '}
                        {Math.round((day.taskHours % 1) * 60)}m
                      </div>
                    ))}
                  </td>
                  <td>
                    <button onClick={() => handleEdit(task.id)}>Edit</button>
                  </td>
                  <td>
                    <button onClick={() => handleDelete(task.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {tasks.map((task) => {
          const totalAvailableTime = task.busyDays.reduce(
            (sum, day) =>
              sum + (24 - (day.busyHours ? Number(day.busyHours) : 0)),
            0
          );
          if (totalAvailableTime >= task.totalTaskHours) {
            let remainingTaskHours = task.totalTaskHours;
            let updatedBusyDays = task.busyDays.map((day) => ({
              ...day,
              taskHours: 0,
            }));
            while (remainingTaskHours > 0) {
              const remainingDays = updatedBusyDays.filter(
                (day) =>
                  24 -
                    (day.busyHours ? Number(day.busyHours) : 0) -
                    day.taskHours >
                  0
              ).length;
              const additionalTaskHoursPerDay =
                remainingTaskHours / remainingDays;
              updatedBusyDays = updatedBusyDays.map((day) => {
                const availableHours =
                  24 -
                  (day.busyHours ? Number(day.busyHours) : 0) -
                  day.taskHours;
                if (availableHours > additionalTaskHoursPerDay) {
                  remainingTaskHours -= additionalTaskHoursPerDay;
                  return {
                    ...day,
                    taskHours: day.taskHours + additionalTaskHoursPerDay,
                  };
                } else {
                  remainingTaskHours -= availableHours;
                  return { ...day, taskHours: day.taskHours + availableHours };
                }
              });
            }

            return (
              <div key={`${task.id}-success`}>
                <h3 className='text-green-800'>
                  You can finish the task: {task.taskName} within the given
                  time.
                </h3>
                <p>You can spend:</p>
                {updatedBusyDays.map((day, index) => (
                  <div key={index}>
                    {day.date.toDateString()}: {Math.floor(day.taskHours)}h{' '}
                    {Math.round((day.taskHours % 1) * 60)}m hours
                  </div>
                ))}
              </div>
            );
          } else {
            return (
              <div key={`${task.id}-failure`}>
                <h3 className='text-red-800'>
                  You won't meet the deadline for the task: {task.taskName}.
                </h3>
                <p>You can spend:</p>
                {task.busyDays.map((day, index) => (
                  <div key={index}>
                    {day.date.toDateString()}:{' '}
                    {24 - (day.busyHours ? Number(day.busyHours) : 0)} hours
                  </div>
                ))}
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default ResultsTable;
