import express from "express";

import {getAllCards, createCard, getCard, updateCard, deleteCard} from "./card-controller";
const router = express.Router();

//@route        GET api/boards/:boardID/stacks/:stackID/cards
//@desc         Get All Cards
//@access       public

router.get("/:boardID/stacks/:stackID/cards", getAllCards);

//@route        POST api/boards/:boardID/stacks/:stackID/cards
//@desc         Create a Card
//@access       public

router.post("/:boardID/stacks/:stackID/cards", createCard);

//@route        GET api/boards/:id/stacks/:stackID/cards/:cardID
//@desc         GET the Card
//@access       public

router.get("/:boardID/stacks/:stackID/cards/:cardID", getCard);


//@route        PUT api/boards/:boardID/stack/:stackID/cards/:cardID
//@desc         Update the Card value
//@access       public

router.put("/:boardID/stacks/:stackID/cards/:cardID", updateCard);


//@route        DELETE api/boards/:boardID/stacks/:stackID/cards/:cardID
//@desc         Delete the Card
//@access       public

router.delete("/:boardID/stacks/:stackID/cards/:cardID", deleteCard);
export = router;