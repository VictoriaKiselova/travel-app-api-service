import Tour from '../db/models/Tours.js';
import { addDynamicDates } from '../utils/addDynamicDates.js';

export const getAllTours = async () => {
  const tours = await Tour.find();
  return addDynamicDates(tours);
};

export const getToursPopular = async () => {
  const tours = await Tour.find({ bookingsCount: { $gt: 30 } });
  return addDynamicDates(tours);
};

export const getHotTours = async () => {
  const allTours = await Tour.find();
  const today = new Date();
  const sevenDaysFromNow = new Date();
  sevenDaysFromNow.setDate(today.getDate() + 7);

  const toursWithDates = addDynamicDates(allTours);

  const hotTours = toursWithDates.filter((tour) => {
    const start = new Date(tour.startDate);
    return start >= today && start <= sevenDaysFromNow;
  });

  return hotTours;
};

export const getByCountry = async (country) => {
  const tours = await Tour.find({
    country: new RegExp(`^${country.trim()}`, 'i'),
  });
  return addDynamicDates(tours);
};

export const getTourById = async (id) => {
  const tour = await Tour.findById(id);
  if (!tour) return null;

  const result = addDynamicDates([tour])[0];
  return result;
};
