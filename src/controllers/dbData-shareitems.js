// --------  SELECT A DATABASE FROM HERE ----
// ELEPHANTSQL                                                - working!
import { queryDB, changeDB, deleteDB } from "../db/pg.js";
// HEROKU                                                  - to be developed!!
// import conn from "../db/heroku.js";

// ------ fields list  ---------
// ["id", false, false], //int(auto)
// ["username", true, false], //char(16)
// ["sharestatus", true, true], //char(1)
// ["arrayofitems", false, true], //text[]
// ["location", false, true], //point(x,y)
// ["message", false, true], //text
// ["plz", true, true], //text(20)

export const getAllEL = (table) => {
  const fields = "*";
  return queryDB(`SELECT ${fields} FROM ${table};`);
};

export const createEL = (table, element) => {
  // console.log(element);
  const fields =
    "(username,sharestatus,arrayofitems,location,message,plz)  VALUES($1, $2, $3, $4, $5, $6)";
  return changeDB(`INSERT INTO ${table} ${fields} ;`, [
    element.username,
    element.sharestatus,
    element.arrayofitems,
    element.location,
    element.message,
    element.plz,
  ]);
};

export const getManyEL = (table, key, keyField) => {
  const fields = "*";
  return queryDB(
    `SELECT ${fields} FROM ${table} 
    WHERE LOWER(${keyField}) = LOWER($1);`,
    [key]
  );
};

export const getOneEL = (table, id, idField) => {
  const fields = "*";
  return queryDB(
    `SELECT ${fields} FROM ${table} 
    WHERE ${idField} = $1;`,
    [id]
  );
};

export const updateEL = (table, element, id, idField) => {
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
     WHERE ${idField} = $1;`,
    dataArray
  );
};

export const deleteEL = (table, id, idField) => {
  return deleteDB(
    `DELETE FROM ${table} 
    WHERE ${idField} = $1;`,
    [id]
  );
};
