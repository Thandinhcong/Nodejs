import User from "../models/user.js";
import { signupSchema } from "../schemas/auth";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";
export const signup = async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;

        const { error } = signupSchema.validate(req.body, { abortEarly: false });

        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({
                message: errors,
            });
        }
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });
        const token = Jwt.sign({ _id: user._id }, "danhsapwebtruong", { expiesIn: "1h" });

        user.password = undefined;
        return res.status(201).json({
            message: "User created successfully",
            accessToken: token,
            user,
        });
    } catch (error) { }
};
export const signin = async () => {
    try {
        const { email, password } = req.body;

        const { error } = signupSchema.validate(req.body, { abortEarly: false });

        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({
                message: errors,
            });
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                message: "tài khoản không tồn tại",
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: 'Mật khẩu không chính xác',
            })
        }

        user.password = undefined;
        return res.status(201).json({
            message: "",
            accessToken: token,
            user,
        });
    } catch (error) { }
}