import express, { Request, Response, NextFunction } from "express";

import {createStack, getAllStacks, getStack, updateStack, deleteStack} from "./stack-controller";
const router = express.Router();

//@route        GET api/boards
//@desc         Get All Boards
//@access       public

router.get("/:boardID/stacks", getAllStacks);

//@route        POST api/boards/:boardID/stacks
//@desc         Create a Stack
//@access       public

router.post("/:boardID/stacks", createStack);

//@route        GET api/boards/:id/stacks/:stackID
//@desc         GET the Stack
//@access       public

router.get("/:boardID/stacks/:stackID", getStack);


//@route        PUT api/boards/:boardID/stack/:stackID
//@desc         Update the Stack value
//@access       public

router.put("/:boardID/stacks/:stackID", updateStack);


//@route        DELETE api/boards/:boardID/stacks/:stackID
//@desc         Delete the Stack
//@access       public

router.delete("/:boardID/stacks/:stackID", deleteStack);
export = router;