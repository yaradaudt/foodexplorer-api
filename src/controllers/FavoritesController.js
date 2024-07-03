const knex = require("../database/knex")

class FavoritesController {
    async create (request, response) {
        const { dish_id } = request.body
        const { user_id } = request.params

        const favorite = await knex("favorites").insert({
        dish_id,
        user_id
        })

        return response.status(201).json(favorite)
    }

    async index(request, response) {
        try {
            const { user_id } = request.query

            const favorites = await knex("favorites")
                .select([
                    "dishes.id as dish_id",
                    "dishes.title",
                    "dishes.description",
                    "dishes.category",
                    "dishes.price"
                ])
                .where("favorites.user_id", user_id)
                .innerJoin("dishes", "dishes.id", "favorites.dish_id")
            
                return response.status(200).json(favorites);
            } catch (error) {
              console.error(error);
              return response.status(500).json({ message: "Erro ao listar os favoritos." });
            }
    }

    async delete(request,response) {
        const { id } = request.params
    
        await knex("favorites").where({ id }).delete()
    
        return response.json()
      }
}
        
module.exports = FavoritesController