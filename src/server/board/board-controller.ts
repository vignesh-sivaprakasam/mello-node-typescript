import logging from "../../config/logging";
import { Request, Response, NextFunction } from "express";

import Board from "./board-model";

const NAMESPACE = "Board Controller";

//@route        GET api/boards
//@desc         Get All Boards
//@access       public
const getAllBoards = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, "all boards");
    Board.find()
        .exec()
        .then(results => {
            logging.info(NAMESPACE, " boardlist response :", results);
            return res.status(200).json(results);
        })
        .catch(error => {
            return res.status(500).json({
                message: error.message,
                error
            })
        });
}

//@route        POST api/boards
//@desc         Create a Board
//@access       public

const createBoard = (req: Request, res: Response, next: NextFunction) => {
    console.log("Create Board");
    const newBoard = new Board({
        name : req.body.name
    });
    newBoard.save().then(item => res.json(item));
}

//@route        GET api/boards/:id
//@desc         GET the Board
//@access       public

const getBoard = (req: Request, res: Response, next: NextFunction) => {
    console.log("get Board");
    Board.findById(req.params.id)
                .populate({
                    path: 'stacks',
                    model: 'Stack'
                })
                // .populate({
                //         path : 'stacks',
                //         populate : {
                //                 path  : 'cards',
                //                 model : 'card'
                //         }
                // })
                .then(board => 
                        res.json(board)
                )
                .catch(error => res.status(500).json({ message: error.message,
                    error }));
}

//@route        PUT api/boards/:id
//@desc         Update the Board value
//@access       public

const updateBoard = (req: Request, res: Response, next: NextFunction) => {
    console.log("update board");
    Board.findByIdAndUpdate(req.params.id, {
        name  : req.body.name
    }, {new : true}).then(board => {
            return res.json(board);
    });
}

//@route        DELETE api/boards/:id
//@desc         Delete the Board
//@access       public

const deleteBoard = (req: Request, res: Response, next: NextFunction) => {
    console.log("delete board");
    Board.findById(req.params.id)
            .then(board => {
                    board && board.remove()
                            .then(() => res.json({ success: true }));
            })
            .catch(error => res.status(500).json({ message: error.message,
                error }));
}

export {
    getAllBoards,
    createBoard,
    getBoard,
    updateBoard,
    deleteBoard
};