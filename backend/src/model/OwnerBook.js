import mongoose from "mongoose";

const OwnerBookSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    ownedBook: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book"
        }
    ]
});

export default mongoose.model("OwnerBook", OwnerBookSchema);