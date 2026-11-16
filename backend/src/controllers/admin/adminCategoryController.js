import {
  adminCreateCategoryService,
  adminGetAllCategoryService,
  adminGetCategoryById,
  adminUpCategoryService,
  adminDeleteCategoryService,
} from '../../services/admin/adminCategoryService.js';
import ApiError from '../../utils/ApiError.js';

const adminCreateCategoryController = async (req, res, next) => {
  try {
    const category = await adminCreateCategoryService(req.body);

    res.status(201).json({
      success: true,
      message: 'Tạo danh mục thành công',
      data: category,
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return next(error);
    }
    next(new ApiError(500, error.message || 'Đã xảy ra lỗi khi tạo danh mục'));
  }
};

const adminGetAllCategoryController = async (req, res, next) => {
  try {
    const categories = await adminGetAllCategoryService();

    res.status(200).json({
      success: true,
      message: 'Lấy tất cả danh mục thành công',
      data: categories,
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return next(error);
    }
    next(new ApiError(500, error.message || 'Đã xảy ra lỗi khi lấy danh mục'));
  }
};

const adminGetCategoryByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const category = await adminGetCategoryById(id);

    res.status(200).json({
      success: true,
      message: 'Lấy danh mục thành công',
      data: category,
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return next(error);
    }
    next(new ApiError(500, error.message || 'Đã xảy ra lỗi khi lấy danh mục'));
  }
};

const adminUpdateCategoryController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const category = await adminUpCategoryService(id, req.body);

    res.status(200).json({
      success: true,
      message: 'Cập nhật danh mục thành công',
      data: category,
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return next(error);
    }
    next(new ApiError(500, error.message || 'Đã xảy ra lỗi khi cập nhật danh mục'));
  }
};

const adminDeleteCategoryController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const category = await adminDeleteCategoryService(id);

    res.status(200).json({
      success: true,
      message: 'Xóa danh mục thành công',
      data: category,
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return next(error);
    }
    next(new ApiError(500, error.message || 'Đã xảy ra lỗi khi xóa danh mục'));
  }
};

export {
  adminCreateCategoryController,
  adminGetAllCategoryController,
  adminGetCategoryByIdController,
  adminUpdateCategoryController,
  adminDeleteCategoryController,
};