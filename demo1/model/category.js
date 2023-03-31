import mongoose from "mongoose";
const productCateGory = new mongoose.Schema({
    name: String,
},
    { timestamps: true, versionKey: false }
);
export default mongoose.model("Category", productCateGory);
