import Joi from 'joi';
import ApiError from '../utils/ApiError.js';

const createMessageValidation = async (req, res, next) => {
  try {
    const schema = Joi.object({
      chatId: Joi.string().hex().length(24).required().messages({
        'string.hex': 'ID cuộc trò chuyện phải là một ObjectId hợp lệ.',
        'string.length': 'ID cuộc trò chuyện phải có đúng 24 ký tự.',
        'any.required': 'ID cuộc trò chuyện là trường bắt buộc.',
      }),

      content: Joi.string().required().trim().strict().messages({
        'string.base': 'Nội dung tin nhắn phải là một chuỗi văn bản.',
        'string.empty': 'Nội dung tin nhắn không được để trống.',
        'any.required': 'Nội dung tin nhắn là trường bắt buộc.',
      }),

      type: Joi.string().valid('text', 'image', 'file').default('text').messages({
        'any.only': 'Loại tin nhắn phải là text, image hoặc file.',
      }),
    });

    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    const errorMessage = error.details ? error.details.map((detail) => detail.message).join(', ') : error.message;

    next(new ApiError(error.isJoi ? 400 : 500, errorMessage));
  }
};

export { createMessageValidation };