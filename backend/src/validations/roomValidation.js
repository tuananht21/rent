import Joi from 'joi';
import ApiError from '../utils/ApiError.js';

const createRoomValidation = async (req, res, next) => {
  try {
    const schema = Joi.object({
      categoryId: Joi.string().hex().length(24).required().messages({
        'string.hex': 'ID danh mục phải là một ObjectId hợp lệ.',
        'string.length': 'ID danh mục phải có đúng 24 ký tự.',
        'any.required': 'ID danh mục là trường bắt buộc.',
      }),

      title: Joi.string().min(5).max(100).required().trim().strict().messages({
        'string.empty': 'Tiêu đề phòng không được để trống.',
        'string.min': 'Tiêu đề phòng phải có ít nhất {#limit} ký tự.',
        'string.max': 'Tiêu đề phòng không được vượt quá {#limit} ký tự.',
        'any.required': 'Tiêu đề phòng là trường bắt buộc.',
      }),

      description: Joi.string().min(10).required().trim().strict().messages({
        'string.empty': 'Mô tả phòng không được để trống.',
        'string.min': 'Mô tả phòng phải có ít nhất {#limit} ký tự.',
        'any.required': 'Mô tả phòng là trường bắt buộc.',
      }),

      price: Joi.number().min(0).required().messages({
        'number.base': 'Giá phòng phải là một số.',
        'number.min': 'Giá phòng không được nhỏ hơn 0.',
        'any.required': 'Giá phòng là trường bắt buộc.',
      }),

      area: Joi.number().min(1).required().messages({
        'number.base': 'Diện tích phòng phải là một số.',
        'number.min': 'Diện tích phòng phải lớn hơn 0.',
        'any.required': 'Diện tích phòng là trường bắt buộc.',
      }),

      address: Joi.string().required().trim().strict().messages({
        'string.empty': 'Địa chỉ phòng không được để trống.',
        'any.required': 'Địa chỉ phòng là trường bắt buộc.',
      }),

      images: Joi.array().items(Joi.string().uri()).messages({
        'array.base': 'Danh sách hình ảnh phòng phải là một mảng.',
        'string.uri': 'Mỗi hình ảnh phòng phải có đường dẫn URL hợp lệ.',
      }),

      amenities: Joi.array().items(Joi.string().trim().strict()).messages({
        'array.base': 'Danh sách tiện ích phải là một mảng.',
        'string.base': 'Mỗi tiện ích phải là một chuỗi văn bản.',
      }),
    });

    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    const errorMessage = error.details ? error.details.map((detail) => detail.message).join(', ') : error.message;

    next(new ApiError(error.isJoi ? 400 : 500, errorMessage));
  }
};

const updateRoomValidation = async (req, res, next) => {
  try {
    const schema = Joi.object({
      categoryId: Joi.string().hex().length(24).messages({
        'string.hex': 'ID danh mục phải là một ObjectId hợp lệ.',
        'string.length': 'ID danh mục phải có đúng 24 ký tự.',
      }),

      title: Joi.string().min(5).max(100).trim().strict().messages({
        'string.empty': 'Tiêu đề phòng không được để trống.',
        'string.min': 'Tiêu đề phòng phải có ít nhất {#limit} ký tự.',
        'string.max': 'Tiêu đề phòng không được vượt quá {#limit} ký tự.',
      }),

      description: Joi.string().min(10).trim().strict().messages({
        'string.empty': 'Mô tả phòng không được để trống.',
        'string.min': 'Mô tả phòng phải có ít nhất {#limit} ký tự.',
      }),

      price: Joi.number().min(0).messages({
        'number.base': 'Giá phòng phải là một số.',
        'number.min': 'Giá phòng không được nhỏ hơn 0.',
      }),

      area: Joi.number().min(1).messages({
        'number.base': 'Diện tích phòng phải là một số.',
        'number.min': 'Diện tích phòng phải lớn hơn 0.',
      }),

      address: Joi.string().trim().strict().messages({
        'string.empty': 'Địa chỉ phòng không được để trống.',
      }),

      images: Joi.array().items(Joi.string().uri()).messages({
        'array.base': 'Danh sách hình ảnh phòng phải là một mảng.',
        'string.uri': 'Mỗi hình ảnh phòng phải có đường dẫn URL hợp lệ.',
      }),

      amenities: Joi.array().items(Joi.string().trim().strict()).messages({
        'array.base': 'Danh sách tiện ích phải là một mảng.',
        'string.base': 'Mỗi tiện ích phải là một chuỗi văn bản.',
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

const searchRoomValidation = async (req, res, next) => {
  try {
    const schema = Joi.object({
      keyword: Joi.string().trim().allow('').messages({
        'string.base': 'Từ khóa tìm kiếm phải là một chuỗi văn bản.',
      }),

      categoryId: Joi.string().hex().length(24).messages({
        'string.hex': 'ID danh mục phải là một ObjectId hợp lệ.',
        'string.length': 'ID danh mục phải có đúng 24 ký tự.',
      }),

      minPrice: Joi.number().min(0).messages({
        'number.base': 'Giá thấp nhất phải là một số.',
        'number.min': 'Giá thấp nhất không được nhỏ hơn 0.',
      }),

      maxPrice: Joi.number().min(0).messages({
        'number.base': 'Giá cao nhất phải là một số.',
        'number.min': 'Giá cao nhất không được nhỏ hơn 0.',
      }),

      minArea: Joi.number().min(0).messages({
        'number.base': 'Diện tích nhỏ nhất phải là một số.',
        'number.min': 'Diện tích nhỏ nhất không được nhỏ hơn 0.',
      }),

      maxArea: Joi.number().min(0).messages({
        'number.base': 'Diện tích lớn nhất phải là một số.',
        'number.min': 'Diện tích lớn nhất không được nhỏ hơn 0.',
      }),

      page: Joi.number().integer().min(1).default(1).messages({
        'number.base': 'Số trang phải là một số.',
        'number.integer': 'Số trang phải là số nguyên.',
        'number.min': 'Số trang phải lớn hơn hoặc bằng 1.',
      }),

      limit: Joi.number().integer().min(1).max(50).default(10).messages({
        'number.base': 'Số lượng phòng mỗi trang phải là một số.',
        'number.integer': 'Số lượng phòng mỗi trang phải là số nguyên.',
        'number.min': 'Số lượng phòng mỗi trang phải lớn hơn hoặc bằng 1.',
        'number.max': 'Số lượng phòng mỗi trang không được vượt quá 50.',
      }),

      sort: Joi.string().valid('newest', 'price_asc', 'price_desc').messages({
        'any.only': 'Kiểu sắp xếp không hợp lệ.',
      }),
    });

    await schema.validateAsync(req.query, { abortEarly: false });
    next();
  } catch (error) {
    const errorMessage = error.details ? error.details.map((detail) => detail.message).join(', ') : error.message;

    next(new ApiError(error.isJoi ? 400 : 500, errorMessage));
  }
};

export { createRoomValidation, updateRoomValidation, searchRoomValidation };
