import logging from "../../config/logging";
import { NextFunction, Request, Response } from "express";
import Card from "./card-model";
import Stack  from "../stack/stack-model";

const NAMESPACE = "Card Controller";


//@route        GET api/boards/:boardID/stacks/:stackID/cards
//@desc         Get All Cards
//@access       public

export const getAllCards = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, "all cards");
    console.log("req: ", req.params);
}

//@route        POST api/boards/:boardID/stacks/:stackID/cards
//@desc         Create a Card
//@access       public
export const createCard = (req: Request, res: Response, next: NextFunction) => {
    const { title, description } = req.body;
    const {stackID} = req.params;
    const card = new Card({
        title,
        description,
        stack: stackID
    });

    card.save().then((cardItem) => {
        Stack.findByIdAndUpdate(stackID, {
            $push: { cards: card}
        }, (err, stack) => {
            if(err){
                    console.log("Error creating card");
            } else {
                    console.log(stack," CardItem adding", cardItem);
                    return res.json(cardItem);
            }
        })
    });
}

//@route        GET api/boards/:boardID/stacks/:stackID/cards/:cardID
//@desc         Get a Card
//@access       public

export const getCard = (req: Request, res: Response, next: NextFunction) => {
    const { cardID } = req.params;

    Card.findById(cardID)
        .then(card => res.status(200).json(card))
        .catch(error => 
            res.status(500)
                .json({ 
                    message: error.message,
                    error 
                }));
}

//@route        PUT api/boards/:boardID/stacks/:stackID/cards/:cardID
//@desc         Update a Card of a board
//@access       public

export const updateCard = (req: Request, res: Response, next: NextFunction) => {
    const { cardID } = req.params;
    const { title, description } = req.body;
    Card.findByIdAndUpdate(cardID, {
        title,
        description
    },{new: true})
    .then((card) => res.json(card));
}

//@route        DELETE api/boards/:boardID/stacks/:stackID/cards/:cardID
//@desc         Delete a Card
//@access       public

export const deleteCard = (req: Request, res: Response, next: NextFunction) => {
    const { cardID } = req.params;
    Card.findByIdAndDelete(cardID)
            .then((card)=> res.json(card));
}