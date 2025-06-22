import {
  getAllTours,
  getByCountry,
  getHotTours,
  getTourById,
  getToursPopular,
} from '../services/tour-services.js';

export const getAllToursController = async (req, res) => {
  try {
    const data = await getAllTours();
    res.json({
      status: 200,
      data,
      message: 'Success found all tours',
    });
  } catch (error) {
    console.error(error);
  }
};

export const getToursPopularController = async (req, res) => {
  try {
    const data = await getToursPopular();
    res.json({
      status: 200,
      data,
      message: 'Success found all tours',
    });
  } catch (error) {
    console.error(error);
  }
};

export const getHotToursController = async (req, res) => {
  try {
    const data = await getHotTours();
    if (!data || data.length === 0) {
      return res.status(404).json({
        message: `Hot-tours not found`,
      });
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
    const { status = 500 } = error;
    res.status(status).json({
      message: error.message,
    });
  }
};

export const getByCountryController = async (req, res) => {
  const { country } = req.params;
  try {
    const data = await getByCountry(country);
    if (!data || data.length === 0) {
      return res.status(404).json({
        message: `Tours with country=${country} not found`,
      });
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
    const { status = 500 } = error;
    res.status(status).json({
      message: error.message,
    });
  }
};

export const getTourByIdController = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await getTourById(id);
    if (!data) {
      return res.status(404).json({
        message: `Tour with id=${id} not found`,
      });
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
    const { status = 500 } = error;
    res.status(status).json({
      message: error.message,
    });
  }
};
