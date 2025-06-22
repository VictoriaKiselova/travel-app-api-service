import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  user: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
});

const hotelSchema = new mongoose.Schema({
  name: String,
  stars: Number,
  images: [String],
  description: String,
  distanceToCenter: Number,
  amenities: [String],
});

const tourSchema = new mongoose.Schema(
  {
    tourTitle: { type: String, required: true },
    country: String,
    city: String,
    tourDescription: String,
    duration: Number,
    offsetDays: Number,
    startDate: Date,
    endDate: Date,
    price: Number,
    transport: String,
    food: String,
    tourImages: [String],
    program: [String],
    hotel: hotelSchema,
    reviews: [reviewSchema],
    bookingsCount: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    lastBookedAt: Date,
    slug: { type: String, unique: true },
    tourCode: { type: String, unique: true },
    seoTitle: String,
    seoDescription: String,
  },
  {
    timestamps: true,
  },
);

const Tour = mongoose.model('Tour', tourSchema);
export default Tour;
