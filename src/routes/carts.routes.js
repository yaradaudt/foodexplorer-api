const { Router } = require("express")

const CartsController = require("../controllers/CartsController")

const cartsRoutes = Router()

const cartsController = new CartsController()

cartsRoutes.post("/:user_id", cartsController.create)
cartsRoutes.put("/:user_id/:dish_id", cartsController.update)


module.exports = cartsRoutes