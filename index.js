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
// ------------ MY ROUTES -----------
import baseRoute from "./src/routes/router0-indexpage.js";
import recipesRouter from "./src/routes/router1-recipes.js";
import usersRouter from "./src/routes/router2-users.js";
import categoriesRouter from "./src/routes/router3-categories.js";
import ingredientsRouter from "./src/routes/router4-ingredients.js";
import shareitemsRouter from "./src/routes/router5-shareitems.js";
import plzRouter from "./src/routes/router6-plz.js";

const route0 = ["/", "Info Page"];
const endPoints = {
  route0: ["/", "Info Page", baseRoute], //props issue!!
  route1: ["/api/recipes", "API Recipes", recipesRouter],
  route2: ["/api/users", "API Users", usersRouter],
  route3: ["/api/categories", "API Categories", categoriesRouter],
  route4: ["/api/ingredients", "API Ingredients", ingredientsRouter],
  route5: ["/api/shareitems", "API Shareitems", shareitemsRouter],
  route6: ["/api/plz-de", "API PostalCodes DE", plzRouter],
};
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
// ----------- base 0 router to index page ----
app.get(endPoints["route0"][0], (req, res) =>
  res.status(501).render("index.ejs", { APPNAME, endPoints, HOST, PORT })
);
// ----------- iterate my routers  ----
for (let index = 1; index < Object.keys(endPoints).length; index++) {
  var key = "route" + index;
  app.use(endPoints[key][0], endPoints[key][2]);
}
app.get("*", (req, res, next) => {
  res.status(404).send(`<h1>${APPNAME} :- </h1> 
      <h3>ERROR: Routing/page not found. </h3>
      Back: <a href="${HOST}:${PORT}${route0[0]}">${route0[1]}</a>`);
});
// ----------- lastly error handling  ----
app.use(errorHandler);
// ----------- activate server!  ----
app.listen(PORT, () =>
  console.log(`${APPNAME} - Server listens at ${HOST}:${PORT}`)
);
