import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Grid, Paper } from '@mui/material';
import formImage from '../../../assets/images/development.png';
import FacultyPopup from './FacultyPopup';
import './FRSEntry.css';
import PropTypes from 'prop-types';

const TextFields = ({ formData, handleChange, handlePopupOpen }) => (
  <>
    <TextField
      fullWidth
      label="Faculty Name"
      name="facultyName"
      value={formData.facultyName}
      onChange={handleChange}
      onClick={handlePopupOpen} // Open popup when Faculty Name is clicked
      variant="outlined"
      margin="normal"
    />
    <TextField
      fullWidth
      label="Faculty ID"
      name="facultyID"
      value={formData.facultyID}
      onChange={handleChange}
      variant="outlined"
      margin="normal"
      disabled // Disable manual entry for Faculty ID
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
      name="reason"
      value={formData.reason}
      onChange={handleChange}
      variant="outlined"
      margin="normal"
    
    />
    <TextField
      fullWidth
      label="Reason"
      name="reasonTitle"
      value={formData.reasonTitle}
      onChange={handleChange}
      variant="outlined"
      margin="normal"
      multiline
      rows={2}
    />
  
  </>
);

TextFields.propTypes = {
  formData: PropTypes.shape({
    facultyName: PropTypes.string.isRequired,
    facultyID: PropTypes.string.isRequired,
    frs: PropTypes.string.isRequired,
    reasonTitle: PropTypes.string.isRequired,
    reason: PropTypes.string.isRequired,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handlePopupOpen: PropTypes.func.isRequired,
};

const FRSEntry = ({ user }) => {
  const verticalDisplayNames = {
    vertical_academics: 'Academics',
    vertical_coe: 'COE',
    vertical_iqac: 'IQAC',
    vertical_skillteam: 'Skill Team',
    vertical_speciallab: 'Special Lab',
  };

  const getVerticalName = () => {
    const verticals = user.verticals;
    for (const key in verticals) {
      if (verticals[key] === 1) {
        return verticalDisplayNames[key] || key;
      }
    }
    return '';
  };

  const [formData, setFormData] = useState({
    facultyName: '',
    facultyID: '',
    frs: '',
    reasonTitle: '',
    reason: '',
    verticalheadsid: user.id,
    vertical: getVerticalName(),
  });

  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState([]);
  const [facultyList, setFacultyList] = useState([]);
  const [responseMessage, setResponseMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    const fetchFacultyList = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/faculty/list', {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        if (data && Array.isArray(data.users)) {
          setFacultyList(data.users);
        } else {
          console.error('Expected data.users to be an array but received:', typeof data.users);
        }
      } catch (error) {
        console.error('Error fetching faculty list:', error);
      }
    };

    fetchFacultyList();
  }, []);

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
      verticalheadsid: user.id,
      vertical: getVerticalName(),
    });
    setSelectedFaculty([]);
    setResponseMessage('');
    setHasSubmitted(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (isSubmitting || hasSubmitted) return;
  
    setIsSubmitting(true);
  
    try {
      console.log("Submitting formData:", formData); // Log the data being submitted
  
      const response = await fetch('http://localhost:4000/api/frs/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ facultyData: [formData] }),
      });
  
      const result = await response.json();
  
      console.log("Response status:", response.status); // Log the response status
      console.log("Response result:", result); // Log the response content
  
      if (response.ok) {
        setResponseMessage('FRS added successfully!');
        setHasSubmitted(true);
        handleClear();
      } else {
        setResponseMessage(`Error submitting FRS: ${result.message}`);
      }
    } catch (error) {
      console.error('Error submitting FRS:', error);
      setResponseMessage('Error submitting FRS. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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
    const selectedFaculties = facultyList.filter((faculty) =>
      selectedFaculty.includes(faculty.id)
    );

    const facultyNames = selectedFaculties.map((faculty) => faculty.name).join(', ');
    const facultyIDs = selectedFaculties.map((faculty) => faculty.id).join(', ');

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
        <div className="form-head">FRS Update</div>
        <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextFields
                formData={formData}
                handleChange={handleChange}
                handlePopupOpen={handlePopupOpen}
              />
              <Box mt={2} className="button-container">
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleClear}
                  className="clear-button"
                  disabled={isSubmitting}
                >
                  Clear
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  className="submit-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </Button>
              </Box>
              {responseMessage && (
                <Box mt={2} className="response-message">
                  {responseMessage}
                </Box>
              )}
            </Grid>
            <Grid
              item
              xs={12}
              sm={5}
              container
              justifyContent="center"
              alignItems="center"
            >
              <img src={formImage} alt="FRS Illustration" className="frs-illustration" />
            </Grid>
          </Grid>
        </Box>
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

FRSEntry.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    verticals: PropTypes.objectOf(PropTypes.number).isRequired,
  }).isRequired,
};

export default FRSEntry;