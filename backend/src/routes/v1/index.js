import express from 'express';
import authRoutes from './authRoutes.js';
import categoryRoutes from './categoryRoutes.js';
import roomRoutes from './roomRoutes.js';
import adminCategoryRoutes from './admin/adminCategoryRoutes.js';
import favoriteRoutes from './favoriteRoutes.js';
import bookingRoutes from './bookingRoutes.js';
import reviewRoutes from './reviewRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/categories', categoryRoutes);
router.use('/rooms', roomRoutes);
router.use('/favorites', favoriteRoutes);
router.use('/bookings', bookingRoutes);
router.use('/reviews', reviewRoutes);

// admin
router.use('/admin/categories', adminCategoryRoutes);

const APIs_V1 = router;
export default APIs_V1;
//