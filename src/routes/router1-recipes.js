import { Router } from "express";
import slug from "slug";
import {
  getAllEL,
  getOneEL,
  createEL,
  updateEL,
  deleteEL,
} from "../controllers/dbData-recipes.js";
import ErrorResponse from "../utils/ErrorResponse.js";

const dbTable = "recipes";
const keyField = "title";

const recipesRouter = Router();
recipesRouter
  .route("/")
  .get(async (req, res) => {
    //                                         get all tuples
    try {
      const tuples = await getAllEL(dbTable);
      const info = { message: `All ${dbTable} list`, records: tuples.length };
      res.json({ info, tuples });
    } catch (error) {
      const info = { message: `No data found.` };
      res.json({ info });
    }
  })
  .post(async (req, res) => {
    //                                         create new tuple
    const newElement = req.body;
    try {
      await getOneEL(dbTable, newElement[keyField]);
      const info = {
        message: `${newElement[keyField]} slug already exists`,
      };
      res.json({ info });
    } catch (error) {
      try {
        // some data validation here...               ?? how to catch json error
        const tuple = await createEL(dbTable, newElement);
        const info = { message: `New data for ${newElement[keyField]} added` };
        res.json({ info, tuple });
      } catch (error) {
        const info = {
          message: `Error creating ${newElement[keyField]}. Please check data.`,
        };
        res.json({ info });
      }
    }
  });

recipesRouter
  .route("/:id")
  .get(async (req, res) => {
    //                                         get single tuple
    const idKey = slug(req.params.id.trim().slice(0, 40));
    try {
      const tuple = await getOneEL(dbTable, idKey);
      const info = { message: `${dbTable} info for ${req.params.id}` };
      res.json({ info, tuple });
    } catch (error) {
      const info = {
        message: `${dbTable} ${req.params.id} (no slug found)`,
      };
      res.json({ info });
    }
  })
  .post(async (req, res) => {
    //                                         update single tuple
    const idKey = slug(req.params.id.trim().slice(0, 40));
    try {
      const tuple = await getOneEL(dbTable, idKey);
      if (tuple) {
        const newElement = req.body;
        // validation here...                      ?? how to catch json error
        await updateEL(dbTable, newElement, idKey);
        const info = {
          message: `${dbTable} info for ${req.params.id} updated.`,
        };
        res.json({ info, tuple });
      } else {
        const info = {
          message: `No data for ${req.params.id}`,
        };
        res.json({ info });
      }
    } catch (error) {
      const info = {
        message: `${dbTable} ${req.params.id} (slug not found)`,
      };
      res.json({ info });
    }
  })
  .delete(async (req, res) => {
    //  Confirm...                     make sure!! - implement at front-end ?
    const idKey = slug(req.params.id.trim().slice(0, 40));
    try {
      const tuple = await getOneEL(dbTable, idKey);
      if (tuple) {
        await deleteEL(dbTable, idKey);
        const info = { message: `${dbTable} ${req.params.id} DELETED` };
        res.json({ info });
      } else {
        const info = {
          message: `Error deleting ${dbTable} ${req.params.id}`,
        };
        res.json({ info });
      }
    } catch (error) {
      const info = {
        message: `${dbTable} ${req.params.id} (slug does not exist)`,
      };
      res.json({ info });
    }
  });

export default recipesRouter;
