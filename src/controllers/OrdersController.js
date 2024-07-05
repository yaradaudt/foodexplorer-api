const knex = require("../database/knex")

class OrdersController {
    async create(request, response) {
        const { status, price, payment_method, order_items } = request.body
        const { user_id } = request.params

        const [order_id] = await knex("orders").insert({
            status,
            price,
            payment_method,
            user_id
        })
        
        const orderItemsInsert = order_items.map(async({ dish_id, quantity }) => {
            return {
                order_id,
                dish_id,
                quantity,
                price: await knex("dishes").select("price").where({ id: dish_id }).first().then(dish => dish.price * quantity),
            }
        })
        
        const resolvedOrderItems = await Promise.all(orderItemsInsert);

        await knex("order_items").insert(resolvedOrderItems)
    
        response.status(201).json()
    }

    async show(request, response) {
            const { id } = request.params;

            const order = await knex("orders")
                .select("id", "status", "price", "payment_method")
                .where({ id })
                .first();

            if (!order) {
                return response.status(404).json({ message: "Order not found" });
            }

            const orderItems = await knex("order_items")
                .select("id", "dish_id", "quantity", "price")
                .where({ order_id: id });

            return response.json({
                ...order,
                orderItems
            });
    }
    
}

module.exports = OrdersController