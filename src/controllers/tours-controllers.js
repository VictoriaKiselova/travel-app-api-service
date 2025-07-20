import createHttpError from 'http-errors';
import {
  getAllTours,
  getByCountry,
  getHotTours,
  getTourById,
  getToursPopular,
} from '../services/tour-services.js';

export const getAllToursController = async (req, res, next) => {
  try {
    const data = await getAllTours();

    if (!data) {
      throw createHttpError(404, 'Тури не знайдено');
    }

    res.json({
      status: 200,
      data,
      message: 'Успішно знайдено всі тури',
    });
  } catch (error) {
    next(error);
  }
};

export const getToursPopularController = async (req, res, next) => {
  try {
    const data = await getToursPopular();

    if (!data) {
      throw createHttpError(404, 'Популярні тури не знайдено');
    }
    res.json({
      status: 200,
      data,
      message: 'Успішно знайдено всі популярні тури',
    });
  } catch (error) {
    next(error);
  }
};

export const getHotToursController = async (req, res, next) => {
  try {
    const data = await getHotTours();

    if (!data) {
      throw createHttpError(404, 'Гарячі тури не знайдено');
    }

    res.json({
      status: 200,
      data,
      message: `Гарячі тури успішно знайдено`,
    });
  } catch (error) {
    if (error.message.includes('Cast to ObjectId failed')) {
      error.status = 404;
    }
    next(error);
  }
};

export const getByCountryController = async (req, res, next) => {
  const { country } = req.params;
  try {
    const data = await getByCountry(country);

    if (!data) {
      throw createHttpError(404, `Тури у країні "${country}" не знайдено`);
    }

    res.json({
      status: 200,
      data,
      message: `Тури у країні "${country}" успішно знайдено`,
    });
  } catch (error) {
    if (error.message.includes('Cast to ObjectId failed')) {
      error.status = 404;
    }
    next(error);
  }
};

export const getTourByIdController = async (req, res, next) => {
  const { id } = req.params;
  try {
    const data = await getTourById(id);

    if (!data) {
      throw createHttpError(404, `Тур з id=${id} не знайдено`);
    }

    res.json({
      status: 200,
      data,
      message: `Тур з id=${id} успішно знайдено`,
    });
  } catch (error) {
    if (error.message.includes('Cast to ObjectId failed')) {
      error.status = 404;
    }
    next(error);
  }
};
