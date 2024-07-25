const { db } = require('../db/db');

const handleGetCustomers = (req, res) => {
    const sql = "SELECT * FROM customers";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
};
// post customer.

const handlePostCustomer = (req, res) => {
    const { custName, custAddress, custPAN, custGST, isActive } = req.body;

    if (!custName || !custAddress || !custPAN || !custGST || !isActive) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const sql = "INSERT INTO Customers (custName, custAddress, custPAN, custGST, isActive) VALUES (?, ?, ?, ?, ?)";
    const values = [custName, custAddress, custPAN, custGST, isActive];

    db.query(sql, values, (err, result) => {
        if (err) return res.json(err);
        return res.json({ message: 'Customer added successfully', data : result.insertId });
    });
};

// get customer by id.

const handleGetCustomerById = (req, res) => {
    const { customerId } = req.params;
    console.log(customerId);
    const sql = "SELECT * FROM Customers WHERE custId = ?";
    
    db.query(sql, [customerId], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        if (results.length === 0) return res.status(404).json({ message: 'Customer not found' });

        return res.json(results[0]);
    });
};

module.exports = { handleGetCustomers,handlePostCustomer , handleGetCustomerById };
