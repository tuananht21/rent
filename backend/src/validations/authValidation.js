import Joi from 'joi';
import ApiError from '../utils/ApiError.js';

const registerValidation = async (req, res, next) => {
  try {
    const schema = Joi.object({
      userName: Joi.string().min(3).max(30).required().trim().strict().messages({
        'string.base': 'Tên người dùng phải là một chuỗi văn bản.',
        'string.empty': 'Tên người dùng không được để trống.',
        'string.min': 'Tên người dùng phải có ít nhất {#limit} ký tự.',
        'string.max': 'Tên người dùng không được vượt quá {#limit} ký tự.',
        'any.required': 'Tên người dùng là trường bắt buộc.',
      }),

      email: Joi.string().email().required().trim().strict().messages({
        'string.base': 'Email phải là một chuỗi văn bản.',
        'string.empty': 'Email không được để trống.',
        'string.email': 'Email không đúng định dạng.',
        'any.required': 'Email là trường bắt buộc.',
      }),

      password: Joi.string().min(8).max(50).required().strict().messages({
        'string.base': 'Mật khẩu phải là một chuỗi văn bản.',
        'string.empty': 'Mật khẩu không được để trống.',
        'string.min': 'Mật khẩu phải có ít nhất {#limit} ký tự.',
        'string.max': 'Mật khẩu không được vượt quá {#limit} ký tự.',
        'any.required': 'Mật khẩu là trường bắt buộc.',
      }),

      confirmPassword: Joi.string().valid(Joi.ref('password')).required().strict().messages({
        'string.base': 'Mật khẩu xác nhận phải là một chuỗi văn bản.',
        'string.empty': 'Mật khẩu xác nhận không được để trống.',
        'any.only': 'Mật khẩu xác nhận không khớp.',
        'any.required': 'Mật khẩu xác nhận là trường bắt buộc.',
      }),
    });

    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    const errorMessage = error.details ? error.details.map((detail) => detail.message).join(', ') : error.message;

    next(new ApiError(error.isJoi ? 400 : 500, errorMessage));
  }
};

const loginValidation = async (req, res, next) => {
  try {
    const schema = Joi.object({
      email: Joi.string().email().required().trim().strict().messages({
        'string.base': 'Email phải là một chuỗi văn bản.',
        'string.empty': 'Email không được để trống.',
        'string.email': 'Email không đúng định dạng.',
        'any.required': 'Email là trường bắt buộc.',
      }),

      password: Joi.string().required().strict().messages({
        'string.base': 'Mật khẩu phải là một chuỗi văn bản.',
        'string.empty': 'Mật khẩu không được để trống.',
        'any.required': 'Mật khẩu là trường bắt buộc.',
      }),
    });

    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    const errorMessage = error.details ? error.details.map((detail) => detail.message).join(', ') : error.message;

    next(new ApiError(error.isJoi ? 400 : 500, errorMessage));
  }
};

export { registerValidation, loginValidation };
