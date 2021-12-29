import express from "express";
import {sampleHealthCheck} from "./sample";

const router = express.Router();

router.get("/ping", sampleHealthCheck);

export = router;