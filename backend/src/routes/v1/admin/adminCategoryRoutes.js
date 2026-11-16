import express from 'express';
import {
  adminCreateCategoryController,
  adminGetAllCategoryController,
  adminGetCategoryByIdController,
  adminUpdateCategoryController,
  adminDeleteCategoryController,
} from '../../../controllers/admin/adminCategoryController.js';
import authMiddleware from '../../../middlewares/authMiddleware.js';
import roleMiddleware from '../../../middlewares/roleMiddleware.js';
import { createCategoryValidation } from '../../../validations/categoryValidation.js';

const adminCategoryRoutes = express.Router();

adminCategoryRoutes.route('/')
  .get(authMiddleware, roleMiddleware, adminGetAllCategoryController)
  .post(authMiddleware, roleMiddleware, createCategoryValidation, adminCreateCategoryController);

adminCategoryRoutes.route('/:id')
  .get(authMiddleware, roleMiddleware, adminGetCategoryByIdController)
  .put(authMiddleware, roleMiddleware, adminUpdateCategoryController)
  .delete(authMiddleware, roleMiddleware, adminDeleteCategoryController);

export default adminCategoryRoutes;
