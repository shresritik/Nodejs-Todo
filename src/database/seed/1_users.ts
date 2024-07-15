import { Knex } from "knex";

const TABLE_NAME = "Users";

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
        password:
          "$2b$10$jHHqrh4QLprCkIe8lwVwEuovsZL9gk6NOME04g.SEMHvyd1G7obI6",
      },
    ]);
  });
}
