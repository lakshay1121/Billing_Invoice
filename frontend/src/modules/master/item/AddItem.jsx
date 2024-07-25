import React, { useState } from 'react';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, Box, Typography, Snackbar, Alert } from '@mui/material';
import { addItem } from '../../../services/ApiService';
import { useNavigate } from 'react-router-dom';

const AddItem = () => {
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemActive, setItemActive] = useState('Y');
  const [error, setError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); 
  const navigate = useNavigate();

  const validateForm = () => {
    if (!itemName || !itemPrice || !itemActive) {
      setError('All fields are required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const itemData = {
      itemName,
      itemPrice,
      itemActive,
    };

    try {
      const data = await addItem(itemData);
      console.log(data);
      setItemName('');
      setItemPrice('');
      setItemActive('Y');
      setSnackbarMessage('Item added successfully!');
      setSnackbarSeverity('success');
    } catch (error) {
      console.error('Error while adding item', error);
      setError('Failed to add item. Please try again.');
      setSnackbarMessage('Failed to add item. Please try again.');
      setSnackbarSeverity('error');
    } finally {
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleGoBack = () => {
    navigate('/master/itemlist');
  };

  return (
    <Box padding={2}>
      <Typography variant="h4" component="h1" gutterBottom>
        Add Item
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Item Name"
            variant="outlined"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            required
            error={!itemName && error}
            helperText={!itemName && error ? 'Item Name is required' : ''}
          />
          <TextField
            label="item Price"
            variant="outlined"
            value={itemPrice}
            onChange={(e) => setItemPrice(e.target.value)}
            required
            error={!itemPrice && error}
            helperText={!itemPrice && error ? 'Item price is required' : ''}
          />
         
          <FormControl variant="outlined" required>
            <InputLabel id="isActive-label">Active</InputLabel>
            <Select
              labelId="isActive-label"
              value={itemActive}
              onChange={(e) => setItemActive(e.target.value)}
              label="Active"
              error={!itemActive && error}
            >
              <MenuItem value="Y">Yes</MenuItem>
              <MenuItem value="N">No</MenuItem>
            </Select>
            {!itemActive && error && <Typography color="error">Active status is required</Typography>}
          </FormControl>
          {error && <Typography color="error">{error}</Typography>}
          <Button variant="contained" color="primary" type="submit">
            Add Item
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

export default AddItem;
