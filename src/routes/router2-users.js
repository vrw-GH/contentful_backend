import { Router } from "express";
import {
  getAllEL,
  getOneEL,
  createEL,
  updateEL,
  deleteEL,
} from "../controllers/dbData-users.js";
import ErrorResponse from "../utils/ErrorResponse.js";

const dbTable = "users";
const fields = [
  //field,creating,updatable
  ["username", true, false],
  ["email", true, true],
  ["password", true, true],
  ["profilepic", false, true], //text
  ["plz", false, true], //char(10)
  ["location", false, true], //point(x,y)
];
const keyField = fields[0][0];

const validateElement = (element, toUpdate) => {
  const tester = element;
  try {
    // console.log(JSON.stringify(tester)); // if not json.
    fields.forEach((e) => {
      const field = e[0];
      const creation = e[1];
      const updatable = e[2];
      // console.log(
      //   "validation for",
      //   toUpdate ? "Updating" : "Creating",
      //   ": <",
      //   field,
      //   creation ? "> needed" : "> notneeded",
      //   updatable ? "canupdate" : "cannotupdate"
      // );
      // console.log(field, ":", tester[field]);
      if (toUpdate) {
        // when updating
        if (tester[field] !== undefined) {
          if (!updatable) {
            const msg = `Update <${field}> disallowed.`;
            console.log(msg);
            throw Error(msg);
          }
          if (creation && !tester[field]) {
            const msg = `<${field}> has error: (${tester[field]})`;
            console.log(msg);
            throw Error(msg);
          }
        }
      } else {
        // when creating
        if (creation && !tester[field]) {
          const msg = `<${field}> has error: (${tester[field]})`;
          console.log(msg);
          throw Error(msg);
        }
      }
    });
    // other validations
    return element;
  } catch (e) {
    throw Error(`Data validation failed- ${e.message}.`);
  }
};

const usersRouter = Router();
usersRouter
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
      res.status(404).json({ info, systemError: error.message });
    }
  })
  .post(async (req, res) => {
    //                                         create new tuple
    try {
      await getOneEL(dbTable, req.body[keyField]);
      const info = {
        result: false,
        message: `${keyField} <${req.body[keyField]}> already exists.`,
      };
      res.status(406).json({ info, systemError: null });
    } catch (err) {
      try {
        const newElement = validateElement(req.body, false); // generates error if invalid
        const tuple = await createEL(dbTable, newElement);
        const info = {
          result: true,
          message: `New data for <${req.body[keyField]}> added.`,
        };
        res.json({ info, tuple });
      } catch (error) {
        const info = {
          result: false,
          message: `Error creating <${req.body[keyField]}>.`,
        };
        res.status(406).json({ info, systemError: error.message });
      }
    }
  })
  .delete((req, res) => {
    const info = {
      result: false,
      message: `Delete all data not allowed.`,
    };
    res.status(403).json({ info, systemError: "" });
  });

usersRouter
  .route("/:id")
  .get(async (req, res) => {
    //                                         get single tuple
    try {
      const tuple = await getOneEL(dbTable, req.params.id);
      const info = {
        result: true,
        message: `${dbTable} info for <${req.params.id}>.`,
      };
      res.json({ info, tuple });
    } catch (error) {
      const info = {
        result: false,
        message: `${dbTable} <${req.params.id}> does not exist.`,
      };
      res.status(404).json({ info, systemError: error.message });
    }
  })
  .post(async (req, res) => {
    //                                         update single tuple
    try {
      let tuple = await getOneEL(dbTable, req.params.id);
      if (!tuple)
        throw Error(`${dbTable} <${req.params.id}> (couldnt find data).`);
      const newElement = validateElement(req.body, true); // generates error if invalid
      tuple = await updateEL(dbTable, newElement, req.params.id);
      if (!tuple) throw Error(`Update failed.`);
      const info = {
        result: true,
        message: `${dbTable} info for <${req.params.id}> updated.`,
      };
      res.json({ info, tuple });
    } catch (error) {
      const info = {
        result: false,
        message: `${dbTable} <${req.params.id}> error.`,
      };
      res.status(404).json({ info, systemError: error.message });
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
        message: `${dbTable} <${req.params.id}> DELETED.`,
      };
      res.json({ info });
    } catch (error) {
      const info = {
        result: false,
        message: `${dbTable} <${req.params.id}> does not exist.`,
      };
      res.status(404).json({ info, systemError: error.message });
    }
  });

export default usersRouter;
