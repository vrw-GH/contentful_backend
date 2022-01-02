// --------  SELECT A DATABASE FROM HERE ----
// ELEPHANTSQL                                                - working!
import { queryDB, changeDB, deleteDB } from "../db/pg.js";
// HEROKU                                                  - to be developed!!
// import conn from "../db/heroku.js";

export const getAllEL = (table) =>
  queryDB(
    `SELECT ingredient_id, ingredient_name, ingredient_unit FROM ${table};`
  );

export const getOneEL = (table, id) =>
  queryDB(
    `SELECT *  FROM ${table} 
    WHERE ingredient_id = $1;`,
    [id]
  );

export const createEL = (table, element) => {
  const fields = "(ingredient_name, ingredient_unit) VALUES($1, $2)";
  return changeDB(`INSERT INTO ${table} ${fields} ;`, [
    element.name.trim(),
    element.unit.trim(),
  ]);
};

export const updateEL = (table, element, id) => {
  const fields = "(ingredient_name, ingredient_unit) = ($2, $3)";
  return changeDB(
    `UPDATE ${table} SET ${fields}
     WHERE ingredient_id = $1;`,
    [id, element.name.trim(), element.unit.trim()]
  );
};

export const deleteEL = (table, id) => {
  deleteDB(
    `DELETE FROM ${table} 
    WHERE ingredient_id = $1;`,
    [id]
  );
};
