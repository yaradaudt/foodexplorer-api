const knex = require("../database/knex")
const AppError = require("../utils/AppError")
const DiskStorage = require("../providers/DiskStorage")

class ImagesController {
    async update(request, response) {
        try {
        const user_role = request.user.role
        const { id } = request.params
        const imageFileName = request.file.filename

        const diskStorage = new DiskStorage()

        let dish

        if(user_role === "admin"){
            dish = await knex("dishes")
            .where({ id }).first()
        } else {
            throw new AppError("Apenas usuários autorizados podem adicionar imagens.")
        }

        if(!dish) {
            throw new AppError("Prato inexistente.")
        }

        if(dish.image) {
            await diskStorage.deleteFile(dish.image)
        }

        const filename = await diskStorage.saveFile(imageFileName)
        dish.image = filename

        await knex("dishes").update(dish).where({ id })

        return response.json({ message: "Imagem adicionada com sucesso!" })

        } catch (error) {
            console.error("Erro fazendo upload de imagem.", error)
            return response.status(500).json({ message: "Erro fazendo upload de imagem."})
        }

    }
}

module.exports = ImagesController