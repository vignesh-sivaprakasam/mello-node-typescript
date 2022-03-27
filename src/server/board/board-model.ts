import mongoose, { Schema } from "mongoose";
import IBoard from "../interfaces/board";

const BoardSchema: Schema = new Schema({
    name: { type: String, required: true},
    stacks: [{type: Schema.Types.ObjectId, ref: 'Stack'}]
}, {
    timestamps: true
});

export = mongoose.model<IBoard>('Board', BoardSchema);