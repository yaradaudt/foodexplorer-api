const knex = require("../database/knex")
const AppError = require("../utils/AppError")

class CartsController { // regular user only
    async create(request, response) {
        const { dish_id, quantity } = request.body
        const user_id = request.user.id

            let cart = await knex("cart").where({ user_id }).first()
            
            if (!cart) {
                const [cart_id] = await knex("cart").insert({ user_id })
                cart = { id: cart_id }
            }

            const dish = await knex("dishes").where({ id: dish_id }).first()
            if (!dish) {
                throw new AppError("Carrinho não encontrado.")
            }

            await knex("cart_items").insert({
                cart_id: cart.id,
                dish_id,
                quantity,
                price: dish.price * quantity
            });

            response.status(201).json({ message: "Item adicionado ao carrinho" })
    }

    async update(request, response) {
        const user_id = request.user.id
        const { dish_id } = request.params
        const { quantity } = request.body

        const cart = await knex("cart").where({ user_id }).first()

        if (!cart) {
            throw new AppError("Carrinho não encontrado.")
        }

        const dish = await knex("dishes").where({ id: dish_id }).first();
            
        if (!dish) {
            throw new AppError("Prato não encontrado.")
        }

        await knex("cart_items")
            .where({ cart_id: cart.id, dish_id })
            .update({
                quantity,
                price: dish.price * quantity
            });

        response.status(200).json()
    }

    async delete(request, response) {
        const user_id  = request.user.id
    
        await knex("cart").where({ user_id }).delete()
    
        return response.json()
    }

    async show(request, response) {
        const { dish_id } = request.params
        const user_id = request.user.id

        const cart = await knex("cart").where({ user_id }).first()
            if (!cart) {
                throw new AppError("Carrinho não encontrado.")
            }

            const cartItem = await knex("cart_items")
                .where({ cart_id: cart.id, dish_id })
                .join("dishes", "cart_items.dish_id", "dishes.id")
                .select([
                    "cart_items.dish_id",
                    "dishes.title as dish_title",
                    "cart_items.quantity",
                    "cart_items.price"
                ])
                .first()

            response.status(200).json(cartItem)
    }

    async index(request, response) {
        const user_id = request.user.id
        const cart = await knex("cart").where({ user_id }).first()
            if (!cart) {
                throw new AppError("Carrinho não encontrado.")
            }

            const cartItems = await knex("cart_items")
                .where({ cart_id: cart.id })
                .join("dishes", "cart_items.dish_id", "dishes.id")
                .select([
                    "cart_items.dish_id",
                    "dishes.title as dish_title",
                    "cart_items.quantity",
                    "cart_items.price"
                ])

            response.status(200).json({ cart, items: cartItems })
    }
}

module.exports = CartsController