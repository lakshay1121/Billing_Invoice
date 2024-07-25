const express = require("express");
const { connectToDb } = require("./db/db");
const app = express();
const cors = require("cors");

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// router.

const customerRouter = require("./routes/customer.routes");
const itemRouter = require("./routes/item.routes");
const billingRouter = require("./routes/billing.routes");

// db connection.
connectToDb();

// customer routes.
app.use("/api/v1/customer", customerRouter);

// items routes.
app.use("/api/v1/item", itemRouter);

// billing routes.

app.use("/api/v1/billing", billingRouter);

app.listen(8000, () => {
  console.log("listening....");
});
