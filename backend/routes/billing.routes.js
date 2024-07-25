const router = require("express");
const Router = router.Router;
const finalRouter = new Router();
const {
  handlePostBill,
  handleGetBillings,
  handleSearchInvoice,
} = require("../controllers/billing.controller");

finalRouter.route("/billings").get(handleGetBillings);
finalRouter.route("/:invoiceId").get(handleSearchInvoice);
finalRouter.route("/add").post(handlePostBill);

module.exports = finalRouter;
