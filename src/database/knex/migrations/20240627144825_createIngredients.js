exports.up = knex => knex.schema.createTable("ingredients", table => {
    table.increments("id");
    table.text("name").notNullable();
  
    table.integer("dish_id").references("id").inTable("dishes").onDelete("CASCADE");
    table.integer("user_id").references("id").inTable("users");
  
    table.integer("created_by").references("id").inTable("users");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
  
  exports.down = knex => knex.schema.dropTable("ingredients");