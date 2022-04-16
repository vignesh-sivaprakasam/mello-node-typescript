import mongoose, { Schema } from "mongoose";
import ICard from "../interfaces/card";

const CardSchema: Schema = new Schema({
    title: { type: String, required: true},
    description: {type: String, required: true},
    
    stack: {type: Schema.Types.ObjectId, ref: 'Stack'}
}, {
    timestamps: true
});

export = mongoose.model<ICard>('Card', CardSchema);