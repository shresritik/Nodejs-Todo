import toSnakeCase from "to-snake-case";
import { baseKnexFile } from "../knexfile";
import knex, { Knex } from "knex";
import camelize from "camelize";
const knexConfig: Knex.Config = {
  ...baseKnexFile,
  wrapIdentifier: (value, originalIml) => {
    if (value === "*") {
      return originalIml(value);
    }
    if (!/^[A-Z]/.test(value)) {
      return originalIml(toSnakeCase(value));
    }
  },
  postProcessResponse: (result) => {
    return camelize(result);
  },
};
export default knex(knexConfig);
