import { Router } from "express";
import { seedElements, createElement } from "../controllers/data-Array.js";

const countries = [];
seedElements(countries);

const countriesRouter = Router();
countriesRouter
  .route("/")
  .get((req, res) => {
    const msg = countries;
    res.send(msg);
  })
  .post((req, res) => {
    const newElement = req.body;
    createElement(countries, newElement);
    const msg = `Country ${newElement.name} added`;
    res.send(msg);
  });

export default countriesRouter;
