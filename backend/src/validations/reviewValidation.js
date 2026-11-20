import Joi from 'joi';
import ApiError from '../utils/ApiError.js';

const createReviewValidation = async (req, res, next) => {
  try {
    const schema = Joi.object({
      roomId: Joi.string().hex().length(24).required().messages({
        'string.hex': 'ID phòng phải là một ObjectId hợp lệ.',
        'string.length': 'ID phòng phải có đúng 24 ký tự.',
        'any.required': 'ID phòng là trường bắt buộc.',
      }),

      rating: Joi.number().integer().min(1).max(5).required().messages({
        'number.base': 'Đánh giá phải là một số.',
        'number.integer': 'Đánh giá phải là số nguyên.',
        'number.min': 'Đánh giá phải lớn hơn hoặc bằng {#limit}.',
        'number.max': 'Đánh giá không được vượt quá {#limit}.',
        'any.required': 'Đánh giá là trường bắt buộc.',
      }),

      comment: Joi.string().max(1000).allow('', null).trim().strict().messages({
        'string.base': 'Nội dung đánh giá phải là một chuỗi văn bản.',
        'string.max': 'Nội dung đánh giá không được vượt quá {#limit} ký tự.',
      }),
    });

    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    const errorMessage = error.details ? error.details.map((detail) => detail.message).join(', ') : error.message;

    next(new ApiError(error.isJoi ? 400 : 500, errorMessage));
  }
};

const updateReviewValidation = async (req, res, next) => {
  try {
    const schema = Joi.object({
      rating: Joi.number().integer().min(1).max(5).messages({
        'number.base': 'Đánh giá phải là một số.',
        'number.integer': 'Đánh giá phải là số nguyên.',
        'number.min': 'Đánh giá phải lớn hơn hoặc bằng {#limit}.',
        'number.max': 'Đánh giá không được vượt quá {#limit}.',
      }),

      comment: Joi.string().max(1000).allow('', null).trim().strict().messages({
        'string.base': 'Nội dung đánh giá phải là một chuỗi văn bản.',
        'string.max': 'Nội dung đánh giá không được vượt quá {#limit} ký tự.',
      }),
    })
      .min(1)
      .messages({
        'object.min': 'Vui lòng cung cấp ít nhất một thông tin cần cập nhật.',
      });

    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    const errorMessage = error.details ? error.details.map((detail) => detail.message).join(', ') : error.message;

    next(new ApiError(error.isJoi ? 400 : 500, errorMessage));
  }
};

export { createReviewValidation, updateReviewValidation };
