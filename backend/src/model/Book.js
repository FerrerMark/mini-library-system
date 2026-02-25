import mongoose from "mongoose";

const bookSchema= new mongoose.Schema({
    title: {
        type: String, 
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    genre: {
        type: String,
        required: true
    },
    imageUrl: {
    type: String, 
    required: false
  }
})

const Book = mongoose.model("Book", bookSchema);
export default Book