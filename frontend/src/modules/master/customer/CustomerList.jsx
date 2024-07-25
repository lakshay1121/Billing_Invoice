import React, { useEffect, useState } from 'react';
import { getCustomers } from '../../../services/ApiService';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await getCustomers();
        setCustomers(data); 
      } catch (error) {
        console.error('Error while fetching customers', error);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <Box padding={2}>
      {/* Container for heading and add card */}
      <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={2}>
        <Typography variant="h4" component="h1" marginBottom={30}>
          Customers
        </Typography>
        <Card
          component={Link}
          to="/master/customeradd"
          sx={{
            minWidth: 100,
            textDecoration: 'none',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <CardContent>
            <Typography variant="h6" component="div">
              Add
            </Typography>
          </CardContent>
        </Card>
      </Box>
      {/* Container for customer cards */}
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
            sx={{
              minWidth: 200,
              position: 'relative',
              padding: 2,
              marginBottom: 2
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
    </Box>
  );
};

export default CustomerList;
