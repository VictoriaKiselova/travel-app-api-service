import mongoose from 'mongoose';

const foodOptionSchema = new mongoose.Schema({
  type: { type: String, required: true },
  description: { type: String, required: true },
  extraPrice: { type: Number, default: 0 },
});

const reviewSchema = new mongoose.Schema({
  user: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
});

const transportSchema = new mongoose.Schema({
  type: { type: String, required: true },
  transportPrice: { type: Number, required: true },
  departureCity: [{ type: String, required: true }],
});

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  stars: Number,
  priceDay: Number,
  hotelDescription: String,
  foodOptions: [foodOptionSchema],
  images: [String],
  distanceToCenter: Number,
  amenities: [String],
});

const tourSchema = new mongoose.Schema(
  {
    tourTitle: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    tourDescription: { type: String },
    duration: Number,
    offsetDays: Number,
    startDate: Date,
    endDate: Date,
    childDiscount: Number,
    transferType: [transportSchema],
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
