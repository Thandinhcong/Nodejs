
import mongoose from "mongoose";
const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    number: {
        type: Number,
        require: true
    }
    ,
    role: {
        type: String,
        default: "member"
    }
})
export default mongoose.model("User", userSchema);