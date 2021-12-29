import mongoose, { Schema } from "mongoose";
import IBoard from "../interfaces/board";

const BoardSchema:Schema = new Schema({
    name: { type: String, required: true}
}, {
    timestamps: true
});

export default mongoose.model<IBoard>('Board', BoardSchema);