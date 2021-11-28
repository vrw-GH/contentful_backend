import "../../config.cjs";
import mysql from "mysql";
import ErrorResponse from "../utils/ErrorResponse.js";

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Sk7175",
  database: "mydb",
});

conn.connect((err) => {
  if (err) {
    new ErrorResponse(err, 401);
  } else {
    console.log("### Connected to the MySQL server.");
  }
});

// mysql package doesnt work with async, so we have to leverage nodepromises
export const queryDB = (sqlString, values) => {
  // check mysql for correct method...
  return new Promise((resolve, reject) => {
    if (values) {
      conn.query(sqlString, values, (error, results) => {
        // values for search-criteria
        if (error) reject(error);
        resolve(results);
      });
    } else {
      conn.query(sqlString, (error, results) => {
        if (error) reject(error);
        resolve(results);
      });
    }
  });
};

export const changeDB = (sqlString, values) => {
  throw new ErrorResponse(Error("Feature development."), 903);
  // **changeDB  here still gives mySQL Errors!!!!                    - to do

  return new Promise((resolve, reject) => {
    if (values) {
      // sqlString = sqlString.replace(";", "RETURNING *;");
      conn.query(sqlString, values, (error, results) => {
        if (error) reject(error);
        resolve(results.rows); //                   returns a tuple
      });
    } else {
      // not needed! these functions only with values?!
      reject(error);
    }
  });
};

export const deleteDB = (sqlString, values) => {
  //  solve FK problem
  return new Promise((resolve, reject) => {
    if (findDB(values)) {
      sqlString = sqlString.replace("$1", "?");
      conn.query(sqlString, values, (error, results) => {
        if (error) reject(error);
        resolve(results); //
      });
    }
  });
};

const findDB = (values) => true; // check for existing
