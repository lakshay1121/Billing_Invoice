import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Snackbar, Alert, Card, CardContent } from '@mui/material';
import { getCustomers, getItems, postBill } from '../../services/ApiService';

const BillingHome = () => {
  const [customerDialogOpen, setCustomerDialogOpen] = useState(false);
  const [itemDialogOpen, setItemDialogOpen] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [itemCount, setItemCount] = useState(1);
  const [totalAmount, setTotalAmount] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customerData = await getCustomers();
        setCustomers(customerData);

        const itemData = await getItems();
        setItems(itemData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleCustomerSelect = (customer) => {
    setSelectedCustomer(customer);
    setCustomerDialogOpen(false);
  };

  const handleItemSelect = (item) => {
    setSelectedItems([...selectedItems, item]);
    setItemDialogOpen(false);
  };

  const calculateTotalAmount = () => {
    const itemTotal = selectedItems.reduce((acc, item) => acc + parseFloat(item.itemPrice) * itemCount, 0);
    if (selectedCustomer && selectedCustomer.custGST && selectedCustomer.isActive === 'Y') {
      setTotalAmount(itemTotal);
    } else {
      setTotalAmount(itemTotal * 1.18);
    }
  };

  useEffect(() => {
    calculateTotalAmount();
  }, [selectedItems, itemCount, selectedCustomer]);

  const handleCreateBill = async () => {


    console.log(selectedItems)

    const billData = {
      customerId: selectedCustomer.custId,
      itemId: selectedItems[0].ItemId,
      totalAmount,
      itemCount

    };

    console.log(billData);

    try {
      await postBill(billData);
      setSnackbarMessage('Bill created successfully!');
      setSnackbarSeverity('success');
      setSelectedCustomer(null);
      setSelectedItems([]);
      setItemCount(1);
      setTotalAmount(0);
    } catch (error) {
      setSnackbarMessage('Failed to create bill. Please try again.');
      setSnackbarSeverity('error');
    } finally {
      setSnackbarOpen(true);
    }
  };

  return (
    <Box padding={3}>
      <Typography variant="h4" component="h1" gutterBottom>
        Billing Home
      </Typography>

      {/* Customer Details Section */}
      <Paper elevation={3} sx={{ padding: 2, marginBottom: 3 }}>
        <Typography variant="h6">Customer Details</Typography>
        {selectedCustomer ? (
          <Box marginTop={2}>
            <Typography variant="body1"><strong>Name:</strong> {selectedCustomer.custName}</Typography>
            <Typography variant="body1"><strong>Address:</strong> {selectedCustomer.custAddress}</Typography>
            <Typography variant="body1"><strong>PAN Card:</strong> {selectedCustomer.custPAN}</Typography>
            <Typography variant="body1"><strong>GST No:</strong> {selectedCustomer.custGST}</Typography>
          </Box>
        ) : (
          <Button variant="contained" onClick={() => setCustomerDialogOpen(true)}>Add Customer</Button>
        )}
      </Paper>

      {/* Items Section */}
      {selectedCustomer && (
        <Paper elevation={3} sx={{ padding: 2, marginBottom: 3 }}>
          <Typography variant="h6">Items</Typography>
          {selectedItems.length > 0 ? (
            <TableContainer component={Paper} sx={{ marginTop: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Item Name</TableCell>
                    <TableCell>Item Count</TableCell>
                    <TableCell>Total Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedItems.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.itemName}</TableCell>
                      <TableCell>
                        <TextField
                          type="number"
                          value={itemCount}
                          onChange={(e) => setItemCount(parseInt(e.target.value))}
                          inputProps={{ min: 1 }}
                        />
                      </TableCell>
                      <TableCell>{(parseFloat(item.itemPrice) * itemCount).toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={2}><strong>Total Amount</strong></TableCell>
                    <TableCell>{totalAmount.toFixed(2)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Button variant="contained" onClick={() => setItemDialogOpen(true)}>Add Item</Button>
          )}
        </Paper>
      )}

      {selectedCustomer && selectedItems.length > 0 && (
        <Button variant="contained" color="primary" onClick={handleCreateBill}>
          Create Bill
        </Button>
      )}

      {/* Customer Dialog */}
      <Dialog open={customerDialogOpen} onClose={() => setCustomerDialogOpen(false)}>
        <DialogTitle>Select Customer</DialogTitle>
        <DialogContent>
          {/* {customers.map((customer) => (
            <Button key={customer.custId} onClick={() => handleCustomerSelect(customer)}>
              {customer.custName}
            </Button>

            
          ))} */}

          <Box
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        gap={2}
        width={'90vw'}
      >
        {customers.map(customer => (
          <Card
            key={customer.custId}
            onClick={() => handleCustomerSelect(customer)}
            sx={{
              minWidth: 200,
              position: 'relative',
              padding: 2,
              marginBottom: 2,
            }}
          >
            <CardContent>
              <Typography variant="h5" component="h2">
                {customer.custName}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  position: 'absolute',
                  bottom: 10,
                  right: 10,
                  color: customer.isActive === 'Y' ? 'green' : 'red',
                  backgroundColor: customer.isActive === 'Y' ? '#e0f2f1' : '#ffebee',
                  padding: '4px 8px',
                  borderRadius: 4
                }}
              >
                {customer.isActive === 'Y' ? 'Active' : 'Inactive'}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCustomerDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Item Dialog */}
      <Dialog open={itemDialogOpen} onClose={() => setItemDialogOpen(false)}>
        <DialogTitle>Select Item</DialogTitle>
        <DialogContent>
          {/* {items.filter(item => item.itemActive === 'Y').map((item) => (
            <Button key={item.itemId} onClick={() => handleItemSelect(item)}>
              {item.itemName}
            </Button>
          ))} */}

          <Box
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        gap={2}
        width={'90vw'}
      >

        {items.filter(item => item.itemActive === 'Y').map(item => (
          <Card
            key={item}
            sx={{
              minWidth: 200,
              position: 'relative',
              padding: 2,
              marginBottom: 2
            }}
            onClick={() => handleItemSelect(item)}
          >
            <CardContent>
              <Typography variant="h5" component="h2">
                {item.itemName}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  position: 'absolute',
                  bottom: 10,
                  right: 10,
                  color: item.itemActive === 'Y' ? 'green' : 'red',
                  backgroundColor: item.itemActive === 'Y' ? '#e0f2f1' : '#ffebee',
                  padding: '4px 8px',
                  borderRadius: 4
                }}
              >
                {item.itemActive === 'Y' ? 'Active' : 'Inactive'}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setItemDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default BillingHome;
