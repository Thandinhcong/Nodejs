// import axios from "axios";
import Joi from "joi";
import Product from "../models/products";
const productShema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    description: Joi.string(),
})
export const getAll = async (req, res) => {
    try {
        // gửi request từ server nodes -> json-server
        // const { data: products } = await axios.get(`http://localhost:3000/products`)
        const data = await Product.find();
        if (data.length === 0) {
            res.status(404).json({
                // Nếu mảng không có sản phẩm nào thì trả về 404
                message: "Không có sản phẩm nòa",
            })
        } else {
            // Nếu có sản phẩm thì trả về 200 và mảng sản phẩm
            return res.status(200).json(data)
        }
    }
    catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
}
export const get = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Product.findOne({ _id: id });
        // gửi request từ server nodes -> json-server
        // const { data: products } = await axios.get(`http://localhost:3000/products/${req.params.id}`)
        if (!data) {
            res.status(404).json({
                // Nếu mảng không có sản phẩm nào thì trả về 404
                message: "Không có sản phẩm nòa",
            })
        } else {
            // Nếu có sản phẩm thì trả về 200 và mảng sản phẩm
            return res.status(200).json(data)
        }
    }
    catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
}
export const Addproduct = async (req, res) => {
    try {
        const body = req.body;
        const { error } = productShema.validate(body);
        // const product = await Product.create(req.body);
        if (error) {
            return res.status(400).json({
                // Nếu mảng không có sản phẩm nào thì trả về 404
                message: error.details[0].message,
            })
        } else {
            const data = await Product.create(body);
            if (!data) {
                return res.status(400).json({ message: "Thêm sản phẩm thất bại" });
            }
            return res.status(201).json({
                message: "Product created",
                data: data,
            })
        }
    }
    catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
}
export const remove = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id)
        return res.json({
            message: "Sản phẩm đã được xóa thành công", product
        });
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
};
export const UpdateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const { error } = productShema.validate(body);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message,
            })

        } else {
            // Nếu có sản phẩm thì trả về 200 và mảng sản phẩm
            const data = await Product.findOneAndUpdate({ _id: id }, body, { new: true })
            return res.status(200).json({
                message: "Sản phẩm đã được cập nhật thành công",
                data: data,
            })
        }

    }
    catch (error) {
        return res.status(500).json({
            message: error,
        });

    }
}