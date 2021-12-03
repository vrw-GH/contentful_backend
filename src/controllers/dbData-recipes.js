import slug from "slug";
// --------  SELECT A DATABASE FROM HERE ----
// ELEPHANTSQL                                                - working!
import { queryDB, changeDB, deleteDB } from "../db/pg.js";
// HEROKU                                                  - to be developed!!
// import conn from "../db/heroku.js";

export const getAllEL = (table) =>
  queryDB(`SELECT title, category, image, username, slug FROM ${table};`);

export const getOneEL = (table, id) =>
  queryDB(`SELECT * FROM ${table} WHERE (LOWER(slug) = LOWER(?))`, [
    slug(id.trim()).slice(0, 40),
  ]);

export const createEL = (table, body) => {
  const fields =
    "(title, category, ingredients, recipe, image, username, slug)";
  const values = "($1, $2, $3, $4, $5, $6, $7)";
  return changeDB(`INSERT INTO ${table}${fields} VALUES${values};`, [
    body.title,
    body.category,
    body.ingredients,
    body.recipe,
    body.image,
    body.username,
    slug(body.title.trim().slice(0, 40)),
  ]);
};

export const updateEL = (table, element, id) => {
  const fields =
    "(title, category, ingredients, recipe, image, username, slug)";
  const values = "($2, $3, $4, $5, $6, $7, $8)";
  return changeDB(
    `UPDATE ${table} SET ${fields} = ${values} 
    WHERE (slug = ($1));`,
    [
      id,
      element.title,
      element.category,
      element.ingredients,
      element.recipe,
      element.image,
      element.username,
      slug(element.title.trim().slice(0, 40)),
    ]
  );
};

export const deleteEL = (table, id) => {
  deleteDB(`DELETE FROM ${table} WHERE (slug = ($1));`, [id]);
};
