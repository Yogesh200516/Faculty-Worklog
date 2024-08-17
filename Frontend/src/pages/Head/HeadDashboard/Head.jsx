import React from 'react';
import './Head.css';
import MonthBarChart from './MonthBarChart';
import FRSTotal from './FRSTotal';
import Record from './Record';
<<<<<<< HEAD
=======
import EventDetails from '../../Admin/AdminDashboard/EventDetails';
import Leaderboard from '../../Admin/AdminDashboard/Leaderboard';
>>>>>>> f6a5ac9b81d5e744788973c3ebda3c2e1af791e4

import PropTypes from 'prop-types';

const HeadDashboard = ({user}) => {
  return (
    <div className='head-main'>
      <div className='head-top'>
        <div className='top-left'>
<<<<<<< HEAD
          <FRSTotal user={user}/>
        </div>
        <div className='top-right'>
          <Record  user={user}/>
=======
          <FRSTotal />
        </div>
        <div className='top-right'>
          <Record />
>>>>>>> f6a5ac9b81d5e744788973c3ebda3c2e1af791e4
        </div>
      </div>
      <div className='head-middle'>
        <div className='head-text2'>
          Monthwise FRS Summary
        </div>
<<<<<<< HEAD
        <MonthBarChart  user={user}/>
=======
        <MonthBarChart />
>>>>>>> f6a5ac9b81d5e744788973c3ebda3c2e1af791e4
      </div>
      
    </div>
  );
};
HeadDashboard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    verticals: PropTypes.objectOf(PropTypes.number).isRequired,
   
  }).isRequired,
};
export default HeadDashboard;