import express from 'express';
import {
  getRoomController,
  createRoomController,
  updateRoomController,
  deleteRoomController,
} from '../../controllers/roomController.js';
import authMiddleware from '../../middlewares/authMiddleware.js';
import {
  createRoomValidation,
  updateRoomValidation,
  searchRoomValidation,
} from '../../validations/roomValidation.js';

const roomRoutes = express.Router();

roomRoutes.route('/')
  .get(searchRoomValidation, getRoomController)
  .post(authMiddleware, createRoomValidation, createRoomController);

roomRoutes.route('/:id')
  .get(getRoomController)
  .put(authMiddleware, updateRoomValidation, updateRoomController)
  .delete(authMiddleware, deleteRoomController);

export default roomRoutes;