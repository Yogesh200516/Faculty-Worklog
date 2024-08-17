<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { BarChart } from '@mui/x-charts';
import './MonthBarChart.css';
import PropTypes from 'prop-types';
=======
import * as React from 'react';
import { useState, useEffect } from 'react';
import { BarChart } from '@mui/x-charts';
import './MonthBarChart.css';
>>>>>>> f6a5ac9b81d5e744788973c3ebda3c2e1af791e4

// Custom hook for window size
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

<<<<<<< HEAD
export default function MonthBarChart({ user }) {
  const { width } = useWindowSize();
  const [firstSemesterGained, setFirstSemesterGained] = useState(Array(6).fill(0));
  const [firstSemesterLost, setFirstSemesterLost] = useState(Array(6).fill(0));
  const [secondSemesterGained, setSecondSemesterGained] = useState(Array(6).fill(0));
  const [secondSemesterLost, setSecondSemesterLost] = useState(Array(6).fill(0));
  const [months, setMonths] = useState([]);
  const [currentSemester, setCurrentSemester] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFRSData = async () => {
      try {
        const token = localStorage.getItem('jwt');
        if (!token) {
          console.error('No access token found');
          return;
        }

        const response = await fetch(`http://localhost:4000/api/verticalhead/${user.id}/frs-summary`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const { frsSummary } = await response.json();
        console.log('Fetched FRS summary:', frsSummary);

        if (!Array.isArray(frsSummary)) {
          throw new Error('Unexpected API response: frsSummary is not an array');
        }

        // Determine current semester
        const currentMonth = new Date().getMonth() + 1; // Get current month (1-12)
        const isFirstSemester = currentMonth <= 6;
        setCurrentSemester(isFirstSemester ? 'First Semester' : 'Second Semester');

        const firstGained = Array(6).fill(0);
        const firstLost = Array(6).fill(0);
        const secondGained = Array(6).fill(0);
        const secondLost = Array(6).fill(0);

        const monthNames = [
          'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'
        ];

        frsSummary.forEach(item => {
          const monthIndex = parseInt(item.month.split('-')[1], 10) - 1;

          if (monthIndex < 6) {
            // First Semester
            firstGained[monthIndex] = parseFloat(item.total_gained) || 0;
            firstLost[monthIndex] = Math.abs(parseFloat(item.total_lost)) || 0;
          } else {
            // Second Semester
            secondGained[monthIndex - 6] = parseFloat(item.total_gained) || 0;
            secondLost[monthIndex - 6] = Math.abs(parseFloat(item.total_lost)) || 0;
          }
        });

        setFirstSemesterGained(firstGained);
        setFirstSemesterLost(firstLost);
        setSecondSemesterGained(secondGained);
        setSecondSemesterLost(secondLost);
        setMonths(monthNames);
      } catch (error) {
        console.error('Error fetching FRS data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFRSData();
  }, [user.id]);

  const getChartDimensions = () => {
    let chartWidth, chartHeight;

    if (width > 1024) {
      chartWidth = 1000;
      chartHeight = 420;
    } else if (width <= 1024 && width > 900) {
      chartWidth = 980;
      chartHeight = 400;
    } else if (width <= 900 && width > 768) {
      chartWidth = 820;
      chartHeight = 380;
    } else if (width <= 768 && width > 600) {
      chartWidth = 700;
      chartHeight = 350;
    } else if (width <= 600 && width > 500) {
      chartWidth = 540;
      chartHeight = 300;
    } else if (width <= 500 && width > 425) {
      chartWidth = 480;
      chartHeight = 300;
    } else if (width <= 425 && width > 400) {
      chartWidth = 410;
      chartHeight = 280;
    } else if (width <= 400 && width > 350) {
      chartWidth = 390;
      chartHeight = 280;
    } else {
      chartWidth = 320;
      chartHeight = 280;
    }

    return { width: chartWidth, height: chartHeight };
=======
const pointsGained = [5800, 6050, 4700, 7200, 2800, 4200, 7100]; // Points gained for each month
const pointsLost = [870, 430, 1270, 2100, 950, 1100, 2100];    // Points lost for each month
const months = ['August', 'September', 'October', 'November', 'December', 'January', 'February'];

export default function MonthBarChart() {
  const { width } = useWindowSize();

  const getChartDimensions = () => {
    if (width > 1024) {
      return { width: 1000, height: 420 };
    } else if (width <= 1024 && width > 900) {
      return { width: 980, height: 400 };
    } else if (width <= 900 && width > 768) {
      return { width: 820, height: 380 };
    } else if (width <= 768 && width > 600) {
      return { width: 700, height: 350 };
    } else if (width <= 600 && width > 500) {
      return { width: 540, height: 300 };
    } else if (width <= 500 && width > 425) {
      return { width: 430, height: 300 };
    } else if (width <= 425 && width > 400) {
      return { width: 390, height: 280 };
    } else if (width <= 400 && width > 350) {
      return { width: 350, height: 280 };
    } else if (width <= 350) {
      return { width: 330, height: 280 };
    }
>>>>>>> f6a5ac9b81d5e744788973c3ebda3c2e1af791e4
  };

  const { width: chartWidth, height: chartHeight } = getChartDimensions();

<<<<<<< HEAD
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='bar-chart3'>
      {currentSemester === 'First Semester' && (
        <div style={{ marginBottom: '20px', marginLeft:'530px' }}>
          <h3 style={{alignItems: 'center'}}>Even Semester</h3>
          <BarChart
            width={chartWidth}
            height={chartHeight}
            series={[
              { data: firstSemesterGained, label: 'FRS Given', id: 'firstGainedId' },
              { data: firstSemesterLost, label: 'FRS Taken', id: 'firstLostId', stackId: 'stack' },
            ]}
            xAxis={[{
              data: months.slice(0, 6),
              scaleType: 'band',
              axisLabel: {
                rotate: 45,
                align: 'center',
              },
            }]}
            tooltip={{
              trigger: 'axis',
              formatter: (params) => {
                const month = params[0]?.name;
                const providedData = params.find(p => p.seriesId === 'firstGainedId')?.data || 0;
                const takenData = params.find(p => p.seriesId === 'firstLostId')?.data || 0;
                return `${month}<br/>FRS Provided: ${providedData}<br/>FRS Taken: ${takenData}`;
              },
            }}
          />
        </div>
      )}
      {currentSemester === 'Second Semester' && (
        <div>
          <h3 style={{ marginBottom: '20px', alignItems: 'center', textAlign: 'center' }}>Odd Semester</h3>
          <BarChart style={{marginLeft: '20px'}}
            width={chartWidth}
            height={chartHeight}
            series={[
              { data: secondSemesterGained, label: 'FRS Given', id: 'secondGainedId' },
              { data: secondSemesterLost, label: 'FRS Taken', id: 'secondLostId', stackId: 'stack' },
            ]}
            xAxis={[{
              data: months.slice(6),
              scaleType: 'band',
              axisLabel: {
                rotate: 45,
                align: 'center',
              },
            }]}
            tooltip={{
              trigger: 'axis',
              formatter: (params) => {
                const month = params[0]?.name;
                const providedData = params.find(p => p.seriesId === 'secondGainedId')?.data || 0;
                const takenData = params.find(p => p.seriesId === 'secondLostId')?.data || 0;
                return `${month}<br/>FRS Provided: ${providedData}<br/>FRS Taken: ${takenData}`;
              },
            }}
          />
        </div>
      )}
    </div>
  );
}

MonthBarChart.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  }).isRequired,
};
=======
  return (
    <div className='bar-chart3'>
      <BarChart
        width={chartWidth}
        height={chartHeight}
        series={[
          { data: pointsGained, label: 'FRS Given', id: 'gainedId' },
          { data: pointsLost, label: 'FRS Taken', id: 'lostId' },
        ]}
        xAxis={[{ data: months, scaleType: 'band' }]}
      />
    </div>
  );
}
>>>>>>> f6a5ac9b81d5e744788973c3ebda3c2e1af791e4
