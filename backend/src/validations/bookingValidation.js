import Joi from 'joi';
import ApiError from '../utils/ApiError.js';

const createBookingValidation = async (req, res, next) => {
  try {
    const schema = Joi.object({
      roomId: Joi.string().hex().length(24).required().messages({
        'string.hex': 'ID phòng phải là một ObjectId hợp lệ.',
        'string.length': 'ID phòng phải có đúng 24 ký tự.',
        'any.required': 'ID phòng là trường bắt buộc.',
      }),

      bookingDate: Joi.date().iso().greater('now').required().messages({
        'date.base': 'Ngày đặt phòng phải là một ngày hợp lệ.',
        'date.format': 'Ngày đặt phòng phải sử dụng định dạng ISO.',
        'date.greater': 'Ngày đặt phòng phải nằm trong tương lai.',
        'any.required': 'Ngày đặt phòng là trường bắt buộc.',
      }),

      note: Joi.string().max(500).allow('', null).trim().strict().messages({
        'string.max': 'Ghi chú đặt phòng không được vượt quá {#limit} ký tự.',
      }),
    });

    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    const errorMessage = error.details ? error.details.map((detail) => detail.message).join(', ') : error.message;

    next(new ApiError(error.isJoi ? 400 : 500, errorMessage));
  }
};

const updateBookingValidation = async (req, res, next) => {
  try {
    const schema = Joi.object({
      bookingDate: Joi.date().iso().greater('now'),

      note: Joi.string().max(500).allow('', null).trim().strict(),

      status: Joi.string().valid('confirmed', 'cancelled', 'completed'),
    }).min(1);

    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    const errorMessage = error.details ? error.details.map((detail) => detail.message).join(', ') : error.message;

    next(new ApiError(error.isJoi ? 400 : 500, errorMessage));
  }
};

export { createBookingValidation, updateBookingValidation };