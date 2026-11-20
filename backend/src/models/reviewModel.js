import mongoose from 'mongoose';
import reviewsMigration from '../database/migrations/reviewsMigration.js';

const reviewSchema = new mongoose.Schema(reviewsMigration, {
  timestamps: true,
  versionKey: false,
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;