import express from 'express';
import {
  getAllToursController,
  getToursPopularController,
  getHotToursController,
  getByCountryController,
  getTourByIdController,
} from '../controllers/tours-controllers.js';

const toursRouter = express.Router();
toursRouter.get('/', getAllToursController);

toursRouter.get('/popular', getToursPopularController);

toursRouter.get('/hot-tours', getHotToursController);

toursRouter.get('/country/:country', getByCountryController);

toursRouter.get('/details/:id', getTourByIdController);

export default toursRouter;
