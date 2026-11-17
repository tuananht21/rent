import Category from '../models/categoriesModel.js';
import ApiError from '../utils/ApiError.js';
import redis from '../config/redis.js';

const getCategoryService = async (id) => {
  const cacheKey = id ? `categories:user:${id}` : 'categories:user:all';

  try {
    const cachedData = await redis.get(cacheKey);

    if (cachedData) {
      return JSON.parse(cachedData);
    }
  } catch (error) {
    console.error('Redis get error:', error.message);
  }

  let result;

  if (id) {
    try {
      result = await Category.findOne({ _id: id, status: 'active' }).lean();
    } catch (error) {
      if (error.name === 'CastError') {
        throw new ApiError(400, 'Invalid category ID');
      }

      throw new ApiError(500, 'Failed to retrieve category');
    }

    if (!result) {
      throw new ApiError(404, 'Category not found');
    }
  } else {
    try {
      result = await Category.find({ status: 'active' }).sort({ createdAt: -1 }).lean();
    } catch (error) {
      throw new ApiError(500, 'Failed to retrieve categories');
    }
  }

  try {
    await redis.set(cacheKey, JSON.stringify(result), 'EX', 3600);
  } catch (error) {
    console.error('Redis set error:', error.message);
  }

  return result;
};

export { getCategoryService };
