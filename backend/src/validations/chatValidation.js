import Joi from 'joi';
import ApiError from '../utils/ApiError.js';

const createChatValidation = async (req, res, next) => {
  try {
    const schema = Joi.object({
      roomId: Joi.string().hex().length(24).required().messages({
        'string.hex': 'ID phòng phải là một ObjectId hợp lệ.',
        'string.length': 'ID phòng phải có đúng 24 ký tự.',
        'any.required': 'ID phòng là trường bắt buộc.',
      }),
    });

    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    const errorMessage = error.details ? error.details.map((detail) => detail.message).join(', ') : error.message;

    next(new ApiError(error.isJoi ? 400 : 500, errorMessage));
  }
};

export { createChatValidation };