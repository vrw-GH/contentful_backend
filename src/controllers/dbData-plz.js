// --------  SELECT A DATABASE FROM HERE ----
// ELEPHANTSQL                                                - working!
import { queryDB, changeDB, deleteDB } from "../db/pg.js";
// HEROKU                                                  - to be developed!!
// import conn from "../db/heroku.js";

// ------ fields list  ---------
// ["postal-code", true, false], //char(20)
//   ["place-name", true, true], //char(180)
//   ["longitude", false, true], //numeric
//   ["latitude", false, true], //numeric

export const getAllEL = (table) => {
  const fields = "postal_code, place_name, longitude, latitude";
  return queryDB(`SELECT ${fields} FROM ${table};`);
};

export const getOneEL = (table, id, keyField) => {
  const fields = "*";
  return queryDB(
    `SELECT ${fields} FROM ${table} 
    WHERE LOWER(${keyField}) = LOWER($1);`,
    [id]
  );
};
