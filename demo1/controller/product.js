import Product from "../model/product";


export const ListProduct = async (req, res) => {
    try {
        const data = await Product.find();
        if (!data) {
            res.status(400).json({
                message: "Không có sản phẩm nòa",
            })
        }
        else {
            res.status(200).json({
                message: "List product",
                data: data,
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error,
        })
    }
}
export const ListOneProduct = async (req, res) => {
    try {
        const data = await Product.findOne({ _id: req.params.id }).populate("categoryId");
        if (!data) {
            res.status(400).json({
                message: "Không có sản phẩm nòa",
            })
        }
        else {
            res.status(200).json({
                message: "List product",
                data: data,
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error,
        })
    }
}
export const Addproduct = async (req, res) => {
    try {
        const data = await Product.create(req.body);
        if (!data) {
            res.status(400).json({
                message: "Không có sản phẩm nòa",
            })
        }
        else {
            res.status(200).json({
                message: "more product success",
                data: data,
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error,
        })
    }
}
export const UpdateProduct = async (req, res) => {
    try {
        const data = await Product.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });
        if (!data) {
            res.status(400).json({
                message: "Không có sản phẩm nòa",
            })
        }
        else {
            res.status(200).json({
                message: "update product success",
                data: data,
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error,
        })
    }
}
export const deleteProduct = async (req, res) => {
    try {
        const data = await Product.findByIdAndRemove(req.params.id);
        if (!data) {
            res.status(400).json({
                message: "Không có sản phẩm nòa",
            })
        }
        else {
            res.status(200).json({
                message: "delete product success",
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error,
        })
    }
}