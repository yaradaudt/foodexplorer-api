exports.up = knex => knex.schema.createTable("dish_ingredients", table => {
    table.increments("id");
    table.integer("dish_id").references("id").inTable("dishes").onDelete("CASCADE");
    table.text("ingredient_name").notNullable();
    table.text("ingredient_unit").notNullable();
    table.float("quantity").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("dish_ingredients");
