import logging from "../../config/logging";
import { NextFunction, Request, Response } from "express";
import Stack  from "./stack-model";
import Board from "../board/board-model";

const NAMESPACE = "Stack Controller";


//@route        GET api/boards/:boardID/stacks
//@desc         Get All Boards
//@access       public

export const getAllStacks = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, "all stacks");
    console.log("req: ", req.params);
}

//@route        POST api/boards/:boardID/stacks
//@desc         Create a Stack
//@access       public
export const createStack = (req: Request, res: Response, next: NextFunction) => {
    const { name, color } = req.body;
    const {boardID} = req.params;
    const stack = new Stack({
        name,
        color,
        board : boardID
    });

    stack.save().then((stackItem) => {
        Board.findByIdAndUpdate(boardID, {
            $push : { stacks: stack }
        },(err, board)=>{
                if(err){
                        console.log("Error creating stack");
                } else {
                        console.log(board,"StackItem adding", stackItem);
                        return res.json(stackItem);
                }
        });
    });
}

//@route        GET api/boards/:boardID/stacks/:stackID
//@desc         Get a Stack
//@access       public

export const getStack = (req: Request, res: Response, next: NextFunction) => {
    const { stackID } = req.params;

    Stack.findById(stackID)
        .then(stack => res.status(200).json(stack))
        .catch(error => 
            res.status(500)
                .json({ 
                    message: error.message,
                    error 
                }));
}

//@route        PUT api/boards/:boardID/stacks/:stackID
//@desc         Update a Stack of a board
//@access       public

export const updateStack = (req: Request, res: Response, next: NextFunction) => {
    const { stackID } = req.params;
    const { name, color } = req.body;
    Stack.findByIdAndUpdate(stackID, {
        name,
        color
    },{new: true})
    .then((stack) => res.json(stack));
}

//@route        DELETE api/boards/:boardID/stacks/:stackID
//@desc         Delete a Stack of a board
//@access       public

export const deleteStack = (req: Request, res: Response, next: NextFunction) => {
    const { stackID } = req.params;
    Stack.findByIdAndDelete(stackID)
            .then((stack)=> res.json(stack));
}