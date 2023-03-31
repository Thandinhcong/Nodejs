import { signinSchema, signupSchema } from "../schemas/auth"
import User from "../model/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const sigin = async (req, res) => {
    try {
        //validate đầu vào
        const { error } = signinSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((err) => err.message)
            return res.status(400).json({
                message: errors,
            })
        }
        // kiểm tra tài khoản có tồn tại hay không;
        const userExits = await User.findOne({ email: req.body.email });
        if (userExits) {
            return res.status(400).json({
                message: "Email đã tồn tại",
            })
        }
        // mã hóa mật khẩu 
        const hasdedPassword = await bcrypt.hash(req.body.password, 11);
        //tạo user
        const user = await User.create({
            ...req.body,
            password: hasdedPassword,
        })
        // tạo token
        const token = jwt.sign({ id: user._id }, "danhsapwebtruong", { expiresIn: 3600 })
        user.password = undefined;
        //tránh việc rò rì dữ liệu người dùng
        return res.status(201).json({
            message: "tạo tài khoản thành công",
            accessToken: token,
            data: user
        })

    } catch (error) {

    }
}
export const signup = async (req, res) => {
    // validate đầu vào
    const { error } = signupSchema.validate((req.body), { abortEarly: false });
    if (error) {
        const errors = error.details.map((err) => err.message);
        return res.status(400).json({
            message: errors,
        })
    }

    // kiểm tra taig khoản có tồn tại hay không?
    const user = await User.findOne({ email: req.body.email });
    if (userExits) {
        return res.status(400).json({
            message: "Email đã tồn tại",
        })
    }

    // kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (isMatch) {
        return res.status(400).json({
            message: "mật khẩu không chính xác",
        })
    }

}