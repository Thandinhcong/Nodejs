import Product from "../model/product";
import Category from "../model/category";

export const ListProduct = async (req, res) => {
    const { _page = 1, _limit = 10, _sort = "createAt", _order = "asc" } = req.query;
    const options = {
        limit: 10,
        page: _page,
        limit: _limit,
        sort: {
            [_sort]: _order === "desc" ? -1 : 1,
        }
    }
    try {
        const { docs: products } = await Product.paginate({}, options)
        if (!products) {
            res.status(400).json({
                message: "Không có sản phẩm nòa",
            })
        }
        else {
            res.status(200).json({
                data: products,
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
        const products = await Product.findOne({ _id: req.params.id }).populate("categoryId");
        if (!products) {
            res.status(400).json({
                message: "Không có sản phẩm nòa",
            })
        }
        else {
            res.status(200).json({
                message: "List product",
                data: products,
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
        const products = await Product.create(req.body);
        if (!products) {
            res.status(400).json({
                message: "Không có sản phẩm nòa",
            })
        }
        await Category.findByIdAndUpdate(data.categoryId, {
            $addToSet: {
                products: products._id,
            },
        })
        return res.status(200).json({
            message: "more product success",
            data: products,
        })
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