const { Router } = require("express")

const UsersController = require("../controllers/UsersController") // it's a class, so it needs to be instanced.

const usersRoutes = Router()

const usersController = new UsersController()

usersRoutes.post("/", usersController.create)
usersRoutes.put("/:id", usersController.update)

module.exports = usersRoutes