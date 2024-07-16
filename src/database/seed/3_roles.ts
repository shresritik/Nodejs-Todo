import { Knex } from "knex";
import { ROLE } from "../../enum";

const TABLE_NAME = "roles";

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
          roles: ROLE.ADMIN,
        },
        {
          roles: ROLE.USER,
        },
      ]);
    });
}
