import express from "express";
import {getAllBoards, getBoard, deleteBoard, updateBoard, createBoard} from "./board-controller";
const router = express.Router();

//@route        GET api/boards
//@desc         Get All Boards
//@access       public

router.get("/", getAllBoards);

//@route        POST api/boards
//@desc         Create a Board
//@access       public

router.post("/", createBoard);

//@route        GET api/boards/:id
//@desc         GET the Board
//@access       public

router.get("/:id", getBoard);


//@route        PUT api/boards/:id
//@desc         Update the Board value
//@access       public

router.put("/:id", updateBoard);


//@route        DELETE api/boards/:id
//@desc         Delete the Board
//@access       public

router.delete("/:id", deleteBoard);

export = router;