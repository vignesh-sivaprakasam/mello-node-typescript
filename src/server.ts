import http from "http";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import logging from "./config/logging";
import config from "./config/config";

import boardRoutes from "./server/board/board-route";


const NAMESPACE = "Server";

const router = express();

/** Mongo DB connection */
mongoose.connect(config.mongo.url, config.mongo.options)
        .then(()=> logging.info(NAMESPACE, "MongoDB Connected... "))
        .catch(err =>  logging.error(NAMESPACE,err));

/* Logging the request */

router.use((req, res, next) => {
    logging.info(NAMESPACE, `METHOD - [${req.method}, URL - [${req.url}], IP - [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        logging.info(NAMESPACE, `METHOD - [${req.method}, URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`);
    });
    next();
});

/* Parse the request */
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

/* Rules for API */
var allowedOrigins = ['http://localhost:8080', 'http://localhost:3000','http://mello-server.herokuapp.com','https://mello-server.herokuapp.com','http://mello-client.herokuapp.com', 'https://mello-client.herokuapp.com', 'http://mello-react.herokuapp.com','https://mello-react.herokuapp.com'];
router.use(function(req, res, next) {

        const origin = req.headers.origin || '';
        if(allowedOrigins.indexOf(origin) > -1){
                res.setHeader('Access-Control-Allow-Origin', origin);
        }
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
        next();
});

/* Routes */

router.use('/boards', boardRoutes);

/* Error Handling */
router.use((req, res, next) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});

/* Create the server */
const httpServer = http.createServer(router);
httpServer.listen(config.server.port, () => logging.info(NAMESPACE, `Server running on ${config.server.hostname}:${config.server.port}`));