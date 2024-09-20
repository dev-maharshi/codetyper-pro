import React, { useEffect, useState } from 'react';
import {
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from 'recharts';


function CustomTooltip({ payload, label, active }) {
  if (active && payload && payload.length) {
    return (
      <div style={{ backgroundColor: '#222', padding: '10px', borderRadius: '5px', color: 'white' }}>
        <p>{`Time: ${label}s`}</p>
        <p>{`WPM: ${payload[0]?.value}`}</p>
        <p>{`KPM: ${payload[1]?.value}`}</p>
        <p>{`Incorrect: ${payload[2]?.value}`}</p>
      </div>
    );
  }

  return null;
}

function Progress() {
  const [data, setData] = useState([]);

  
  useEffect(() => {
    const statsString = localStorage.getItem('stats');
    if (statsString) {
      try {
        const statsObject = JSON.parse(statsString);
        const statsArray = Object.values(statsObject);

       
        const chartData = statsArray.map((stat, index, arr)=> {

          const prevIncorrect = index > 0 ? arr[index - 1].inCorrect : null;
          const shouldShowIncorrect = prevIncorrect === null || stat.inCorrect !== prevIncorrect;

          return{
          time: stat.time,       
          wpm: stat.wpm || 0,    
          kpm: stat.kpm || 0,    
          incorrect: shouldShowIncorrect ? stat.inCorrect : 0,
          }
        });

        setData(chartData);
      } catch (error) {
        console.error('Error parsing stats from localStorage:', error);
        setData([]);
      }
    } else {
      console.error('No stats found in localStorage');
      setData([]);
    }
  }, []);


  const chartStyles = {
    background: 'transparent',
    margin: '130px auto',
    padding: '20px',
    width: '90%',
    height: '300px',
  };

  return (
    <div id="progress-chart" style={chartStyles}>
      <ResponsiveContainer>
        <ComposedChart
          data={data}
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        >
          <CartesianGrid  vertical={false} horizontal={false}/>
          <XAxis dataKey="time" stroke="var(--text-color)"  />
          <YAxis stroke="var(--text-color)" />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ position: 'relative', top: -10, right: 20 }} />
          <Bar dataKey="incorrect" fill="#ff0000" name="Incorrect" barSize={30} />
          <Line type="monotone" dataKey="wpm" stroke="var(--text-color)" strokeWidth={1} dot={false} name="WPM" />
          <Line type="monotone" dataKey="kpm" stroke="#9E9E9E" dot={false} name="KPM" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Progress;

