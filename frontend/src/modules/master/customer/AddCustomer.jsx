import React, { useState } from 'react';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, Box, Typography, Snackbar, Alert } from '@mui/material';
import { addCustomer } from '../../../services/ApiService';
import { useNavigate } from 'react-router-dom';

const AddCustomer = () => {
  const [custName, setCustName] = useState('');
  const [custAddress, setCustAddress] = useState('');
  const [custPAN, setCustPAN] = useState('');
  const [custGST, setCustGST] = useState('');
  const [isActive, setIsActive] = useState('Y');
  const [error, setError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); 
  const navigate = useNavigate();

  const validateForm = () => {
    if (!custName || !custAddress || !custPAN || !custGST || !isActive) {
      setError('All fields are required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const customerData = {
      custName,
      custAddress,
      custPAN,
      custGST,
      isActive
    };

    try {
      const data = await addCustomer(customerData);
      console.log(data);
      setCustName('');
      setCustAddress('');
      setCustPAN('');
      setCustGST('');
      setIsActive('Y');
      setError('');
      setSnackbarMessage('Customer added successfully!');
      setSnackbarSeverity('success');
    } catch (error) {
      console.error('Error while adding customer', error);
      setError('Failed to add customer. Please try again.');
      setSnackbarMessage('Failed to add customer. Please try again.');
      setSnackbarSeverity('error');
    } finally {
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleGoBack = () => {
    navigate('/master/customerlist');
  };

  return (
    <Box padding={2}>
      <Typography variant="h4" component="h1" gutterBottom>
        Add Customer
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Customer Name"
            variant="outlined"
            value={custName}
            onChange={(e) => setCustName(e.target.value)}
            required
            error={!custName && error}
            helperText={!custName && error ? 'Customer Name is required' : ''}
          />
          <TextField
            label="Customer Address"
            variant="outlined"
            value={custAddress}
            onChange={(e) => setCustAddress(e.target.value)}
            required
            error={!custAddress && error}
            helperText={!custAddress && error ? 'Customer Address is required' : ''}
          />
          <TextField
            label="Customer PAN"
            variant="outlined"
            value={custPAN}
            onChange={(e) => setCustPAN(e.target.value)}
            required
            error={!custPAN && error}
            helperText={!custPAN && error ? 'Customer PAN is required' : ''}
          />
          <TextField
            label="Customer GST"
            variant="outlined"
            value={custGST}
            onChange={(e) => setCustGST(e.target.value)}
            required
            error={!custGST && error}
            helperText={!custGST && error ? 'Customer GST is required' : ''}
          />
          <FormControl variant="outlined" required>
            <InputLabel id="isActive-label">Active</InputLabel>
            <Select
              labelId="isActive-label"
              value={isActive}
              onChange={(e) => setIsActive(e.target.value)}
              label="Active"
              error={!isActive && error}
            >
              <MenuItem value="Y">Yes</MenuItem>
              <MenuItem value="N">No</MenuItem>
            </Select>
            {!isActive && error && <Typography color="error">Active status is required</Typography>}
          </FormControl>
          {error && <Typography color="error">{error}</Typography>}
          <Button variant="contained" color="primary" type="submit">
            Add Customer
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleGoBack} style={{ marginTop: '16px' }}>
            Go To ListPage
          </Button>
        </Box>
      </form>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddCustomer;
