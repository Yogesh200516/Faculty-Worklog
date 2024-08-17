import { useState, useEffect } from 'react';
import { BarChart } from '@mui/x-charts';

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

export default function SimpleBarChart() {
  const { width } = useWindowSize();
  const [gainedData, setGainedData] = useState([]);
  const [lostData, setLostData] = useState([]);
  const [months, setMonths] = useState([]);
  const [currentSemester, setCurrentSemester] = useState('');

  useEffect(() => {
    const fetchFRSData = async () => {
      const token = localStorage.getItem('jwt');
      try {
        const response = await fetch('http://localhost:4000/admin/frs/monthly', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const { frsSummary: data } = await response.json();

        const currentMonth = new Date().getMonth() + 1;
        const isFirstSemester = currentMonth <= 6;
        setCurrentSemester(isFirstSemester ? 'Even Semester' : 'Odd Semester');

        const monthNames = {
          '01': 'January',
          '02': 'February',
          '03': 'March',
          '04': 'April',
          '05': 'May',
          '06': 'June',
          '07': 'July',
          '08': 'August',
          '09': 'September',
          '10': 'October',
          '11': 'November',
          '12': 'December',
        };

        const getSemesterMonths = () => {
          const monthsList = [];
          for (let i = 1; i <= 6; i++) {
            const month = (i < 10 ? '0' : '') + i;
            monthsList.push(monthNames[month]);
          }
          return monthsList;
        };

        const getOddSemesterMonths = () => {
          const monthsList = [];
          for (let i = 7; i <= 12; i++) {
            const month = (i < 10 ? '0' : '') + i;
            monthsList.push(monthNames[month]);
          }
          return monthsList;
        };

        const allMonths = currentSemester === 'Odd Semester' ? getOddSemesterMonths() : getSemesterMonths();

        const gained = new Array(allMonths.length).fill(0);
        const lost = new Array(allMonths.length).fill(0);

        data.forEach(item => {
          const [year, month] = item.month.split('-');
          const monthName = monthNames[month];
          const monthIndex = allMonths.indexOf(monthName);

          if (monthIndex !== -1) {
            gained[monthIndex] = parseFloat(item.total_gained) || 0;
            lost[monthIndex] = Math.abs(parseFloat(item.total_lost)) || 0;
          }
        });

        setGainedData(gained);
        setLostData(lost);
        setMonths(allMonths);
      } catch (error) {
        console.error('Error fetching FRS data:', error);
      }
    };

    fetchFRSData();
  }, [currentSemester]);

  const getChartDimensions = () => {
    if (width <= 1024 && width > 980 ) {
      return { width: 980, height: 400 };
    } else if (width <= 900 && width > 768) {
      return { width: 820, height: 380 };
    } else if (width <= 768 && width > 600) {
      return { width: 700, height: 350 };
    } else if (width <= 600 && width > 500) {
      return { width: 550, height: 330 };
    } else if (width <= 500 && width > 425) {
      return { width: 480, height: 400 };
    } else if (width <= 425) {
      return { width: 410, height: 380 };
    } else if (width <= 400 && width > 320) {
      return { width: 380, height: 380 };
    } else if (width <= 350 && width > 300) {
      return { width: 340, height: 340 };
    } else {
      return { width: 640, height: 300 };
    }
  };

  const { width: chartWidth, height: chartHeight } = getChartDimensions();

  const renderBarChart = (semesterMonths, gainedData, lostData) => {
    if (semesterMonths.length === 0 || gainedData.length === 0 || lostData.length === 0) {
      return <p>No data available for this semester</p>;
    }
    return (
      <BarChart
        width={chartWidth}
        height={chartHeight}
        series={[
          { data: gainedData, label: 'FRS Given', id: 'gainedId' },
          { data: lostData, label: 'FRS Taken', id: 'lostId', stackId: 'stack' },
        ]}
        xAxis={[{ data: semesterMonths, scaleType: 'band' }]}
      />
    );
  };

  return (
    <div style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
      <h3>{currentSemester}</h3>
      <div style={{ minWidth: `${chartWidth}px` }}>
        {renderBarChart(months, gainedData, lostData)}
      </div>
    </div>
  );
}
