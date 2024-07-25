import React, { useState, useEffect } from 'react';
import { TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography, Button } from '@mui/material';
import { getBillings } from '../../services/ApiService';
import { useNavigate } from 'react-router-dom';

const DashboardHome = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); // Initialize the useNavigate hook

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getBillings(); 
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // Filter data based on search term
  const filteredData = data.filter(item =>
    item.invoiceId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle the view button click
  const handleViewClick = (item) => {
    navigate(`/dashboard/invoicedetails`,{ state: {data:item } });
  };

  return (
    <Box padding={3}>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard Home
      </Typography>
      <TextField
        label="Search by Invoice ID"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Invoice ID</TableCell>
              <TableCell>Item Name</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell>Actions</TableCell> 
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((item) => (
              <TableRow key={item.invoiceId}>
                <TableCell>{item.invoiceId}</TableCell>
                <TableCell>{item.itemName}</TableCell>
                <TableCell>{item.custName}</TableCell>
                <TableCell>{item.totalAmount}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleViewClick(item)}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DashboardHome;
