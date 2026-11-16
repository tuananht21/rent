import { getCategoryService } from '../services/categoryService.js';
import ApiError from '../utils/ApiError.js';

const getCategoryController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await getCategoryService(id);

    res.status(200).json({
      success: true,
      message: 'Lấy danh mục thành công',
      data,
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return next(error);
    }
    next(new ApiError(500, error.message || 'Đã xảy ra lỗi khi lấy thông tin danh mục'));
  }
};

export { getCategoryController };
