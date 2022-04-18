import { Document } from "mongoose";

export default interface ICard extends Document {
    title: string;
    description: string;
}