const { Router } = require("express")

const DishesController = require("../controllers/DishesController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization")

const dishesRoutes = Router()
const dishesController = new DishesController()

dishesRoutes.post("/", ensureAuthenticated, verifyUserAuthorization("admin"), dishesController.create)//admin
dishesRoutes.get("/:id", dishesController.show)//all
dishesRoutes.get("/", dishesController.index)//all
dishesRoutes.delete("/:id", ensureAuthenticated, verifyUserAuthorization("admin"), dishesController.delete)//admin
//update = true // admin


module.exports = dishesRoutes
