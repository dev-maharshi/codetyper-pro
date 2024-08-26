import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';

// Register the necessary components for Chart.js
Chart.register(...registerables);

function Progress() {
  // Placeholder data for now
  const progressData = [
    { date: '2024-07-23', speed: 60, accuracy: 95 },
    { date: '2024-07-22', speed: 35, accuracy: 45 },
    { date: '2024-07-21', speed: 40, accuracy: 65 },
    { date: '2024-07-20', speed: 45, accuracy: 75 },
    { date: '2024-07-19', speed: 50, accuracy: 85 },
    { date: '2024-07-18', speed: 55, accuracy: 96 },
    
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
