import Joi from 'joi';
import ApiError from '../utils/ApiError.js';

const createCategoryValidation = async (req, res, next) => {
  try {
    const schema = Joi.object({
      name: Joi.string().min(2).max(50).required().trim().strict().messages({
        'string.base': 'Tên danh mục phải là một chuỗi văn bản.',
        'string.empty': 'Tên danh mục không được để trống.',
        'string.min': 'Tên danh mục phải có ít nhất {#limit} ký tự.',
        'string.max': 'Tên danh mục không được vượt quá {#limit} ký tự.',
        'any.required': 'Tên danh mục là trường bắt buộc.',
      }),

      description: Joi.string().allow('', null).trim().strict().messages({
        'string.base': 'Mô tả danh mục phải là một chuỗi văn bản.',
      }),

      image: Joi.string().uri().allow('', null).messages({
        'string.base': 'Hình ảnh phải là một chuỗi văn bản.',
        'string.uri': 'Đường dẫn hình ảnh không đúng định dạng URL.',
      }),
    });

    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    const errorMessage = error.details ? error.details.map((detail) => detail.message).join(', ') : error.message;

    next(new ApiError(error.isJoi ? 400 : 500, errorMessage));
  }
};

export { createCategoryValidation };
