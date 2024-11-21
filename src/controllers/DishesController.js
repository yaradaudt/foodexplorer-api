const knex = require("../database/knex")

class DishesController {
  async create(request, response) {
    const { title, description, category, price, image, ingredients } = request.body
    const user_id = request.user.id

    const formattedPrice = parseFloat(price).toFixed(2);

    const [dish_id] = await knex("dishes").insert({
      title,
      description,
      category,
      price: formattedPrice,
      image,
      user_id
    })

    const ingredientsInsert = ingredients.map(name => {
      return {
        dish_id,
        name,
        user_id
      }
    })

    await knex("ingredients").insert(ingredientsInsert)

    response.json({ id: dish_id })
  }

  async show(request, response) {
    const { id } = request.params

    const dish = await knex("dishes").where({ id }).first()

    if(dish) {
      dish.price = parseFloat(dish.price).toFixed(2);
    }

    const ingredients = await knex("ingredients").where({ dish_id: id }).orderBy("name")

    return response.json({
      ...dish,
      ingredients
    })
  }

  async update(request, response) {
    try {
      const { id } = request.params
      const { title, description, category, price, image, ingredients } = request.body
      const user_id = request.user.id

      const formattedPrice = parseFloat(price).toFixed(2);
  
      await knex("dishes").where({ id }).update({
        title,
        description,
        category,
        price: formattedPrice,
        image,
        user_id,
        updated_at: knex.fn.now()
      })
  
      await knex("ingredients").where({ dish_id: id }).delete()
  
      const ingredientsInsert = ingredients.map(name => {
        return {
          dish_id: id,
          name,
          user_id
        }
      })
  
      await knex("ingredients").insert(ingredientsInsert)
  
      response.json({ message: "Prato atualizado com sucesso" })
    } catch (error) {
      console.error("Erro ao atualizar prato", error)
      response.status(500).json({ error: "Erro ao atualizar o prato" })
    }
  }

  async delete(request,response) {
    const { id } = request.params

    await knex("dishes").where({ id }).delete()

    return response.json()
  }
  
  async index(request, response) {
    try {
    const { title, ingredients, category } = request.query

    let dishesQuery = knex("dishes")
      .select([
        "dishes.id",
        "dishes.title",
        "dishes.description",
        "dishes.category",
        "dishes.price",
        "dishes.image"
      ])
        .orderBy("dishes.title")

        if(category) {
          dishesQuery = dishesQuery.where("category", category)
        }

        if(title) {
          dishesQuery = dishesQuery.whereLike("dishes.title", `%${title}%`)
        }

        if(ingredients) {
          const filterIngredients = ingredients.split(',').map((ingredient) => ingredient.trim().toLowerCase())

          const dishIdsWithIngredients = await knex("ingredients")
            .distinct("dish_id")
            .whereIn("name", filterIngredients)
          
          const dishIds = dishIdsWithIngredients.map((dish) => dish.dish_id)

          if(dishIds.length > 0) {
            dishesQuery = dishesQuery.whereIn("dishes.id", dishIds)
          } else {
            return response.json([])
          }

          dishesQuery = dishesQuery.whereIn("dishes.id", dishIds)
          console.log("Query ingredientes:", filterIngredients);

        }

        const dishes = await dishesQuery

        const restaurantIngredients = await knex("ingredients")
        
        const dishesWithIngredients = dishes.map((dish) => {
          const dishIngredients = restaurantIngredients.filter((ingredient) => ingredient.dish_id === dish.id)
    
          return {
            ...dish,
            ingredients: dishIngredients
          }
        })
    
        return response.json(dishesWithIngredients)
      } catch (error) {
        console.error("Erro ao listar pratos", error)
        response.status(500).json({ error: "Erro ao listar os pratos" })
      }
    }
    }
    
    module.exports = DishesController