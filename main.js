import express from "express";
import cors from "cors";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import "dotenv/config"; //import dotenv from "dotenv";  runs Iffy? (run function as soon as created!)
//dotenv.config();  not needed!
const appName = process.env.NODE_APP_PROJECT_NAME || "My Node.JS Application";
const host = process.env.NODE_APP_SERVER_NAME || "http://127.0.0.1";
const port = process.env.NODE_APP_SERVER_PORT || 5000;

// ------------ MY MODULES -----------
// import baseRouter() from "./src/routes/router0.js"; // appname, server, port
import countriesRouter from "./src/routes/router1.js";
import usersRouter from "./src/routes/router2.js";
import errorHandler from "./src/middlewares/errorHandler.js";
const route0 = ["/", "Root"];
const route1 = ["/api/countries", "API Countries"];
const route2 = ["/api/users", "API Users"];
const endPoints = [route0, route1, route2];

// ------------ MAIN APP -----------
const app = express();
app.use(
  cors(
    "*"
    // {origin: [host, "http://127.0.0.1", "https://abul.db.elephantsql.com/"],}
  )
);
app.set("view engine", "ejs");
app.use(express.static(join(__dirname, "uploads"))); //for serving something
app.use(express.json());
app.get(route0[0], (req, res) =>
  res
    .status(501)
    //   .send(
    //     `<h1>${appName} :- </h1> <h3>Root Only (please use API route) </h3><a href="${host}:${port}${route1}">Route1 (API Countries)</a> <a href="${host}:${port}${route2}">Route2 (API Users)</a>`
    //   )
    .render("index.ejs", { appName, endPoints, host, port })
);
app.use(route1[0], countriesRouter); //      in-memory - Array
app.use(route2[0], usersRouter); //          using a database

// ----------- lastly error handling  ----
app.use(errorHandler);

// ----------- activate server!  ----
app.listen(port, () =>
  console.log(`${appName} - Server listens at ${host}:${port}`)
);
