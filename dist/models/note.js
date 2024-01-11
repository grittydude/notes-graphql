import { Schema, model } from "mongoose";
const BookSchema = new Schema({
    id: String,
    author: { type: String, required: true },
    title: { type: String, required: true },
    year: { type: Number, required: true },
});
const Note = model('notes', BookSchema);
export default Note;
