const { Router } = require("express")

const FavoritesController = require("../controllers/FavoritesController")

const favoritesRoutes = Router()
const favoritesController = new FavoritesController()

favoritesRoutes.get("/", favoritesController.index)
favoritesRoutes.post("/:user_id", favoritesController.create)

module.exports = favoritesRoutes
