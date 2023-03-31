import Joi from "joi";

export const signinSchema = Joi.object({
    name: Joi.string().required().messages({
        "string.empty": "Trường 'tên' không được để trống",
        "any.required": "Trường ' tên' là bắt buộc"
    }),
    email: Joi.string().email().required().messages({
        "string.empty": "trường  email không được để trống",
        "string.email": "email không đúng định dạng",
        "any.required": "trường email là bắt buộc",
    }),
    password: Joi.string().min(6).required().messages({
        "string.empty": "trường ' password' không được để trống",
        "string.min": "Tối thiểu mật khẩu phải có 6 kí tự trở lên",
        "any.required": " mật khẩu là bắt buộc"
    }),
    confilmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
        "string.empty": "xác nhận mật khẩu không được để trống",
        "any.string": "trường các nhận mật khẩu là bắt buộc",
        "any.only": "mật khẩu xác nhận khồn trùng khớp",
    })
})
export const signupSchema = Joi.object({

    email: Joi.string().email().required().messages({
        "string.empty": "trường  email không được để trống",
        "string.email": "email không đúng định dạng",
        "any.required": "trường email là bắt buộc",
    }),
    password: Joi.string().min(6).required().messages({
        "string.empty": "trường ' password' không được để trống",
        "string.min": "Tối thiểu mật khẩu phải có 6 kí tự trở lên",
        "any.required": " mật khẩu là bắt buộc"
    }),

})