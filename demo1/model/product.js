import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name: String,
    age: Number,
    description: String,
    categoryId: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
    }
},
    { timestamps: true, versionKey: false }
)
export default mongoose.model("Product", productSchema);