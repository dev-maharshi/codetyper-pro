import React from 'react';
import { Line } from 'react-chartjs-2';

function Progress() {
  // Placeholder data for now
  const progressData = [
    { date: '2024-07-20', speed: 50, accuracy: 95 },
    { date: '2024-07-21', speed: 55, accuracy: 96 },
    // Add more data
  ];

  const data = {
    labels: progressData.map(entry => entry.date),
    datasets: [
      {
        label: 'Typing Speed (WPM)',
        data: progressData.map(entry => entry.speed),
        borderColor: 'blue',
        fill: false,
      },
      {
        label: 'Accuracy (%)',
        data: progressData.map(entry => entry.accuracy),
        borderColor: 'green',
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
        },
      },
    },
  };

  return (
    <div>
      <h2>Progress</h2>
      <Line data={data} options={options} />
    </div>
  );
}

export default Progress;
