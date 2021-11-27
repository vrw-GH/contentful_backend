import { Router } from "express";
import {
  getAllEL,
  getOneEL,
  createEL,
  deleteEL,
} from "../controllers/dbData-users.js";
import ErrorResponse from "../utils/ErrorResponse.js";

const dbTable = "users";
const keyField = "username";

const usersRouter = Router();
usersRouter
  .route("/")
  .get(async (req, res) => {
    //                                         get all tuples
    try {
      const tuples = await getAllEL(dbTable);
      const info = { message: `All ${dbTable} list`, records: tuples.length };
      res.json({ info, tuples });
    } catch (error) {
      new ErrorResponse(error, 401);
    }
  })
  .post(async (req, res) => {
    //                                         create new tuple
    const newElement = req.body;
    try {
      await getOneEL(dbTable, newElement[keyField]);
      const info = {
        message: `${keyField} ${newElement[keyField]} already exists`,
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
          message: `Data for ${newElement[keyField]} already exists`,
        };
        res.json({ info });
      }
    }
  });

usersRouter
  .route("/:id")
  .get(async (req, res) => {
    //                                         get single tuple
    try {
      const tuple = await getOneEL(dbTable, req.params.id);
      const info = { message: `${dbTable} info for ${req.params.id}` };
      res.json({ info, tuple });
    } catch (error) {
      const info = { message: `${dbTable} ${req.params.id} does not exist` };
      res.json({ info });
    }
  })
  .post(async (req, res) => {
    //                                         update single tuple         (to do!!)
    const newElement = req.body;
    // validation here...                      ?? how to catch json error
    try {
      const tuple = await getOneEL(dbTable, req.params.id);
      if (tuple) {
        await updateEL(dbTable, newElement, req.params.id);
        const info = {
          message: `${dbTable} info for ${req.params.id} updated`,
        };
        res.json({ info, tuple });
      } else {
        const info = { message: `Couldnt update ${dbTable} ${req.params.id} ` };
        res.json({ info });
      }
    } catch (error) {
      const info = { message: `${dbTable} ${req.params.id} does not exist` };
      res.json({ info });
    }
  })
  .delete(async (req, res) => {
    //  Confirm...                     make sure!! - implement at front-end ?
    try {
      const tuple = await getOneEL(dbTable, req.params.id);
      if (tuple) {
        await deleteEL(dbTable, req.params.id);
        const info = { message: `${dbTable} ${req.params.id} DELETED` };
        res.json({ info });
      } else {
        const info = { message: `Couldnt delete ${dbTable} ${req.params.id} ` };
        res.json({ info });
      }
    } catch (error) {
      const info = { message: `${dbTable} ${req.params.id} does not exist` };
      res.json({ info });
    }
  });

export default usersRouter;
