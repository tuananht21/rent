import express from 'express';
import authRoutes from './authRoutes.js';
import categoryRoutes from './categoryRoutes.js';
import roomRoutes from './roomRoutes.js';
import adminCategoryRoutes from './admin/adminCategoryRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/categories', categoryRoutes);
router.use('/rooms', roomRoutes);

// admin
router.use('/admin/categories', adminCategoryRoutes);

const APIs_V1 = router;
export default APIs_V1;
//