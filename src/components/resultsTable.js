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
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.taskName}</td>
                <td>{task.startDate}</td>
                <td>{task.deadline}</td>
                <td>{task.totalTaskHours}</td>
                <td>{task.totalOccupiedHours}</td>
                <td>
                  {task.busyDays.map((day, index) => (
                    <div key={index}>
                      {day.date.toDateString()}: {day.taskHours}
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {tasks.map((task) => {
          const totalAvailableTime = task.busyDays.reduce(
            (sum, day) =>
              sum + (24 - (day.busyHours ? Number(day.busyHours) : 0)),
            0
          );
          if (totalAvailableTime >= task.totalTaskHours) {
            return (
              <div key={`${task.id}-success`}>
                <h3 className='text-green-800'>
                  You can finish the task: {task.taskName} within the given
                  time.
                </h3>
                <p>
                  You can spend {task.totalTaskHours / task.busyDays.length}{' '}
                  hours per day working on the task.
                </p>
              </div>
            );
          } else {
            return (
              <div key={`${task.id}-failure`}>
                <h3 className='text-red-800'>
                  You won't meet the deadline for the task: {task.taskName}.
                </h3>
                <p>
                  You can spend {totalAvailableTime / task.busyDays.length}{' '}
                  hours per day working on the task.
                </p>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default ResultsTable;
