import { getToken, clearToken } from './token';
import {
  getSeries, addSeries, removeSeries, editSeries
} from './series';
import {
  getItemsOfSeries, addNewItem, removeItem, editItem
} from './items';

const actionsCreator = {
  getToken, clearToken,
  getSeries, addSeries, removeSeries, editSeries,
  getItemsOfSeries, addNewItem, removeItem, editItem
};

export default actionsCreator;
