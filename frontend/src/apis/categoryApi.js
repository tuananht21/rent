import instance from "../../utils/http";

const getAllCategories = () => {
  const URL_API = "admin/categories";
  return instance.get(URL_API);
};

const getCategoryById = (id) => {
  const URL_API = `admin/categories/${id}`;
  return instance.get(URL_API);
};

const createCategory = (name = "") => {
  const URL_API = "admin/categories";
  const data = {
    name,
  };

  return instance.post(URL_API, data);
};

const updateCategory = (id, name = "") => {
  const URL_API = `admin/categories/${id}`;
  const data = {
    name,
  };

  return instance.put(URL_API, data);
};

const deleteCategory = (id) => {
  const URL_API = `admin/categories/${id}`;
  return instance.delete(URL_API);
};

export {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};