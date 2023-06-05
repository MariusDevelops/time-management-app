import React from 'react';

const ResultsTable = ({ results }) => {
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
              <th>Date</th>
              <th>Hours</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr key={result.date}>
                <td>{result.date}</td>
                <td>{result.hours}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultsTable;
