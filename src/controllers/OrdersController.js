const knex = require("../database/knex")

class OrdersController {
    async create(request, response) {
        try{
        const { status, price, payment_method, dish_id, quantity, order_items } = request.body
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
    
        response.status(201).json({ message: "Order created successfully" });
        } catch (error) {
            console.error(error);
            response.status(500).json({ message: "Error creating order" });
        }
    }

    async show(request, response) {
        const { id } = request.params

        const order = await knex("orders").where({ id }).first()
        const orderItems = await knex("order_items").where({ order_id: id }).orderBy("title")
    
        return response.json({
          ...order,
          orderItems
        })
    }
    
}

module.exports = OrdersController