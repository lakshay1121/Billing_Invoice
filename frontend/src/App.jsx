
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Sidebar from './components/common/SideBar';
import MasterHome from './modules/master/MasterHome';
import CustomerList from './modules/master/customer/CustomerList';
import AddCustomer from './modules/master/customer/AddCustomer';
import ItemList from './modules/master/item/ItemList';
import AddItem from './modules/master/item/AddItem';
import DashboardHome from './modules/dashboard/DashboardHome';
import DashboardInvoiceDetails from './modules/dashboard/DashboardInvoiceDetails';
import BillingHome from './modules/billing/BillingHome';

const drawerWidth = 240;

function App() {
  return (
  <Router>
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, marginLeft: `${drawerWidth}px` }}
        >
          <Routes>

            {/* Master module routes */}
            <Route path="/" element={<MasterHome />} />
            <Route path="/master/customerlist" element={<CustomerList />} />
            <Route path="/master/customeradd" element={<AddCustomer />} />
            <Route path="/master/itemlist" element={<ItemList />} />
            <Route path="/master/itemadd" element={<AddItem />} />
            {/* Dashboard module routes */}
            <Route path="/dashboard/home" element={<DashboardHome />} />
            <Route path="/dashboard/invoicedetails" element={<DashboardInvoiceDetails />} />
            {/* Billing module routes */}
            <Route path="/billing/home" element={<BillingHome />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
