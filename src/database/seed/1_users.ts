import { Knex } from "knex";
import config from "../../config";

const TABLE_NAME = "users";

/**
 * Delete existing entries and seed values for table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export function seed(knex: Knex): Promise<void> {
  return knex(TABLE_NAME).then(() => {
    return knex(TABLE_NAME).insert([
      {
        name: "shyam",
        email: "shyam@dsa.com",
        password: config.password,
      },
    ]);
  });
}
