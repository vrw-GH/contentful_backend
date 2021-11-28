import "../../config.cjs";
import pg from "pg";
const { Pool } = pg;
// const connectionString = process.env.ELEPHSQL_DB_CNX2;
const connectionString = process.env.HEROKU_DB_CNX2; //   howto pre-create table ?
const conn = new Pool({ connectionString }); // MUST be === "connectionString" !!!!!!

conn.connect(function (err) {
  err
    ? console.error("### error: " + err.message)
    : console.log("### Connected to the PG server.");
});

export default conn;
