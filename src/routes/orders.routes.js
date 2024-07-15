const { Router } = require("express")

const OrdersController = require("../controllers/OrdersController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const ordersRoutes = Router()

const ordersController = new OrdersController()

ordersRoutes.use(ensureAuthenticated)

ordersRoutes.get("/", ordersController.index)
ordersRoutes.post("/", ordersController.create)
ordersRoutes.get("/:id", ordersController.show);
ordersRoutes.delete("/:id", ordersController.delete)
//UPDATE coming soon


module.exports = ordersRoutes