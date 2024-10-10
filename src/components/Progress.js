import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from 'recharts';
import { useNavigate } from 'react-router-dom';


function CustomTooltip({ payload, label, active }) {
  if (active && payload && payload.length) {
    return (
      <div style={{ backgroundColor: '#222', padding: '10px', borderRadius: '5px', color: 'white' }}>
        <p>{`Time: ${label}s`}</p>
        <p>{`WPM: ${payload[1]?.value}`}</p>
        <p>{`KPM: ${payload[2]?.value}`}</p>
        <p>{`Incorrect: ${payload[0]?.value}`}</p>
      </div>
    );
  }

  return null;
}

function Progress() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    const fetchFromLocalStorage = () => {
      const statsString = localStorage.getItem('stats');
      if (statsString) {
        try {
          const statsObject = JSON.parse(statsString);
          const statsArray = Object.values(statsObject);
          processStats(statsArray);
          console.log(statsArray);

        } catch (error) {
          console.error('Error parsing stats from localStorage:', error);
          setData([]);
        }
      } else {
        console.warn('No stats found in localStorage');
        setData([]);
        fetchFromServer();
      }
    };


    const fetchFromServer = async () => {

      const userId = JSON.parse(localStorage.getItem('user'))?.userId;

      if (userId) {

        try {

          const response = await axios.get(`http://localhost:5000/api/stats/stat/${userId}`);

          const serverData = response.data;

          if (serverData && serverData.length > 0) {
            processStats(serverData);

          } else {
            console.warn('No data from server');
            setData([]);
          }
        } catch (error) {
          console.error('Error fetching stats from server:', error);
        }
      } else {
        console.warn("Login to save data to server");

      }
    };


    const processStats = (statsArray) => {
      const chartData = statsArray.map((stat, index, arr) => {
        const prevIncorrect = index > 0 ? arr[index - 1].inCorrect : null;
        const shouldShowIncorrect = prevIncorrect === null || stat.inCorrect !== prevIncorrect;

        return {
          time: stat.time + 1,
          wpm: stat.wpm || 0,
          kpm: stat.kpm || 0,
          incorrect: shouldShowIncorrect ? stat.inCorrect : 0,
        };
      });

      setData(chartData);
    };

    fetchFromLocalStorage();

  }, []);


  const chartStyles = {
    background: 'transparent',
    margin: '130px auto',
    padding: '20px',
    width: '1368px',
    height: '300px',
  };

  return (
    <div id="progress-chart" style={chartStyles}>
      <ResponsiveContainer>
        <ComposedChart
          data={data}
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        >

          <XAxis dataKey="time" stroke="var(--text-color)" />

          <YAxis stroke="var(--text-color)" />

          <Tooltip content={<CustomTooltip />} />

          <Legend wrapperStyle={{ position: 'relative', top: -10, right: 20 }} />

          <Bar dataKey="incorrect" fill="#ff0000" name="Incorrect" barSize={30} />

          <Line type="bump" dataKey="wpm" stroke="var(--text-color)" strokeWidth={1} dot={false} name="WPM" connectNulls={true} />

          <Line type="bump" dataKey="kpm" stroke="#9E9E9E" strokeWidth={1} dot={false} name="KPM" connectNulls={true} />

        </ComposedChart>
      </ResponsiveContainer>

      <div className='progressPage' >

        <button
          className='progressBtn'

          onClick={() => navigate('/')}

          style={{
            background: "transparent",
            color: "var(--text-color)",
            border: "none",
            fontSize: "30px",
            zIndex: "1",
            top: "530px",
            left: "740px",
            position: "absolute",
            cursor: "pointer"
          }}>
          ↻
        </button>

      </div>

    </div>
  );
}

export default Progress;

