import mongoose, { Schema } from "mongoose";
import IStack from "server/interfaces/stack";

const StackSchema: Schema = new Schema({
    name: {type: String, required: true},
    color: {type: String, required: true},

    board: {type: Schema.Types.ObjectId, ref: 'Board'},
    cards: [{type: Schema.Types.ObjectId, ref: 'Card'}]
}, {
    timestamps: true
});

export = mongoose.model<IStack>('Stack', StackSchema);