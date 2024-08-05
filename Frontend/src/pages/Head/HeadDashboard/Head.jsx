import React from 'react';
import './Head.css';

const HeadDashboard = () => {
  return (
    <div className='head-main'>
      <div className='head-top'>
        <div className='head-text1'>
          Overall FRS Summary
        </div>
      </div>
      <div className='head-middle'>
        <div className='head-text2'>
          Monthwise FRS Summary
        </div>
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
