const { db } = require("../db/db");

const handleGetItems = (req, res) => {
  const sql = "SELECT * FROM items";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
};
// post item.

const handlePostItem = (req, res) => {
  const { itemName, itemPrice, itemActive } = req.body;

  if (!itemName || !itemPrice || !itemActive) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql =
    "INSERT INTO items (itemName, itemPrice, itemActive) VALUES (?, ?, ?)";
  const values = [itemName, itemPrice, itemActive];

  db.query(sql, values, (err, result) => {
    if (err) return res.json(err);
    return res.json({
      message: "Item added successfully",
      data: result.insertId,
    });
  });
};

// get item by id.

const handleGetItemById = (req, res) => {
    const { ItemId } = req.params;
    console.log(ItemId);
    const sql = "SELECT * FROM Items WHERE ItemId = ?";
    
    db.query(sql, [ItemId], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        if (results.length === 0) return res.status(404).json({ message: 'Item not found' });

        return res.json(results[0]);
    });
};

module.exports = { handleGetItems, handlePostItem, handleGetItemById };
