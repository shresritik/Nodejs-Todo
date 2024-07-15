import { Knex } from "knex";

const TABLE_NAME = "Users_Roles";

/**
 * Create table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.bigIncrements();

    table
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("Users");
    table
      .integer("roles_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("Roles");
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
