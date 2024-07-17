const { Router } = require("express")

const DishesController = require("../controllers/DishesController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization")

const dishesRoutes = Router()
const dishesController = new DishesController()

dishesRoutes.get("/", dishesController.index)//all
dishesRoutes.post("/", ensureAuthenticated, verifyUserAuthorization("admin"), dishesController.create)//admin
dishesRoutes.delete("/:id", ensureAuthenticated, verifyUserAuthorization("admin"), dishesController.delete)//admin
dishesRoutes.put("/:id", ensureAuthenticated, verifyUserAuthorization("admin"), dishesController.update)//admin
dishesRoutes.get("/:id", dishesController.show)//all

module.exports = dishesRoutes
