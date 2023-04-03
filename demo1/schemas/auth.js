import joi from "joi";
export const signupSchema = joi.object({
    name: joi.string().required().messages({
        "string.empty": 'Trường "tên" không được để trống',
        "any.required": 'Trường "tên" là bắt buộc',
    }),
    email: joi.string().email().required().messages({
        "string.empty": 'Trường "email" không được để trống',
        "string.email": 'Trường "email" không đúng định dạng',
        "any.required": 'Trường "email" là bắt buộc',
    }),
    password: joi.string().min(6).required().messages({
        "string.empty": 'Trường "mật khẩu" không được để trống',
        "string.min": 'Trường "mật khẩu" phải có ít nhất 6 ký tự',
        "any.required": "Trường mật khẩu là bắt buộc",
    }),
    number: joi.number().min(9).required().messages({
        "string.empty": 'Trường "số điện thoại" không được để trống',
        "string.min": 'Trường "số đinệ thoại" phải có ít nhất 9 ký tự',
        "any.required": "Trường phonelà bắt buộc",
    }),
    confirmPassword: joi.string().valid(joi.ref("password")).required().messages({
        "string.empty": 'Trường "xác nhận mật khẩu" không được để trống',
        "any.required": "Trường xác nhận mật khẩu là bắt buộc",
        "any.only": 'Trường "xác nhận mật khẩu" không khớp',
    }),
})
// 1. string empty:không được để trống
// 2. any.required :bắt buộc phải nhập
// 3.
// 3. any .required :"bắt nuộc phải nhập"
// 4. string.min : bắt buộc có bao nhiêu kí tự
// 5. any.only :Xác nhận giá trị config không khớp


export const signinSchema = joi.object({

    email: joi.string().email().required().messages({
        "string.empty": 'Trường "email" không được để trống',
        "string.email": 'Trường "email" không đúng định dạng',
        "any.required": 'Trường "email" là bắt buộc',
    }),
    password: joi.string().min(6).required().messages({
        "string.empty": 'Trường "mật khẩu" không được để trống',
        "string.min": 'Trường "mật khẩu" phải có ít nhất 6 ký tự',
        "any.required": "Trường mật khẩu là bắt buộc",
    }),

})