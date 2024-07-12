const knex = require("../database/knex")

class CartsController { // regular user only
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

    async update(request, response) {
        const { user_id, dish_id } = request.params
        const { quantity } = request.body

        const cart = await knex("cart").where({ user_id }).first()

        if (!cart) {
            return response.status(404).json({ message: "Carrinho não encontrado" })
        }

        const dish = await knex("dishes").where({ id: dish_id }).first();
            
        if (!dish) {
            return response.status(404).json({ message: "Prato não encontrado" })
        }

        await knex("cart_items")
            .where({ cart_id: cart.id, dish_id })
            .update({
                quantity,
                price: dish.price * quantity
            });

        response.status(200).json()
    }
}

module.exports = CartsController