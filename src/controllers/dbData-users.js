// --------  SELECT A DATABASE FROM HERE ----
// ELEPHANTSQL                                                - working!
import { queryDB, changeDB, deleteDB } from "../db/pg.js";
// HEROKU                                                  - to be developed!!
// import conn from "../db/heroku.js";

export const getAllEL = (table) => {
  const fields = "username, email, profilepic";
  return queryDB(`SELECT ${fields} FROM ${table};`);
};

export const getOneEL = (table, id) => {
  const fields = "*";
  return queryDB(
    `SELECT ${fields} FROM ${table} 
    WHERE LOWER(username) = LOWER($1);`,
    [id]
  );
};

export const createEL = (table, element) => {
  const fields = "(username, email, password) VALUES($1, $2, $3)";
  return changeDB(`INSERT INTO ${table} ${fields} ;`, [
    element.username,
    element.email,
    element.password,
  ]);
};

export const updateEL = (table, element, id) => {
  // likes as {}, profilepic as text, plz as char(10), location as point(x,y:long/lat)
  const fields =
    "(username, email, password, profilepic, plz, location) = ($2, $3, $4, $5, $6, $7)";
  return changeDB(
    `UPDATE ${table} SET ${fields}
     WHERE LOWER(username) = LOWER($1);`,
    [
      id,
      element.username.trim(),
      element.email,
      element.password,
      element.profilepic,
      element.plz,
      element.location,
    ]
  );
};

export const deleteEL = (table, id) => {
  deleteDB(
    `DELETE FROM ${table} 
    WHERE LOWER(username) = LOWER($1);`,
    [id]
  );
};
