import Comment from "../model/comment";
import Product from "../model/product";
import User from "../model/user";
export const ListComment = async (req, res) => {
    try {
        const comments = await Comment.find()
            .populate("productId")
            .populate("users")
        if (!comments) {
            return res.status(400).json({
                message: "Không có comment nào !"
            })
        } else {
            return res.status(200).json({
                comments,
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server"
        })
    }
}
export const ListOneComment = async (req, res) => {
    try {
        const comments = await Comment.findOne({ _id: req.params.id })
        if (!comments) {
            return res.status(400).json({
                message: "Không có comment nào !"
            })
        } else {
            return res.status(200).json({
                comments,
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server"
        })
    }
}
export const AddComment = async (req, res) => {
    try {
        const comment = await Comment.create(req.body);
        await Product.findByIdAndUpdate(comment.productId, {
            $addToSet: {
                data: comment._id,
            },
        });
        if (!comment) {
            return res.status(400).json({
                message: "Không thể thêm comment"
            })
        }
        return res.status(201).json({
            message: "Thêm thành công",
            comment,
        })
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server"
        })
    }
}
export const DeleteComment = async (req, res) => {
    try {
        const comment = await Comment.findByIdAndRemove(req.params.id);
        if (!comment) {
            return res.status(400).json({
                message: "Không thể thêm comment"
            })
        }
        return res.status(201).json({
            message: "Xóa thành công",
            comment,
        })
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server"
        })
    }
}

