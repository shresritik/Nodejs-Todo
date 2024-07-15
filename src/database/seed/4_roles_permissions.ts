import { Knex } from "knex";

const TABLE_NAME = "Roles_Permissions";

/**
 * Delete existing entries and seed values for table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export function seed(knex: Knex): Promise<void> {
  return knex(TABLE_NAME)
    .del()
    .then(() => {
      return knex(TABLE_NAME).insert([
        {
          permission_id: 1,
          role_id: 1,
        },
      ]);
    });
}
