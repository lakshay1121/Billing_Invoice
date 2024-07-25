const sql = require("mysql");

const db = sql.createConnection({
  host: "localhost",
  user: "root",
  password: "L12@lk34",
  database: "dummyDB",
});

const connectToDb = () => {
  db.connect((err) => {
    if (err) {
      console.error("Database connection failed: " + err);
      return;
    }
    console.log("Database connected");
  });
};

module.exports = { db, connectToDb };
