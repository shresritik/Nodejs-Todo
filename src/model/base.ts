import { Knex } from "knex";
import db from "../utils/db";

class BaseModel {
  static connection: Knex = db;
  static queryBuilder() {
    return this.connection;
  }
}
export default BaseModel;
