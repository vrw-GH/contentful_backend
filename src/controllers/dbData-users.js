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
  console.log(element);
  const fields = "(username, email, password) VALUES($1, $2, $3)";
  return changeDB(`INSERT INTO ${table} ${fields} ;`, [
    element.username,
    element.email,
    element.password,
  ]);
};

export const updateEL = (table, element, id) => {
  // likes as {json}
  // profilepic as jpg/base64,
  // plz as char(10)
  // location as point(x,y:long/lat) "x,y" or n,n
  const f1 = Object.keys(element);
  let fields = f1.toString();
  if (f1.length > 1) fields = "(" + fields + ")";
  let dataArray = [];
  dataArray.push(id);
  let v1 = "";
  for (let i = 0; i < f1.length; i++) {
    v1 = `${v1},$${i + 2}`;
    dataArray.push(element[f1[i]]);
  }
  let values = v1.replace(/^,/g, "");
  if (f1.length > 1) values = "(" + values + ")";
  return changeDB(
    `UPDATE ${table} SET ${fields} = ${values}
     WHERE LOWER(username) = LOWER($1);`,
    dataArray
  );
};

export const deleteEL = (table, id) => {
  deleteDB(
    `DELETE FROM ${table} 
    WHERE LOWER(username) = LOWER($1);`,
    [id]
  );
};
