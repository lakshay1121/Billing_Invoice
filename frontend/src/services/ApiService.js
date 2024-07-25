import axios from 'axios';
import {BASE_URL} from '../env';
const api = axios.create({
  baseURL: BASE_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
});

// GET request method
export const getCustomers = async () => {
  try {
    const response = await api.get(`/customer/customers`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data', error);
    throw error;
  }
};

// POST request method
export const addCustomer = async (data) => {
  try {
    const response = await api.post('/customer/add', data);
    return response.data;
  } catch (error) {
    console.error('Error posting data', error);
    throw error;
  }
};

// // GET by ID request method
// const getById = async (url, id) => {
//   try {
//     const response = await api.get(`${url}/${id}`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching data by ID', error);
//     throw error;
//   }
// };


// GET request method
export const getItems = async () => {
    try {
      const response = await api.get(`/item/items`);
      return response.data;
    } catch (error) {
      console.error('Error fetching data', error);
      throw error;
    }
  };
  
  // POST request method
  export const addItem = async (data) => {
    try {
      const response = await api.post('/item/add', data);
      return response.data;
    } catch (error) {
      console.error('Error posting data', error);
      throw error;
    }
  };

  // get billing api for dashboard.

  export const getBillings = async () => {
    try {
      const response = await api.get(`/billing/billings`);
      return response.data;
    } catch (error) {
      console.error('Error fetching data', error);
      throw error;
    }
  };

  // post bill api.

  export const postBill = async (data) => {
    try {
      const response = await api.post('/billing/add', data);
      return response.data;
    } catch (error) {
      console.error('Error posting data', error);
      throw error;
    }
  };

