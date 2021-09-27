import path from "path";
import knex from "knex";

const isBuild = process.env.NODE_ENV === "production";

const pathToDbFile = path.join(
  /* global __static */
  __static,
  isBuild ? "../../" : "../",
  "database.sqlite"
);

const config = {
  client: "sqlite3",
  useNullAsDefault: true,
  connection: {
    filename: pathToDbFile,
  },
};

const db = knex(config);

export default db;
