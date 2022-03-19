import {Document} from "mongoose";

export default interface IStack extends Document {
    name: string;
    color: string;
}