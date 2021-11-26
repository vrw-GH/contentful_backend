// --------  SELECT A DATABASE FROM HERE ----
// MYSQL                                         - get methods working.. post not yet
// import { queryDB, changeDB, deleteDB } from "../db/mysql.js";

// ELEPHANTSQL                                                - working!
import { queryDB, changeDB, deleteDB } from "../db/pg.js";

// HEROKU                                                  - to be developed!!
// import conn from "../db/heroku.js";

export const getAllEL = (table) =>
  queryDB(`SELECT username, email FROM ${table};`);

export const getOneEL = (table, id) =>
  queryDB(
    `SELECT username, email FROM ${table} WHERE (LOWER(username) = LOWER(?))`,
    [id]
  );

export const createEL = (table, body) =>
  changeDB(
    `INSERT INTO ${table}(username, email, password) VALUES($1, $2, $3);`,
    [body.username, body.email, body.password]
  );

export const updateEL = (table, id) => {
  changeDB(`UPDATE ${table}(username, email, password) VALUES($1, $2, $3);`, [
    body.username,
    body.email,
    body.password,
  ]);
};

export const deleteEL = (table, id) => {
  deleteDB(`DELETE FROM ${table} WHERE LOWER(username) = LOWER($1);`, [id]);
};
