exports.up = knex => knex.schema.createTable("cart_items", table => {
    table.increments("id");
    table.integer("cart_id").references("id").inTable("cart").onDelete("CASCADE");
    table.integer("dish_id").references("id").inTable("dishes").onDelete("CASCADE");
    table.integer("quantity").notNullable();
    table.decimal("price", 10, 2).notNullable();
});

exports.down = knex => knex.schema.dropTable("cart_items");
