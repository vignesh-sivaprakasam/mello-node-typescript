import { Document } from "mongoose";


export default interface IBoard extends Document {
    name: string;
}