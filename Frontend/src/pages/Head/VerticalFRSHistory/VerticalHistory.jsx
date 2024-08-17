<<<<<<< HEAD
import React, { useState, useEffect, useMemo } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, InputAdornment, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHistory } from '@fortawesome/free-solid-svg-icons';
import { downloadExcel } from './Excel';
import './VerticalHistory.css';
import PropTypes from 'prop-types';

=======
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHistory } from '@fortawesome/free-solid-svg-icons';
import './VerticalHistory.css';

// Custom hook for window size
>>>>>>> f6a5ac9b81d5e744788973c3ebda3c2e1af791e4
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
<<<<<<< HEAD
=======

>>>>>>> f6a5ac9b81d5e744788973c3ebda3c2e1af791e4
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

<<<<<<< HEAD
const FacultyFRS = ({ user }) => {
  const { width } = useWindowSize();
  const navigate = useNavigate();
  const id = user.id;
  const [searchText, setSearchText] = useState('');
  const [rows, setRows] = useState([]);
  const [verticalName, setVerticalName] = useState('');

  const getColumnWidth = () => {
    if (width < 1024) {
      return { sno: 50, date: 100, academicYear: 150, semester: 100, facultyName: 180, facultyId: 140, reason: 150, frsScore: 100 };
    } else {
      return { sno: 70, date: 120, academicYear: 150, semester: 100, facultyName: 180, facultyId: 160, reason: 200, frsScore: 160 };
=======
const FacultyFRS = () => {
  const { width } = useWindowSize();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [filteredRows, setFilteredRows] = useState([]);

  const getColumnWidth = () => {
    if (width < 1024) {
      return { sno: 50, date: 140, facultyName: 180, facultyId: 140, reason: 250, frsScore: 100 };
    } else {
      return { sno: 70, date: 160, facultyName: 180, facultyId: 160, reason: 300, frsScore: 160 };
>>>>>>> f6a5ac9b81d5e744788973c3ebda3c2e1af791e4
    }
  };

  const columnWidths = getColumnWidth();

  const columns = [
<<<<<<< HEAD
    { field: 'sno', headerName: 'S.No', width: columnWidths.sno, headerAlign: 'center', align: 'center' },
    { field: 'academicYear', headerName: 'Academic Year', width: columnWidths.academicYear },
    { field: 'semester', headerName: 'Semester', width: columnWidths.semester },
    { field: 'date', headerName: 'Date', width: columnWidths.date },
    { field: 'facultyName', headerName: 'Faculty Name', width: columnWidths.facultyName },
    { field: 'facultyId', headerName: 'Faculty ID', width: columnWidths.facultyId },
    { field: 'reason', headerName: 'Reason', width: columnWidths.reason },
=======
    { 
      field: 'sno', 
      headerName: 'S.No', 
      width: columnWidths.sno, 
      headerAlign: 'center', 
      align: 'center',
      renderCell: (params) => (
        <strong>{params.value}</strong>
      ),
    },
    { 
      field: 'date', 
      headerName: 'Date', 
      width: columnWidths.date, 
    },
    { 
      field: 'facultyName', 
      headerName: 'Faculty Name', 
      width: columnWidths.facultyName,
    },
    { 
      field: 'facultyId', 
      headerName: 'Faculty ID', 
      width: columnWidths.facultyId,
    },
    { 
      field: 'reason', 
      headerName: 'Reason', 
      width: columnWidths.reason,
    },
>>>>>>> f6a5ac9b81d5e744788973c3ebda3c2e1af791e4
    {
      field: 'frsScore',
      headerName: 'FRS Score',
      type: 'number',
      width: columnWidths.frsScore,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <div className={params.value > 0 ? 'frs-positive' : 'frs-negative'}>
          {params.value}
        </div>
      ),
    },
  ];

<<<<<<< HEAD
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('jwt');
        const response = await fetch(`http://localhost:4000/api/verticalhead/${id}/VerticalFrs`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const { vertical, frsSummary } = data;
        setVerticalName(vertical);

        const mappedRows = frsSummary.map((row, index) => ({
          id: index + 1, // Adding a unique id for each row
          sno: index + 1,
          date: new Date(row.created_at).toLocaleDateString('en-GB'),
          academicYear: row.academic_year,
          semester: row.semester,
          facultyName: row.facultyName,
          facultyId: row.facultyId,
          reason: row.reason,
          frsScore: row.frsScore,
        }));

        setRows(mappedRows);
      } catch (error) {
        console.error('Error fetching FRS data:', error);
      }
    };

    fetchData();
  }, [id]);

  // Memoize filtered data to recalculate S.No on data or search change
  const filteredData = useMemo(() => {
    const lowercasedFilter = searchText.toLowerCase();
    return rows
      .filter(item =>
        Object.keys(item).some(key =>
          item[key] != null && item[key].toString().toLowerCase().includes(lowercasedFilter)
        )
      )
      .map((item, index) => ({ ...item, sno: index + 1 })); // Recalculate S.No for filtered data
=======
  const rows = [
    { id: 1, sno: 1, date: '2024-07-16', facultyId: '2024F001', facultyName: 'Harish Kumar', reason: 'Completed Project A', frsScore: 123 },
    { id: 2, sno: 2, date: '2024-07-16', facultyId: '2024F002', facultyName: 'Vasanth Kumar', reason: 'Missed Deadline B', frsScore: -456 },
    { id: 3, sno: 3, date: '2024-07-16', facultyId: '2024F003', facultyName: 'John Doe', reason: 'Published Paper C', frsScore: 78 },
    { id: 4, sno: 4, date: '2024-07-16', facultyId: '2024F004', facultyName: 'Jane Smith', reason: 'Did not attend Conference D', frsScore: -32 },
    { id: 5, sno: 5, date: '2024-07-16', facultyId: '2024F005', facultyName: 'Michael Brown', reason: 'Organized Workshop E', frsScore: 45 },
    // ... (rest of the rows)
  ];

  useEffect(() => {
    const lowercasedFilter = searchText.toLowerCase();
    const filteredData = rows.filter(item => {
      return Object.keys(item).some(key =>
        item[key].toString().toLowerCase().includes(lowercasedFilter)
      );
    });
    setFilteredRows(filteredData);
>>>>>>> f6a5ac9b81d5e744788973c3ebda3c2e1af791e4
  }, [searchText, rows]);

  const handleBackClick = () => {
    navigate('/head-dashboard');
  };

<<<<<<< HEAD
  const handleDownload = () => {
    downloadExcel(filteredData, columns);
  };

=======
>>>>>>> f6a5ac9b81d5e744788973c3ebda3c2e1af791e4
  return (
    <div className="grid-full3">
      <div className="header-container">
        <div className='frs-heading'>
          <FontAwesomeIcon icon={faHistory} className="history-icon" />
<<<<<<< HEAD
          {verticalName} Faculty FRS Score
        </div>
        <div className="header-actions">
          <TextField
            variant="outlined"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#bdbdbd' }} />
                </InputAdornment>
              ),
            }}
            className="search-bar2"
            sx={{
            
              '& .MuiOutlinedInput-root': {
                height: '40px',
                '& fieldset': {
                  borderColor: '#bdbdbd',
                },
                '&:hover fieldset': {
                  borderColor: '#1565c0',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#0d47a1',
                },
              },
              '& .MuiInputAdornment-root': {
                color: '#1e88e5',
              },
              '& .MuiOutlinedInput-input': {
                padding: '8px 14px',
              },
            }}
          />
          <Button
            variant="contained"
            onClick={handleDownload}
            className="download-button"
            sx={{
              backgroundColor: '#1e88e5',
              color: '#ffffff',
              height: '40px',
              marginLeft: '16px',
              '&:hover': {
                backgroundColor: '#1565c0',
              },
            }}
          >
            Download
          </Button>
        </div>
      </div>
      <div className='data-grid-container'>
        <DataGrid
          rows={filteredData}
          columns={columns}
          getRowId={(row) => row.sno} // Use sno as the unique id for each row
=======
          Faculty FRS Score
        </div>
        <TextField
          variant="outlined"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: '#bdbdbd' }} />
              </InputAdornment>
            ),
          }}
          className="search-bar2"
          sx={{
            width: '300px',
            '& .MuiOutlinedInput-root': {
              height: '40px',
              '& fieldset': {
                borderColor: '#bdbdbd',
              },
              '&:hover fieldset': {
                borderColor: '#1565c0',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#0d47a1',
              },
            },
            '& .MuiInputAdornment-root': {
              color: '#1e88e5',
            },
            '& .MuiOutlinedInput-input': {
              padding: '8px 14px',
            },
          }}
        />
      </div>
      <div className='data-grid-container'>
        <DataGrid
          rows={filteredRows}
          columns={columns}
>>>>>>> f6a5ac9b81d5e744788973c3ebda3c2e1af791e4
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 20 },
            },
          }}
          pageSizeOptions={[5, 10, 20, 50]}
          sx={{
            '& .MuiDataGrid-columnHeaderTitle': {
              fontWeight: 'bold',
              color: '#1a237e',
              fontSize: '17px',
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#1e88e5',
            },
            '& .MuiDataGrid-footerContainer': {
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
            },
            '& .MuiTablePagination-root': {
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
            },
            '& .MuiTablePagination-toolbar': {
              justifyContent: 'center',
              flexWrap: 'wrap',
            },
            '& .MuiTablePagination-selectLabel': {
              display: 'inline-block',
              marginRight: '8px',
            },
            '& .MuiTablePagination-input': {
              marginLeft: '8px',
            },
          }}
        />
      </div>
      <button className='back-button3' onClick={handleBackClick}>
        <ArrowBackIcon sx={{ fontSize: '18px', marginTop: '0px', fontWeight: 'bold' }} />
        Back
      </button>
    </div>
  );
};

<<<<<<< HEAD
FacultyFRS.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    verticals: PropTypes.objectOf(PropTypes.number).isRequired,
    token: PropTypes.string.isRequired, // Added token for authentication
  }).isRequired,
};

=======
>>>>>>> f6a5ac9b81d5e744788973c3ebda3c2e1af791e4
export default FacultyFRS;
