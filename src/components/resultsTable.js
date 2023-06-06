import React from 'react';

const ResultsTable = ({ tasks }) => {
  return (
    <div className='flex justify-center text-center'>
      <div className='flex flex-col'>
        <h2>Calculated Results</h2>
        <h3 className='text-green-800'>
          You can finish the task within the given time.
        </h3>
        <h3 className='text-red-800'>
          You won't meet the deadline for the task.
        </h3>
        <table>
          <thead>
            <tr>
              <th>Task Name</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Total Task Hours</th>
              <th>Total Occupied Hours</th>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultsTable;
