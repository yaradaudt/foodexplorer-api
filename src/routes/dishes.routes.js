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

dishesRoutes.use(ensureAuthenticated)

dishesRoutes.get("/", dishesController.index)
dishesRoutes.post("/", verifyUserAuthorization("admin"), dishesController.create)//admin
dishesRoutes.delete("/:id", verifyUserAuthorization("admin"), dishesController.delete)//admin
dishesRoutes.put("/:id", verifyUserAuthorization("admin"), dishesController.update)//admin
dishesRoutes.get("/:id", dishesController.show)
dishesRoutes.patch("/image/:id", verifyUserAuthorization("admin"), upload.single("image"), imagesController.update)

module.exports = dishesRoutes
