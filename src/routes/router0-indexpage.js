import { Router } from "express";

const baseRoute = Router(); //   need props with appname,host,routeX etc.
baseRoute.route("/").get((req, res) =>
  res.status(501).render(
    "index.ejs",
    { APPNAME, endPoints, HOST, PORT }
    // .send(
    //   `<h1>${appName} :- </h1> <h3>Root Only (please use API route) </h3><a href="${host}:${port}${route1}">Route1 (API Countries)</a> <a href="${host}:${port}${route2}">Route2 (API Users)</a>`
  )
);

export default baseRoute;
