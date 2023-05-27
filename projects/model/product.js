import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const productSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    original_price: {
        type: Number,
        require: true
    },
    description: {
        type: String,
        require: true,
    },
    salient_features: String,
    categoryId: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
    },
    image: String,
    comments: [{ type: mongoose.Types.ObjectId, ref: "Comment" }],

},
    { timestamps: true, versionKey: false }
)
productSchema.plugin(mongoosePaginate);
export default mongoose.model("Product", productSchema);