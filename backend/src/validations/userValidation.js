import Joi from 'joi';
import ApiError from '../utils/ApiError.js';

const updateProfileValidation = async (req, res, next) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return next(new ApiError(400, 'Request body is empty'));
    }

    const schema = Joi.object({
      userName: Joi.string().min(3).max(50).trim().strict().messages({
        'string.base': 'userName phải là một chuỗi văn bản.',
        'string.empty': 'userName không được để trống.',
        'string.min': 'userName phải có ít nhất {#limit} ký tự.',
        'string.max': 'userName không được quá {#limit} ký tự.',
      }),

      phone: Joi.string().min(10).max(10).pattern(/^[0-9]+$/).allow(null, '').trim().strict().messages({
          'string.base': 'phone phải là một chuỗi văn bản.',
          'string.min': 'phone phải có ít nhất {#limit} ký tự.',
          'string.max': 'phone không được quá {#limit} ký tự.',
          'string.pattern.base': 'phone chỉ được chứa chữ số.',
        }),

      avatar: Joi.string().uri().allow(null, '').messages({
        'string.base': 'avatar phải là một chuỗi văn bản.',
        'string.uri': 'avatar phải là một URL hợp lệ.',
      }),
    })
      .min(1)
      .unknown(false);

    const validatedData = await schema.validateAsync(req.body, {
      abortEarly: false,
      stripUnknown: false,
    });

    req.body = validatedData;

    next();
  } catch (error) {
    const errorMessage = error.details ? error.details.map((detail) => detail.message).join(', ') : error.message;

    next(new ApiError(400, errorMessage));
  }
};

export { updateProfileValidation };
