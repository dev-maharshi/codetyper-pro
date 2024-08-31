import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';


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


  return (
    <div>
    <h2>Progress</h2>
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={progressData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="speed" stroke="blue" name="Typing Speed (WPM)" />
        <Line type="monotone" dataKey="accuracy" stroke="green" name="Accuracy (%)" />
      </LineChart>
    </ResponsiveContainer>
  </div>
  );
}

export default Progress;
