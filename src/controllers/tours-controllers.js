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
      throw createHttpError(404, 'Tours not found');
    }

    res.json({
      status: 200,
      data,
      message: 'Success found all tours',
    });
  } catch (error) {
    next(error);
  }
};

export const getToursPopularController = async (req, res, next) => {
  try {
    const data = await getToursPopular();

    if (!data) {
      throw createHttpError(404, 'Popular tours not found');
    }
    res.json({
      status: 200,
      data,
      message: 'Success found all tours',
    });
  } catch (error) {
    next(error);
  }
};

export const getHotToursController = async (req, res, next) => {
  try {
    const data = await getHotTours();

    if (!data) {
      throw createHttpError(404, 'Hot-tours not found');
    }

    res.json({
      status: 200,
      data,
      message: `Hot-tours find success`,
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
      throw createHttpError(404, `Tours with country=${country} not found`);
    }

    res.json({
      status: 200,
      data,
      message: `Tour with country=${country} find success`,
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
      throw createHttpError(404, `Tour with id=${id} not found`);
    }

    res.json({
      status: 200,
      data,
      message: `Tour with id=${id} find success`,
    });
  } catch (error) {
    if (error.message.includes('Cast to ObjectId failed')) {
      error.status = 404;
    }
    next(error);
  }
};
