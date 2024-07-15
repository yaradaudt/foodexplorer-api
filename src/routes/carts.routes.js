const { Router } = require("express")

const CartsController = require("../controllers/CartsController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const cartsRoutes = Router()

const cartsController = new CartsController()

cartsRoutes.use(ensureAuthenticated) // when using the middleware to all methods, use to simplify

cartsRoutes.get("/", cartsController.index)
cartsRoutes.post("/", cartsController.create)
cartsRoutes.get("/:dish_id", cartsController.show)
cartsRoutes.put("/:dish_id", cartsController.update)
cartsRoutes.delete("/", cartsController.delete)


module.exports = cartsRoutes