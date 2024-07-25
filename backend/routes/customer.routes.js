const router = require('express');
const Router = router.Router;
const finalRouter = new Router();
const {handleGetCustomers,handlePostCustomer, handleGetCustomerById} = require('../controllers/customer.controller')

finalRouter.route("/customers").get(handleGetCustomers);
finalRouter.route("/:customerId").get(handleGetCustomerById);
finalRouter.route('/add').post(handlePostCustomer);

module.exports = finalRouter;