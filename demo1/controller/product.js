import Product from "../model/product";
import Category from "../model/category";

export const ListProduct = async (req, res) => {
    const { _page = 1, _limit = 20, _sort = "createAt", _order = "asc" } = req.query;
    const options = {
        limit: 20,
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
                products,
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
        const products = await Product.findOne({ _id: req.params.id })
            .populate("categoryId")
            .populate("comments");
        if (!products) {
            res.status(400).json({
                message: "Không có sản phẩm nòa",
            })
        }
        else {
            res.status(200).json({
                message: "List product",
                products,
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
        await Category.findByIdAndUpdate(products.categoryId, {
            $addToSet: {
                products: products._id,
            },
        });
        if (!products) {
            return res.status(400).json({
                message: "Không thể tạo sản phẩm"
            })
        } else {

            return res.status(201).json({
                message: "Thêm sản phẩm thành công",
                data: products,
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Lỗi xảy ra khi tạo sản phẩm",
            error: error.message,
        });
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