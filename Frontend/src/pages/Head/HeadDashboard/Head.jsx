import React from 'react';
import './Head.css';
import MonthBarChart from './MonthBarChart';

const HeadDashboard = () => {
  return (
    <div className='head-main'>
      <div className='head-top'>
        <div className='top-left'>
          <div className='head-text1'>Overall FRS Summary</div>
          <div className='top-left-content'>
            <div className='frs-positive1'>FRS Provided</div>
            <div className='frs-negative1'>FRS Taken</div>
          </div>
        </div>
        <div className='top-right'>
          <div className='head-text2'>Update Records</div>
        </div>
      </div>
      <div className='head-middle'>
        <div className='head-text2'>
          Monthwise FRS Summary
        </div>
        <MonthBarChart />
      </div>
      <div className='head-bottom'>
        <div className='head-text3'>
          FRS Provided History
        </div>
      </div>
    </div>
  );
};

export default HeadDashboard;
