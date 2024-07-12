const { Router } = require("express")

const CartsController = require("../controllers/CartsController")

const cartsRoutes = Router()

const cartsController = new CartsController()

cartsRoutes.get("/:user_id", cartsController.index)
cartsRoutes.post("/:user_id", cartsController.create)
cartsRoutes.get("/:user_id/:dish_id", cartsController.show)
cartsRoutes.put("/:user_id/:dish_id", cartsController.update)
cartsRoutes.delete("/:user_id", cartsController.delete)



module.exports = cartsRoutes