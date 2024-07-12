const knex = require("../database/knex")

class CartsController {
    async create(request, response) {
        const { dish_id, quantity } = request.body;
        const { user_id } = request.params;

            let cart = await knex("cart").where({ user_id }).first()
            
            if (!cart) {
                const [cart_id] = await knex("cart").insert({ user_id })
                cart = { id: cart_id }
            }

            const dish = await knex("dishes").where({ id: dish_id }).first()
            if (!dish) {
                return response.status(404).json({ message: "Prato não encontrado" })
            }

            await knex("cart_items").insert({
                cart_id: cart.id,
                dish_id,
                quantity,
                price: dish.price * quantity
            });

            response.status(201).json({ message: "Item adicionado ao carrinho" });
    }
}

module.exports = CartsController