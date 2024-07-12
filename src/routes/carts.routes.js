const { Router } = require("express")

const CartsController = require("../controllers/CartsController")

const cartsRoutes = Router()

const cartsController = new CartsController()

cartsRoutes.post("/:user_id", cartsController.create)

module.exports = cartsRoutes