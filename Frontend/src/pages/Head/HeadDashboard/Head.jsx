import React from 'react';
import './Head.css';
import MonthBarChart from './MonthBarChart';
import FRSTotal from './FRSTotal';
import Record from './Record';
import EventDetails from '../../Admin/AdminDashboard/EventDetails';
import Leaderboard from '../../Admin/AdminDashboard/Leaderboard';

const HeadDashboard = () => {
  return (
    <div className='head-main'>
      <div className='head-top'>
        <div className='top-left'>
          <FRSTotal />
        </div>
        <div className='top-right'>
          <Record />
        </div>
      </div>
      <div className='head-middle'>
        <div className='head-text2'>
          Monthwise FRS Summary
        </div>
        <MonthBarChart />
      </div>
      
    </div>
  );
};

export default HeadDashboard;
