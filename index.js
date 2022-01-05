import express from "express";
import cors from "cors";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import "./config.cjs";
const APPNAME = process.env.NODE_APP_PROJECT_NAME || "Contentful Backend";
const HOST = process.env.HOST || "http://localhost";
const PORT = process.env.PORT || 5000;

// ------------ MY MODULES -----------
import errorHandler from "./src/middlewares/errorHandler.js";
// import baseRouter() from "./src/routes/router0.js"; // APPNAME, server, port
import recipesRouter from "./src/routes/router1-recipes.js";
import usersRouter from "./src/routes/router2-users.js";
import categoriesRouter from "./src/routes/router3-categories.js";
import ingredientsRouter from "./src/routes/router4-ingredients.js";

const route0 = ["/", "Info Page"];
const route1 = ["/api/recipes", "API Recipes"];
const route2 = ["/api/users", "API Users"];
const route3 = ["/api/categories", "API Categories"];
const route4 = ["/api/ingredients", "API Ingredients"];
const endPoints = [route0, route1, route2, route3, route4];

// ------------ MAIN APP -----------
const app = express();
const corsOptions = {
  // {origin: [host, "http://127.0.0.1", "https://abul.db.elephantsql.com/"],}
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers
};
app.use(cors(corsOptions));
app.set("view engine", "ejs");
app.use(express.static(join(__dirname, "uploads"))); //for serving something
app.use(express.json());
app.get(route0[0], (req, res) =>
  res.status(501).render("index.ejs", { APPNAME, endPoints, HOST, PORT })
);
app.use(route1[0], recipesRouter);
app.use(route2[0], usersRouter);
app.use(route3[0], categoriesRouter);
app.use(route4[0], ingredientsRouter);
app.get("*", (req, res, next) => {
  res.status(404).send(`<h1>${APPNAME} :- </h1> 
      <h3>Route/page not found. </h3>
      Back: <a href="${HOST}:${PORT}${route0[0]}">${route0[1]}</a>`);
});

// ----------- lastly error handling  ----
app.use(errorHandler);

// ----------- activate server!  ----
app.listen(PORT, () =>
  console.log(`${APPNAME} - Server listens at ${HOST}:${PORT}`)
);
