import Category from "../model/category"
import Product from "../model/product";

export const getAllCate = async (req, res) => {
    try {
        const categorys = await Category.find();
        if (!categorys) {
            return res.status(400).json({
                message: "Không có danh mục nào",
            })
        }
        return res.status(200).json({
            categorys,
        })
    } catch (error) {
        return res.status(500).json({
            message: error,
        })
    }
}

export const getOneCate = async (req, res) => {
    try {
        const categorys = await Category.findOne({ _id: req.params.id });
        if (!categorys) {
            return res.status(400).json({
                message: "Không có danh mục nào",
            })
        }
        const product = await Product.find({ categoryId: req.params.id })
        res.status(200).json({
            ...categorys.toObject(),
            product,
        })
    } catch (error) {
        return res.status(500).json({
            message: error,
        })
    }
}
export const addCate = async (req, res) => {
    try {

        const category = await Category.create(req.body);
        if (!category) {
            return res.status(400).json({
                message: "Không thể tạo danh mục"
            })
        } return res.status(201).json({
            message: "Thêm danh mục thành công",
            category,
        })
    } catch (error) {
        res.status(500).json({
            message: error,
        })
    }
}
export const deleteCate = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) {
            return res.status(400).json({
                message: "Không thể xóa danh mục",
            })
        }
        return res.status(200).json({
            message: "Xóa thành công danh mục",
            category,
        })
    } catch (error) {
        return res.status(500).json({
            message: error,
        })
    }
}
export const updateCate = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!category) {
            return res.status(400).json({
                message: "không tìm thấy danh mục",
            })
        }
        return res.status(200).json({
            message: "cập nhật thành công danh mục",
            category,
        })
    } catch (error) {
        res.status(500).json({
            message: error,
        })
    }
}