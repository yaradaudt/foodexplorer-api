const { Router } = require("express")

const IngredientsController = require("../controllers/IngredientsController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const ingredientsRoutes = Router()
const ingredientsController = new IngredientsController()

ingredientsRoutes.get("/", ensureAuthenticated, ingredientsController.index)

//maybe this will change since it just needs to list the ingredients

module.exports = ingredientsRoutes
