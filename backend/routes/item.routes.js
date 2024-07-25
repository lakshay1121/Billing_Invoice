const router = require('express');
const Router = router.Router;
const finalRouter = new Router();
const {handleGetItems, handlePostItem,handleGetItemById} = require('../controllers/item.controller')

finalRouter.route("/items").get(handleGetItems);
finalRouter.route("/:ItemId").get(handleGetItemById);
finalRouter.route('/add').post(handlePostItem);

module.exports = finalRouter;