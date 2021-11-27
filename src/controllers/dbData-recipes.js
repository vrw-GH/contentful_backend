import slug from "slug";
// --------  SELECT A DATABASE FROM HERE ----
// ELEPHANTSQL                                                - working!
import { queryDB, changeDB, deleteDB } from "../db/pg.js";
// HEROKU                                                  - to be developed!!
// import conn from "../db/heroku.js";

export const getAllEL = (table) =>
  queryDB(`SELECT title, category, image, username, slug FROM ${table};`);

export const getOneEL = (table, id) =>
  queryDB(
    `SELECT slug, title, category, ingredients, recipe, image, username  FROM ${table} WHERE (LOWER(slug) = LOWER(?))`,
    [slug(id.trim()).slice(0, 40)]
  );

export const createEL = (table, body) => {
  changeDB(
    `INSERT INTO ${table}(title, category, ingredients, recipe, image, username, slug) VALUES($1, $2, $3, $4, $5, $6, $7);`,
    [
      body.title,
      body.category,
      body.ingredients,
      body.recipe,
      body.image,
      body.username,
      slug(body.title.trim().slice(0, 40)),
    ]
  );
};

export const updateEL = (table, body, id) => {
  changeDB(
    `UPDATE ${table}(title, category, ingredients, recipe, image, username, slug) VALUES($2, $3, $4, $5, $6, $7, $8) WHERE (slug = ($1));`,
    [
      id,
      body.title,
      body.category,
      body.ingredients,
      body.recipe,
      body.image,
      body.username,
      slug(body.title.trim().slice(0, 40)),
    ]
  );
};

export const deleteEL = (table, id) => {
  deleteDB(`DELETE FROM ${table} WHERE (slug = ($1));`, [id]);
};
