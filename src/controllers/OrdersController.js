const knex = require("../database/knex")

class OrdersController {
    async create(request, response) {
        const { status, price, payment_method, order_items } = request.body
        const user_id = request.user.id

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
        
        const resolvedOrderItems = await Promise.all(orderItemsInsert)

        await knex("order_items").insert(resolvedOrderItems)
    
        response.status(201).json()
    }

    async show(request, response) {
            const { id } = request.params

            const order = await knex("orders")
                .select("id", "status", "price", "payment_method")
                .where({ id })
                .first()

            if (!order) {
                return response.status(404).json({ message: "Order not found" })
            }

            const orderItems = await knex("order_items")
                .select("id", "dish_id", "quantity", "price")
                .where({ order_id: id })

            return response.json({
                ...order,
                orderItems
            })
    }

    async update(request, response) {
        try {
            const { id } = request.params
            const { status } = request.body

            const order = await knex("orders").where({ id }).first()

            if(!order){
                return response.status(404).json({ message: "Pedido não encontrado." })

            }

            await knex("orders").where({ id }).update({
                status,
            })

            return response.json({ message: "Pedido atualizado com sucesso." })
        } catch (error) {
            console.error("Error updating order", error)
            return response.status(500).json({ message: "Erro atualizando pedido." })
        }
    }

    async delete(request,response) {
        const { id } = request.params
    
        await knex("orders").where({ id }).delete()
    
        return response.json()
    }
    
    
    async index(request, response) {
        try {
            const user_id = request.user.id

            const orders = await knex("orders")
                .select([
                    "orders.id", 
                    "orders.status", 
                    "orders.price", 
                    "orders.payment_method", 
                    "orders.created_at"
                ])
                .where({ user_id })
                .orderBy("orders.created_at", "desc")

            
            const ordersWithItems = orders.map(async (order) => {
                const orderItems = await knex("order_items")
                    .select([
                    "order_items.id", 
                    "order_items.dish_id", 
                    "order_items.quantity", 
                    "order_items.price", 
                    "dishes.title as dish_title"])
                    .innerJoin("dishes", "dishes.id", "order_items.dish_id")
                    .where({ order_id: order.id })

                    return {
                        ...order,
                        orderItems
                    }
                })

            return response.status(200).json(ordersWithItems)

        } catch (error) {
            console.error(error);
            return response.status(500).json({ message: "Erro ao listar pedidos." })
        }
    }

    // index close to functional but not finished. i'll come back when admin's permission is created.
    
}

module.exports = OrdersController
