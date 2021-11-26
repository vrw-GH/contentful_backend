import db1 from "../db/pg.js";
// import db1 from "../db/mysql.js";
import ErrorResponse from "../utils/ErrorResponse.js";

export const getAllElements = async (table) => {
  try {
    const dbElements = await db1.query(`SELECT * FROM ${table};`);
    console.log("###dbElements:", dbElements);
    let arr = dbElements.rows.filter(() => true);
    return arr;
  } catch (error) {
    console.log("################# DB LOAD ERROR - ", error);
    new ErrorResponse(error, 401);
    return ` DB LOAD ERROR - ${error}`;
  }
};

export const createElement = async (table, body) => {
  console.log("################1", body);
  try {
    const dbElements = await db1.query(
      `INSERT INTO ${table}(first_name, last_name, age) VALUES($1, $2, $3) RETURNING *;`,
      [body.first_name, body.last_name, body.age]
    );
    console.log("################2", dbElements);
    arr = dbElements.filter(() => true);
    console.log("################3", arr);
  } catch (error) {
    new ErrorResponse(error, 401);
    console.log(error, "################4 dbClient error");
  }
};
