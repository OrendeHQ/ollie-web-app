import { getToken, clearToken } from './token';
import {
  getSeries, addSeries, removeSeries, editSeries
} from './series';

const actionsCreator = {
  getToken, clearToken,
  getSeries, addSeries, removeSeries, editSeries
};

export default actionsCreator;
