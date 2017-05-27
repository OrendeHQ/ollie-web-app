import {
  ITEMS_LOADING, ITEMS_SUCCESS, ITEMS_FAIL,
  ITEMS_REMOVE, ITEMS_ADD, ITEMS_EDIT
} from '../constants/actionsType';
import { LOADING, SUCCESS, FAIL } from '../constants/ajaxStatus';

export default function items(state={}, action) {
  let idx;
  switch (action.type) {
    case ITEMS_LOADING:
      return { status: LOADING, value: [], error: '' };
    case ITEMS_SUCCESS:
      return { status: SUCCESS, value: action.value, error: '' };
    case ITEMS_FAIL:
      return { status: FAIL, value: [], error: action.message };
    case ITEMS_ADD:
      return {
        status: SUCCESS,
        value: [
          ...state.value,
          action.value
        ],
        error: ''
      };
    case ITEMS_REMOVE:
      idx = state.value.findIndex((i) => i.id === action.value.id);
      return {
        status: SUCCESS,
        value: [
          ...state.value.slice(0, idx),
          ...state.value.slice(idx+1)
        ],
        error: ''
      };
    case ITEMS_EDIT:
      idx = state.value.findIndex((i) => i.id === action.value.id);
      return {
        status: SUCCESS,
        value: [
          ...state.value.slice(0, idx),
          action.value,
          ...state.value.slice(idx+1)
        ],
        error: ''
      };
    default:
      return state;
  }
}
