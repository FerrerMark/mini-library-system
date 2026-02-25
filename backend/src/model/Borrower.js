import mongoose from "mongoose";

const borrowerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  borrowedBook: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book"
    }
  ]
});

export default mongoose.model("Borrower", borrowerSchema);