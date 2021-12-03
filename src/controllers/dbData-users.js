// --------  SELECT A DATABASE FROM HERE ----
// ELEPHANTSQL                                                - working!
import { queryDB, changeDB, deleteDB } from "../db/pg.js";
// HEROKU                                                  - to be developed!!
// import conn from "../db/heroku.js";

export const getAllEL = (table) =>
  queryDB(`SELECT username, email FROM ${table};`);

export const getOneEL = (table, id) =>
  queryDB(
    `SELECT * FROM ${table} 
    WHERE LOWER(username) = LOWER($1);`,
    [id]
  );

export const createEL = (table, element) => {
  const fields = "(username, email, password) VALUES($1, $2, $3)";
  return changeDB(`INSERT INTO ${table} ${fields} ;`, [
    element.username,
    element.email,
    element.password,
  ]);
};

export const updateEL = (table, element, id) => {
  const fields = "(username, email, password) = ($2, $3, $4)";
  return changeDB(
    `UPDATE ${table} SET ${fields}
     WHERE LOWER(username) = LOWER($1);`,
    [id, element.username.trim(), element.email, element.password]
  );
};

export const deleteEL = (table, id) => {
  deleteDB(
    `DELETE FROM ${table} 
    WHERE LOWER(username) = LOWER($1);`,
    [id]
  );
};
