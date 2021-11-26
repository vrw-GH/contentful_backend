import { Router } from "express";
import {
  getAllEL,
  getOneEL,
  createEL,
  deleteEL,
} from "../controllers/data-DB.js";
import ErrorResponse from "../utils/ErrorResponse.js";

const usersRouter = Router();
usersRouter
  .route("/")
  .get(async (req, res) => {
    //                                         get all users
    try {
      const users = await getAllEL("users");
      const info = { message: `All users list`, records: users.length };
      res.json({ info, users });
    } catch (error) {
      new ErrorResponse(error, 401);
    }
  })
  .post(async (req, res) => {
    //                                         create new user
    const newElement = req.body;
    try {
      await getOneEL("users", newElement.username);
      const info = { message: `User ${newElement.username} already exists` };
      res.json({ info });
    } catch (error) {
      try {
        // some data validation here...               ?? how to catch json error
        const user = await createEL("users", newElement);
        const info = { message: `New user ${newElement.username} added` };
        res.json({ info, user });
      } catch (error) {
        const info = { message: `User ${newElement.username} already exists` };
        res.json({ info });
      }
    }
  });

usersRouter
  .route("/:id")
  .get(async (req, res) => {
    //                                         get single user
    try {
      const user = await getOneEL("users", req.params.id);
      const info = { message: `User info for ${req.params.id}` };
      res.json({ info, user });
    } catch (error) {
      const info = { message: `User ${req.params.id} does not exist` };
      res.json({ info });
    }
  })
  .post(async (req, res) => {
    //                                         update single user         (to do!!)
    const newElement = req.body;
    // validation here...                      ?? how to catch json error
    try {
      const user = await getOneEL("users", req.params.id);
      const info = { message: `User info for ${req.params.id} updated` };
      res.json({ info, user });
    } catch (error) {
      new ErrorResponse(error, 401);
    }
  })
  .delete(async (req, res) => {
    //  Confirm...                     make sure!! - implement at front-end ?
    try {
      const user = await getOneEL("users", req.params.id);
      if (user) {
        await deleteEL("users", req.params.id);
        const info = { message: `User ${req.params.id} DELETED` };
        res.json({ info });
      } else {
      }
    } catch (error) {
      const info = { message: `User ${req.params.id} does not exist` };
      res.json({ info });
    }
  });

export default usersRouter;
