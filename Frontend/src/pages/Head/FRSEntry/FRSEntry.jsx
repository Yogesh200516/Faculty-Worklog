// FRSEntry.js
import React, { useState } from 'react';
import { Tabs, Tab, TextField, Button, Box, Grid, Paper } from '@mui/material';
import formImage from '../../../assets/images/development.png';
import FacultyPopup from './FacultyPopup';
import './FRSEntry.css';

const TextFields = ({ formData, handleChange, handlePopupOpen, showPopup }) => (
  <>
    <TextField
      fullWidth
      label="Faculty Name"
      name="facultyName"
      value={formData.facultyName}
      onChange={handleChange}
      onClick={showPopup ? handlePopupOpen : null}
      variant="outlined"
      margin="normal"
    />
    <TextField
      fullWidth
      label="Faculty ID"
      name="facultyID"
      value={formData.facultyID}
      onChange={handleChange}
      onClick={showPopup ? handlePopupOpen : null}
      variant="outlined"
      margin="normal"
    />
    <TextField
      fullWidth
      label="FRS"
      name="frs"
      value={formData.frs}
      onChange={handleChange}
      variant="outlined"
      margin="normal"
    />
    <TextField
      fullWidth
      label="Reason Title"
      name="reasonTitle"
      value={formData.reasonTitle}
      onChange={handleChange}
      variant="outlined"
      margin="normal"
    />
    <TextField
      fullWidth
      label="Reason"
      name="reason"
      value={formData.reason}
      onChange={handleChange}
      variant="outlined"
      margin="normal"
      multiline
      rows={2}
    />
  </>
);

const FRSEntry = () => {
  const [tabValue, setTabValue] = useState(0);
  const [formData, setFormData] = useState({
    facultyName: '',
    facultyID: '',
    frs: '',
    reasonTitle: '',
    reason: '',
  });
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState([]);

  const facultyList = [
    { id: '1', name: 'John Doe', department: 'Computer Science' },
    { id: '2', name: 'Jane Smith', department: 'Mathematics' },
    { id: '3', name: 'Michael Johnson', department: 'Physics' },
    { id: '4', name: 'John Doe', department: 'Computer Science' },
    { id: '5', name: 'Jane Smith', department: 'Mathematics' },
    { id: '6', name: 'Michael Johnson', department: 'Physics' },
    { id: '7', name: 'John Doe', department: 'Computer Science' },
    { id: '8', name: 'Jane Smith', department: 'Mathematics' },
    { id: '9', name: 'Michael Johnson', department: 'Physics' },
    { id: '10', name: 'John Doe', department: 'Computer Science' },
    { id: '11', name: 'Jane Smith', department: 'Mathematics' },
    { id: '12', name: 'Michael Johnson', department: 'Physics' },
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClear = () => {
    setFormData({
      facultyName: '',
      facultyID: '',
      frs: '',
      reasonTitle: '',
      reason: '',
    });
    setSelectedFaculty([]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form Data:', formData);
    // Update FRS for all selected faculties
    selectedFaculty.forEach(id => {
      console.log(`Updating FRS for Faculty ID: ${id}`);
      // Add API call or logic here to update the FRS for each selected faculty
    });
  };

  const handlePopupOpen = () => {
    setPopupOpen(true);
  };

  const handlePopupClose = () => {
    setPopupOpen(false);
  };

  const handleFacultyChange = (newSelectedFaculty) => {
    setSelectedFaculty(newSelectedFaculty);
  };

  const handlePopupSubmit = () => {
    const selectedFaculties = facultyList.filter(faculty => selectedFaculty.includes(faculty.id));
    const facultyNames = selectedFaculties.map(faculty => faculty.name).join(', ');
    const facultyIDs = selectedFaculties.map(faculty => faculty.id).join(', ');

    setFormData({
      ...formData,
      facultyName: facultyNames,
      facultyID: facultyIDs,
    });

    handlePopupClose();
  };

  return (
    <Box className="frs-entry-container">
      <Paper elevation={3} className="frs-entry-paper">
        <div className='form-head'>FRS Update</div>
        <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
          <Tab label="Individual" sx={{ fontWeight: 'bold' }} />
          <Tab label="Bulk" sx={{ fontWeight: 'bold' }} />
        </Tabs>
        {tabValue === 0 && (
          <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextFields formData={formData} handleChange={handleChange} handlePopupOpen={handlePopupOpen} showPopup={false} />
                <Box mt={2} className="button-container">
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleClear}
                    className="clear-button"
                  >
                    Clear
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    className="submit-button"
                  >
                    Submit
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12} sm={5} container justifyContent="center" alignItems="center">
                <img src={formImage} alt="FRS Illustration" className="frs-illustration" />
              </Grid>
            </Grid>
          </Box>
        )}
        {tabValue === 1 && (
          <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextFields formData={formData} handleChange={handleChange} handlePopupOpen={handlePopupOpen} showPopup={true} />
                <Box mt={2} className="button-container">
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleClear}
                    className="clear-button"
                  >
                    Clear
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    className="submit-button"
                  >
                    Submit
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12} sm={5} container justifyContent="center" alignItems="center">
                <img src={formImage} alt="FRS Illustration" className="frs-illustration" />
              </Grid>
            </Grid>
          </Box>
        )}
      </Paper>
      <FacultyPopup
        open={popupOpen}
        onClose={handlePopupClose}
        facultyList={facultyList}
        selectedFaculty={selectedFaculty}
        handleFacultyChange={handleFacultyChange}
        handlePopupSubmit={handlePopupSubmit}
      />
    </Box>
  );
};

export default FRSEntry;
