import React from 'react';

const ResultsTable = ({ tasks }) => {
  return (
    <div className='flex justify-center text-center'>
      <div className='flex flex-col'>
        <h2>Calculated Results</h2>
        <table>
          <thead>
            <tr>
              <th>Task Name</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Total Task Hours</th>
              <th>Total Occupied Hours</th>
              <th>Task Hours Per Day</th>
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
                const taskHoursPerDay =
                  remainingTaskHours / task.busyDays.length;
                updatedBusyDays = task.busyDays.map((day) => {
                  const availableHours =
                    24 - (day.busyHours ? Number(day.busyHours) : 0);
                  if (remainingTaskHours > availableHours) {
                    remainingTaskHours -= availableHours;
                    return { ...day, taskHours: availableHours };
                  } else if (remainingTaskHours > taskHoursPerDay) {
                    remainingTaskHours -= taskHoursPerDay;
                    return { ...day, taskHours: taskHoursPerDay };
                  } else {
                    const taskHours = remainingTaskHours;
                    remainingTaskHours = 0;
                    return { ...day, taskHours };
                  }
                });
                while (remainingTaskHours > 0) {
                  updatedBusyDays = updatedBusyDays.map((day) => {
                    const availableHours =
                      24 -
                      (day.busyHours ? Number(day.busyHours) : 0) -
                      day.taskHours;
                    if (remainingTaskHours > availableHours) {
                      remainingTaskHours -= availableHours;
                      return {
                        ...day,
                        taskHours: day.taskHours + availableHours,
                      };
                    } else {
                      const taskHours = day.taskHours + remainingTaskHours;
                      remainingTaskHours = 0;
                      return { ...day, taskHours };
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
            const taskHoursPerDay = remainingTaskHours / task.busyDays.length;
            let updatedBusyDays = task.busyDays.map((day) => {
              const availableHours =
                24 - (day.busyHours ? Number(day.busyHours) : 0);
              if (remainingTaskHours > availableHours) {
                remainingTaskHours -= availableHours;
                return { ...day, taskHours: availableHours };
              } else if (remainingTaskHours > taskHoursPerDay) {
                remainingTaskHours -= taskHoursPerDay;
                return { ...day, taskHours: taskHoursPerDay };
              } else {
                const taskHours = remainingTaskHours;
                remainingTaskHours = 0;
                return { ...day, taskHours };
              }
            });
            while (remainingTaskHours > 0) {
              updatedBusyDays = updatedBusyDays.map((day) => {
                const availableHours =
                  24 -
                  (day.busyHours ? Number(day.busyHours) : 0) -
                  day.taskHours;
                if (remainingTaskHours > availableHours) {
                  remainingTaskHours -= availableHours;
                  return { ...day, taskHours: day.taskHours + availableHours };
                } else {
                  const taskHours = day.taskHours + remainingTaskHours;
                  remainingTaskHours = 0;
                  return { ...day, taskHours };
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
