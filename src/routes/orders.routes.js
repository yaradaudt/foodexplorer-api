const { Router } = require("express")

const OrdersController = require("../controllers/OrdersController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization")

const ordersRoutes = Router()

const ordersController = new OrdersController()

ordersRoutes.use(ensureAuthenticated)

ordersRoutes.get("/", ordersController.index)
ordersRoutes.post("/", ordersController.create)
ordersRoutes.put("/:id", verifyUserAuthorization("admin"), ordersController.update)
ordersRoutes.delete("/:id", verifyUserAuthorization("admin"), ordersController.delete)
ordersRoutes.get("/:id", ordersController.show)


module.exports = ordersRoutes