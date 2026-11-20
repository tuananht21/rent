import express from 'express';
import { getCategoryController } from '../../controllers/categoryController.js';

const categoryRoutes = express.Router();

categoryRoutes.route('/')
  .get(getCategoryController);

categoryRoutes.route('/:id')
  .get(getCategoryController);

export default categoryRoutes;