import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, List, ListItem, ListItemText, Drawer, CssBaseline, Typography, Toolbar } from '@mui/material';

const drawerWidth = 240;

const Sidebar = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path,{replace:true});
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            position: 'fixed',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem button onClick={() => handleNavigation('/')}>
              <ListItemText primary="Master" />
            </ListItem>
            <ListItem button onClick={() => handleNavigation('/billing/home')}>
              <ListItemText primary="Billing" />
            </ListItem>
            <ListItem button onClick={() => handleNavigation('/dashboard/home')}>
              <ListItemText primary="Dashboard" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
      {/* <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, marginLeft: `${drawerWidth}px` }}
      >
        <Toolbar />
        <Typography variant="h4">Welcome to the Application</Typography>
      </Box> */}
    </Box>
  );
};

export default Sidebar;
