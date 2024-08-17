import { useEffect, useState } from 'react';
import './RecentFRS.css';
import PropTypes from 'prop-types';

<<<<<<< HEAD
function RecentFRS({ user }) {
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [error, setError] = useState(null);
=======
function RecentFRS(handlePopupClick) {
  const data = [
    { date: '12-06-2024', verticalName: 'Skill', reason: 'Late Submission', reason_info: 'The given task was not completed on time and it will be considered as late submission', frsUpdate: 50 },
    { date: '13-06-2024', verticalName: 'Academics', reason: 'Insufficient Data', reason_info: 'The Qusetion Paper taken by you is not having sufficient data in some questions', frsUpdate: -100 },
    { date: '14-06-2024', verticalName: 'COE', reason: 'Incorrect Entry', reason_info: 'The Entry was not entered properly and it is showing wrong data which is not matching with actuall data', frsUpdate: 150 },
    { date: '15-06-2024', verticalName: 'IQAC', reason: 'System Error', reason_info: 'The system is not handeled professionally by you and it is showing errors', frsUpdate: -200 },
    { date: '16-06-2024', verticalName: 'Special Lab', reason: 'Data Mismatch', reason_info: 'The report given by you is showing wrong data and it is not matching with the true data', frsUpdate: 250 },
  ];
>>>>>>> f6a5ac9b81d5e744788973c3ebda3c2e1af791e4

  useEffect(() => {
    const facultyId = user.id;
    console.log('Fetching data for facultyId:', facultyId);

    const fetchRecentFRSData = async () => {
      try {
        const token = localStorage.getItem('jwt');
        const response = await fetch(`http://localhost:4000/recentfrs/${facultyId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Recent FRS Data:', data);
        setData(data);
      } catch (error) {
        console.error('Error fetching recent FRS data:', error);
        setError(error.message);
      }
    };

    if (facultyId) {
      fetchRecentFRSData();
    }
  }, [user.id]);

  const handleViewClick = (row) => {
    setSelectedRow(row);
  };

  const handleClosePopup = () => {
    setSelectedRow(null);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="recent-frs">
      <table className="recent-frs-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Vertical Name</th>
            <th>Reason</th>
            <th>FRS Update</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.date}</td>
              <td>{item.verticalName}</td>
              <td>{item.reason}</td>
              <td className={`frs-value ${item.frsUpdate >= 0 ? 'positive' : 'negative'}`}>{item.frsUpdate}</td>
              <td><button className="view-button" onClick={() => handleViewClick(item)}>View</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedRow && (
        <div className="popup-overlay" onClick={handleClosePopup}>
          <div className="popup" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h2>Update Summary</h2>
              {/* <button className="close-button" onClick={handleClosePopup} style={{marginTop: '16px'}}>x</button> */}
            </div>
            <div className="popup-content">
              <div className="content">
                <p><strong>Date:</strong></p>
                <p>{selectedRow.date}</p>
              </div>
              <div className="content">
                <p><strong>Vertical Name:</strong></p>
                <p>{selectedRow.verticalName}</p>
              </div>
              <div className="content">
                <p><strong>Reason:</strong></p>
                <p>
                {selectedRow.reason_info}</p>
              </div>
              <div className="content">
                <p><strong>Reason Info:</strong></p>
                <p>{selectedRow.reason}</p>
              </div>
              <div className="content">
                <p><strong>FRS Update:</strong></p>
                <p className={`frs-value ${selectedRow.frsUpdate >= 0 ? 'positive' : 'negative'}`}>{selectedRow.frsUpdate}</p>
              </div>
            </div>
            <div className="popup-footer">
              <button className="ok-button" onClick={handleClosePopup}>OK</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

RecentFRS.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default RecentFRS;
