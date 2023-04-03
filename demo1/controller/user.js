import User from "../model/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { signinSchema, signupSchema } from "../schemas/auth";
export const getUser = async (req, res) => {
    try {
        const users = await User.find();
        if (!users) {
            return res.status(400).json({
                message: "không có tài khoản nào",
            })
        }
        return res.status(200).json({

            users,
        })
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
        })
    }
}
export const signup = async (req, res) => {
    try {
        //validate đầu vào
        const { error } = signupSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.map((err) => err.message)
            return res.status(400).json({
                message: errors,
            })
        }
        //kiểm tra tài khoản có trong db hay không ?
        const userExits = await User.findOne({ email: req.body.email });
        if (userExits) {
            return res.status(400).json({
                message: "email đã tồn tại",
            })
        }
        // mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(req.body.password, 11);
        // tạo tài khoản mới
        const user = await User.create({
            ...req.body,
            password: hashedPassword,
        });
        // B4: Tạo token mới chứa id của user
        // tạo token , expiresIn trong khoảng thời gian bao nhiêu lâu ?
        const token = jwt.sign({ id: user._id }, "danhsapwebtruong", { expiresIn: "1d" });
        user.password = undefined;
        return res.status(201).json({
            message: "Tạo tài khoản thành công",
            accessToken: token,
            user,
        });

    } catch (error) {
        res.status(500).json({
            message: error,
        })
    }

}
// B1: Kiểm tra thông tin req.body có hợp lệ hay không
// B2: Kiểm tra email đã tồn tại hay chưa?
// B2.1: Mã hóa mật khẩu trước khi tạo user mới
// B3: Tạo user mới
// B4: Tạo token mới chứa id của user
// B5: Trả về client

export const signin = async (req, res) => {
    try {
        const { error } = signinSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({
                messages: errors,
            });
        }

        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({
                messages: "Email không tồn tại",
            });
        }
        // kiểm tra mật khẩu
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                messages: "Sai mật khẩu",
            });
        }

        // tạo tuken

        const token = jwt.sign({ id: user._id }, "danhsapwebtruong", { expiresIn: "1d" });
        user.password = undefined;
        return res.status(200).json({
            message: "Đăng nhập thành công",
            accessToken: token,
            user,
        });
    } catch (error) { }
};