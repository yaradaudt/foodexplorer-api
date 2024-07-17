const { Router } = require("express")

const usersRouter = require("./users.routes")
const sessionsRouter = require("./sessions.routes")
const dishesRouter = require("./dishes.routes")
const ordersRouter = require("./orders.routes")
const cartsRouter = require("./carts.routes")
const favoritesRouter = require("./favorites.routes")


const routes = Router()

routes.use("/users", usersRouter)
routes.use("/sessions", sessionsRouter)
routes.use("/dishes", dishesRouter)
routes.use("/orders", ordersRouter)
routes.use("/carts", cartsRouter)
routes.use("/favorites", favoritesRouter)

module.exports = routes