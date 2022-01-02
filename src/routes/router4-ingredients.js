import { Router } from "express";
import {
  getAllEL,
  getOneEL,
  createEL,
  updateEL,
  deleteEL,
} from "../controllers/dbData-ingredients.js";
import ErrorResponse from "../utils/ErrorResponse.js";

const dbTable = "ingredients";
const fields = ["ingredient_id", "ingredient_name", "ingredient_unit"];
const keyField = fields[0];

const validateElement = (element) => {
  const tester = element;
  try {
    // console.log(JSON.stringify(tester)); // if not json.
    fields.forEach((e) => {
      if (!tester[e]) {
        console.log(e, ":", tester[e]);
        throw Error(`${e} undefined`);
      }
    });
    // other validations
    return element;
  } catch (e) {
    throw Error(`Data validation failed- ${e.message}.`);
  }
};

const ingredientsRouter = Router();
ingredientsRouter
  .route("/")
  .get(async (req, res) => {
    //                                         get all tuples
    try {
      const tuples = await getAllEL(dbTable);
      const info = {
        result: true,
        message: `All ${dbTable} list.`,
        records: tuples.length,
      };
      res.json({ info, tuples });
    } catch (error) {
      const info = { result: false, message: `No data found.` };
      res.json({ info });
    }
  })
  .post(async (req, res) => {
    //                                         create new tuple
    try {
      await getOneEL(dbTable, req.body[keyField]);
      const info = {
        result: false,
        message: `${keyField} ${req.body[keyField]} already exists.`,
      };
      res.json({ info });
    } catch (error) {
      try {
        const newElement = validateElement(req.body); // generates error if invalid
        const tuple = await createEL(dbTable, newElement);
        const info = {
          result: true,
          message: `New data for ${req.body[keyField]} added.`,
        };
        res.json({ info, tuple });
      } catch (error) {
        const info = {
          result: false,
          message: `Error creating ${req.body[keyField]} / ${error.message}.`,
        };
        res.json({ info });
      }
    }
  })
  .delete((req, res) => {
    const info = {
      result: false,
      message: `Delete all data not allowed.`,
    };
    res.json({ info });
  });

ingredientsRouter
  .route("/:id")
  .get(async (req, res) => {
    //                                         get single tuple
    try {
      const tuple = await getOneEL(dbTable, req.params.id);
      const info = {
        result: true,
        message: `${dbTable} info for ${req.params.id}.`,
      };
      res.json({ info, tuple });
    } catch (error) {
      const info = {
        result: false,
        message: `${dbTable} ${req.params.id} does not exist.`,
      };
      res.json({ info });
    }
  })
  .post(async (req, res) => {
    //                                         update single tuple
    try {
      let tuple = await getOneEL(dbTable, req.params.id);
      if (!tuple)
        throw Error(`${dbTable} ${req.params.id} (couldnt find data).`);
      const newElement = validateElement(req.body); // generates error if invalid
      tuple = await updateEL(dbTable, newElement, req.params.id);
      if (!tuple) throw Error(`Update failed.`);
      const info = {
        result: true,
        message: `${dbTable} info for ${req.params.id} updated.`,
      };
      res.json({ info, tuple });
    } catch (error) {
      const info = {
        result: false,
        message: `${dbTable} ${req.params.id} not existing (${error}).`,
      };
      res.json({ info });
    }
  })
  .delete(async (req, res) => {
    //  Confirm...                     make sure!! - implement at front-end ?
    try {
      const tuple = await getOneEL(dbTable, req.params.id);
      if (!tuple) throw Error(`Error in delete operation.`);
      await deleteEL(dbTable, req.params.id);
      const info = {
        result: true,
        message: `${dbTable} ${req.params.id} DELETED.`,
      };
      res.json({ info });
    } catch (error) {
      const info = {
        result: false,
        message: `${dbTable} ${req.params.id} does not exist/${error.message}.`,
      };
      res.json({ info });
    }
  });

export default ingredientsRouter;
