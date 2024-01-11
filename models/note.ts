import { Schema, model } from "mongoose";

interface INotes {
    id?: String,
    author: String,
    title: String,
    year: String,
}

const BookSchema = new Schema<INotes>({
    id: String,
    author: {type: String, required: true},
    title: {type: String, required: true},
    year: {type: Number, required: true},
});

const Note = model<INotes>('notes', BookSchema);

export default Note