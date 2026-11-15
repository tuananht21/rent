import Category from '../models/categoriesModel.js';
import ApiError from '../../utils/ApiError.js';
import redis from '../../config/redis.js';

const adminCreateCategoryService = async (data) => {
  const { name, description, image, status } = data;

  const existingCategory = await Category.findOne({ name });

  if (existingCategory) {
    throw new ApiError(409, 'Category already exists');
  }

  let category;

  try {
    category = await Category.create({ name, description, image, status });
  } catch (error) {
    if (error.code === 11000) {
      throw new ApiError(409, 'Category already exists');
    }

    throw new ApiError(500, 'Failed to create category');
  }

  try {
    await redis.del('categories:user:all', 'categories:admin:all');
  } catch (error) {
    console.error('Redis delete error:', error.message);
  }

  return category;
};

const adminGetAllCategoryService = async () => {
  const cacheKey = 'categories:admin:all';

  try {
    const cachedData = await redis.get(cacheKey);

    if (cachedData) {
      return JSON.parse(cachedData);
    }
  } catch (error) {
    console.error('Redis get error:', error.message);
  }

  try {
    const categories = await Category.find().sort({ createdAt: -1 }).lean();

    try {
      await redis.set(cacheKey, JSON.stringify(categories), 'EX', 3600);
    } catch (error) {
      console.error('Redis set error:', error.message);
    }

    return categories;
  } catch (error) {
    throw new ApiError(500, 'Failed to retrieve categories');
  }
};

const adminGetCategoryById = async (id) => {
  const cacheKey = `categories:admin:${id}`;

  try {
    const cachedData = await redis.get(cacheKey);

    if (cachedData) {
      return JSON.parse(cachedData);
    }
  } catch (error) {
    console.error('Redis get error:', error.message);
  }

  try {
    const category = await Category.findById(id).lean();

    if (!category) {
      throw new ApiError(404, 'Category not found');
    }

    await redis.set(cacheKey, JSON.stringify(category), 'EX', 3600);

    return category;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    if (error.name === 'CastError') {
      throw new ApiError(400, 'Invalid category ID');
    }

    throw new ApiError(500, 'Failed to retrieve category');
  }
};

const adminUpCategoryService = async (id, data) => {
  const category = await Category.findById(id);

  if (!category) {
    throw new ApiError(404, 'Category not found');
  }

  if (data.name && data.name !== category.name) {
    const existingCategory = await Category.findOne({ name: data.name, _id: { $ne: id } });

    if (existingCategory) {
      throw new ApiError(409, 'Category name already exists');
    }
  }

  Object.assign(category, data);

  try {
    await category.save();
  } catch (error) {
    if (error.code === 11000) {
      throw new ApiError(409, 'Category name already exists');
    }

    throw new ApiError(500, 'Failed to update category');
  }

  try {
    await redis.del('categories:user:all', 'categories:admin:all', `categories:user:${id}`, `categories:admin:${id}`);
  } catch (error) {
    console.error('Redis delete error:', error.message);
  }

  return category;
};

const adminDeleteCategoryService = async (id) => {
  const category = await Category.findById(id);

  if (!category) {
    throw new ApiError(404, 'Category not found');
  }

  await Category.findByIdAndDelete(id);

  try {
    await redis.del('categories:user:all', 'categories:admin:all', `categories:user:${id}`, `categories:admin:${id}`);
  } catch (error) {
    console.error('Redis delete error:', error.message);
  }

  return category;
};

export {
  adminCreateCategoryService,
  adminGetAllCategoryService,
  adminGetCategoryById,
  adminUpCategoryService,
  adminDeleteCategoryService,
};
