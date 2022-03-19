import { Document } from "mongoose";
import Stack from "./stack";


export default interface IBoard extends Document {
    name: string;
    stacks: Stack[];
}