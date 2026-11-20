import express from 'express';
import {
  createFavoriteController,
  getFavoriteController,
  deleteFavoriteController,
  checkFavoriteController,
} from '../../controllers/favoriteController.js';
import authMiddleware from '../../middlewares/authMiddleware.js';

const favoriteRoutes = express.Router();

favoriteRoutes.route('/').get(authMiddleware, getFavoriteController).post(authMiddleware, createFavoriteController);

favoriteRoutes.route('/:roomId/check').get(authMiddleware, checkFavoriteController);

favoriteRoutes.route('/:roomId').delete(authMiddleware, deleteFavoriteController);

export default favoriteRoutes;
//