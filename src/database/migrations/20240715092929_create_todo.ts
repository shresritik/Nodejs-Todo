import { Knex } from "knex";

const TABLE_NAME = "todos";

/**
 * Create table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.bigIncrements();
    table.string("name").notNullable();

    table
      .integer("user_id")
      .unsigned()
      .nullable()
      .references("id")

      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table
      .integer("status_id")
      .unsigned()
      .nullable()
      .references("id")

      .inTable("status")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    table
      .bigInteger("created_by")
      .unsigned()
      .nullable()
      .references("id")

      .inTable(TABLE_NAME)
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    table.timestamp("updated_at").nullable();

    table
      .bigInteger("updated_by")
      .unsigned()
      .references("id")

      .inTable("users")
      .nullable()
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
}

/**
 * Drop table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}
