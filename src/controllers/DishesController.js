const knex = require("../database/knex");

class DishesController {
  async create(request, response) {
    const { name, description, category, price, image, ingredients } = request.body
    const { user_id } = request.params

    const [dish_id] = await knex("dishes").insert({
      name,
      description,
      category,
      price,
      image,
      user_id
    })

    const ingredientsInsert = ingredients.map(ingredientName => {
      return {
        dish_id,
        name: ingredientName,
        user_id
      }
    })

    await knex("ingredients").insert(ingredientsInsert)

    response.json()
  }

  async show(request, response) {
    const { id } = request.params

    const dish = await knex("dishes").where({ id }).first()
    const ingredients = await knex("ingredients").where({ dish_id: id }).orderBy("name")

    return response.json({
      ...dish,
      ingredients
    })
  }

  async delete(request,response) {
    const { id } = request.params

    await knex("dishes").where({ id }).delete()

    return response.json()
  }

  async index(request, response) {
    const { name, user_id } = request.query
    const dishes = await knex("dishes")
    .where({ user_id })
    .whereLike("name", `%${name}%`)
    .orderBy("name")

    return response.json({
      ...dishes})
  }
}

module.exports = DishesController