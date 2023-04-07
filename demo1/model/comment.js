
import mongoose from "mongoose";

export const SchemaComment = mongoose.Schema({
    description: {
        type: String,
    }
    , productId: {
        type: mongoose.Types.ObjectId,
        ref: "Product"
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
}, { timestamps: true, versionKey: false })
export default mongoose.model("Comment", SchemaComment)