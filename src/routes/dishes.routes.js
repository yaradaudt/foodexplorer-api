const { Router } = require("express")
const multer = require("multer")
const uploadConfig = require("../configs/upload")

const DishesController = require("../controllers/DishesController")
const ImagesController = require("../controllers/ImagesController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization")

const dishesRoutes = Router()
const upload = multer(uploadConfig.MULTER)

const dishesController = new DishesController()
const imagesController = new ImagesController()

dishesRoutes.get("/", dishesController.index)//all including non authenticated since dishes routes are like a menu
dishesRoutes.post("/", ensureAuthenticated, verifyUserAuthorization("admin"), dishesController.create)//admin
dishesRoutes.delete("/:id", ensureAuthenticated, verifyUserAuthorization("admin"), dishesController.delete)//admin
dishesRoutes.put("/:id", ensureAuthenticated, verifyUserAuthorization("admin"), dishesController.update)//admin
dishesRoutes.get("/:id", dishesController.show)//all
dishesRoutes.patch("/image/:id", ensureAuthenticated, verifyUserAuthorization("admin"), upload.single("image"), imagesController.update)

module.exports = dishesRoutes
