const knex = require("../database/knex")

class FavoritesController {
    async create (request, response) {
        const { dish_id } = request.body
        const { user_id } = request.params

        const favorites = await knex("favorites").insert({
        dish_id,
        user_id
        })

        return response.status(201).json(favorites)
    }
}

module.exports = FavoritesController