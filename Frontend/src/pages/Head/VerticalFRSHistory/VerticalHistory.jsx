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
    }
  };

  const columnWidths = getColumnWidth();

  const columns = [
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
  }, [searchText, rows]);

  const handleBackClick = () => {
    navigate('/head-dashboard');
  };

  return (
    <div className="grid-full3">
      <div className="header-container">
        <div className='frs-heading'>
          <FontAwesomeIcon icon={faHistory} className="history-icon" />
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

export default FacultyFRS;
