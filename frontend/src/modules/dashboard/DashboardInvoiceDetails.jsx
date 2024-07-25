import React from "react";
import { useLocation } from "react-router-dom";
import { Box, Typography, Paper, Grid, Divider } from "@mui/material";

const DashboardInvoiceDetails = () => {
  const location = useLocation();
  const { data } = location.state;

  console.log(data);

  return (
    <Box padding={3} backgroundColor="white" width="80vw" height="90vh">
      <Typography variant="h4" component="h1" gutterBottom>
        Invoice Details
      </Typography>

      {/* Customer Details Card */}
      <Paper elevation={3} sx={{ padding: 2, marginBottom: 3 }}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Customer Details</Typography>
          <Typography variant="h6">Invoice ID: {data.invoiceId}</Typography>
        </Grid>
        <Divider sx={{ marginTop: 2 }} />
        <Box
          marginTop={4}
          justifyContent={"flex-start"}
          alignItems={"flex-start"}
          display={"flex"}
          flexDirection={"column"}
        >
          <Typography variant="body1" marginBottom={0.2}>
            <strong>Name:</strong> {data.custName}
          </Typography>
          <Typography variant="body1" marginBottom={0.2}>
            <strong>Address:</strong> {data.custAddress}
          </Typography>
          <Typography variant="body1" marginBottom={0.2}>
            <strong>PAN Card:</strong> {data.custPAN}
          </Typography>
          <Typography variant="body1" marginBottom={0.2}>
            <strong>GST No:</strong> {data.custGST}
          </Typography>
        </Box>
      </Paper>

      {/* Items Container */}
      <Paper elevation={3} sx={{ padding: 2 }}>
        <Typography variant="h6" gutterBottom>
          Items
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography variant="body1">
                <strong>Item Name:</strong>
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1">
                <strong>Item Count:</strong>
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1">
                <strong>Total Amount:</strong>
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ marginTop: 2 }}>
            <Grid item xs={4}>
              <Typography variant="body1">{data.itemName}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1">{data.itemCount}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1">{data.totalAmount}</Typography>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};

export default DashboardInvoiceDetails;
