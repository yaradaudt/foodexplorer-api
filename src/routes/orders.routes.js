const { Router } = require("express")

const OrdersController = require("../controllers/OrdersController")

const ordersRoutes = Router()

const ordersController = new OrdersController()

ordersRoutes.get("/:user_id", ordersController.index)
ordersRoutes.post("/:user_id", ordersController.create)
ordersRoutes.get("/:id", ordersController.show);
ordersRoutes.delete("/:id", ordersController.delete)


module.exports = ordersRoutes