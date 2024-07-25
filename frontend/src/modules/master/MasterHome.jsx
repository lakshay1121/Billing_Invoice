import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, Box } from '@mui/material';

const MasterHome = () => {
  return (
    <div style={{width:'90vw'}}>
    <Box
      display="flex"
      justifyContent="flex-start"
      alignItems="flex-start"
      height="100vh"
      gap={2}
      padding={2}
      marginTop={4} 
      marginLeft={4} 
    >
      <Card
        component={Link}
        to="/master/customerlist"
        sx={{ minWidth: 180, textDecoration: 'none', padding: 2 }}
      >
        <CardContent>
          <Typography variant="h2" component="div">
            Customers
          </Typography>
          <Typography variant="body2">
            Read or Create customer data
          </Typography>
        </CardContent>
      </Card>
      <Card
        component={Link}
        to="/master/itemlist"
        sx={{ minWidth: 180, textDecoration: 'none', padding: 2 }}
      >
        <CardContent>
          <Typography variant="h2" component="div">
            Items
          </Typography>
          <Typography variant="body2">
            Read or Create item data
          </Typography>
        </CardContent>
      </Card>
    </Box>
    </div>
  );
};

export default MasterHome;
