import "../../config.cjs";
import pg from "pg";
const { Pool } = pg;
const connectionString = process.env.ELEPHSQL_DB_CNX2;
const conn = new Pool({ connectionString }); // MUST be  === "connectionString" !!!!!!
import ErrorResponse from "../utils/ErrorResponse.js";

conn.connect(function (err) {
  if (err) {
    new ErrorResponse(err, 401);
  } else {
    console.log("### Connected to the PG server.");
  }
});

export const queryDB = (sqlString, values) => {
  // console.log("sqlString:", sqlString);
  // console.log("values:", values);
  return new Promise((resolve, reject) => {
    if (values) {
      // for individual inquiries
      sqlString = sqlString.replace("?", "$1");
      conn.query(sqlString, values, (error, results) => {
        if (error) reject(error);
        if (results === undefined || results.rows.length < 1) {
          reject(Error("No Data retrieved")); //            why doesnt catch error?
        } else {
          resolve(results.rows); //                       returns one tuple
        }
      });
    } else {
      conn.query(sqlString, (error, results) => {
        if (error) reject(error);
        resolve(results.rows); //                       returns tuples (all)
      });
    }
  });
};

export const changeDB = (sqlString, values) => {
  return new Promise((resolve, reject) => {
    conn.query(
      sqlString.replace(";", " RETURNING *;"),
      values,
      (error, results) => {
        if (error) {
          reject(error);
        } else if (results === undefined) {
          reject("DB Update failed!");
        } else if (results.rows === undefined) {
          reject("DB Update failed!");
        } else {
          resolve(results.rows); //             returns  changed tuple
        }
      }
    );
  });
};

export const deleteDB = (sqlString, values) => {
  return new Promise((resolve, reject) => {
    conn.query(sqlString, values, (error, results) => {
      if (error) reject(error);
      resolve();
    });
  });
};
