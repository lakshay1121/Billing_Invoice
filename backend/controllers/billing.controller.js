const { db } = require("../db/db");

const handleGetBillings = (req, res) => {
  const sql =
    "SELECT b.invoiceId, b.totalAmount,b.itemCount, c.custId, c.custName, c.custAddress, c.custPAN, c.custGST, i.itemId, i.itemName, i.itemPrice, i.itemActive FROM Billing b JOIN Customers c ON b.customerId = c.custId JOIN Items i ON b.itemId = i.itemId";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
};

const generateInvoiceId = () => {
  const prefix = "INVC";
  const uniqueNumber = Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(6, "0");
  return `${prefix}${uniqueNumber}`;
};

const handlePostBill = (req, res) => {
  const { customerId, itemId, totalAmount, itemCount } = req.body;

  const invoiceId = generateInvoiceId();

  console.log(customerId, itemId, totalAmount, itemCount, invoiceId);

  const sql =
    "INSERT INTO Billing (customerId, itemId, invoiceId, totalAmount, itemCount) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [customerId, itemId, invoiceId, totalAmount,itemCount], (err) => {
    if (err) return res.json(err);
    return res.json({ message: "Bill created successfully", invoiceId });
  });
};

// search api for dashboard.

const handleSearchInvoice = (req, res) => {
  const { invoiceId } = req.params;
  const sql = `
     SELECT b.invoiceId, b.totalAmount, c.custId, c.custName, c.custAddress, c.custPAN, c.custGST, i.itemId, i.itemName, i.itemPrice, i.itemActive FROM Billing b JOIN Customers c ON b.customerId = c.custId JOIN Items i ON b.itemId = i.itemId WHERE b.invoiceId = ?;
`;

  db.query(sql, [invoiceId], (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    if (results.length === 0)
      return res.status(404).json({ message: "Invoice not found" });
    return res.json(results[0]);
  });
};

module.exports = { handlePostBill, handleGetBillings, handleSearchInvoice };
