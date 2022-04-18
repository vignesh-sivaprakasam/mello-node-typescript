import {Document} from "mongoose";
import Card from "./card";

export default interface IStack extends Document {
    name: string;
    color: string;
    cards: Card[];
}