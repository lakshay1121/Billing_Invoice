import React, { useEffect, useState } from 'react';
import { getItems } from '../../../services/ApiService';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const ItemList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getItems();
        setItems(data); 
      } catch (error) {
        console.error('Error while fetching items', error);
      }
    };

    fetchItems();
  }, []);

  return (
    <Box padding={2}>
      {/* Container for heading and add card */}
      <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={2}>
        <Typography variant="h4" component="h1" marginBottom={30}>
          Items
        </Typography>
        <Card
          component={Link}
          to="/master/itemadd"
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
      {/* Container for items cards */}
      <Box
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        gap={2}
        width={'90vw'}
      >

        {items.map(item => (
          <Card
            key={item}
            sx={{
              minWidth: 200,
              position: 'relative',
              padding: 2,
              marginBottom: 2
            }}
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
    </Box>
  );
};

export default ItemList;
