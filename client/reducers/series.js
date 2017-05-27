import {
  SERIES_LOADING, SERIES_SUCCESS, SERIES_FAIL,
  SERIES_ADD, SERIES_REMOVE, SERIES_EDIT
} from '../constants/actionsType';
import { LOADING, SUCCESS, FAIL } from '../constants/ajaxStatus';

export default function token(state={}, action) {
  let idx;
  switch (action.type) {
    case SERIES_LOADING:
      return { status: LOADING, value: [], error: '' };
    case SERIES_SUCCESS:
      return { status: SUCCESS, value: action.value, error: '' };
    case SERIES_FAIL:
      return { status: FAIL, value: [], error: action.message };
    case SERIES_ADD:
      return {
        status: SUCCESS,
        value: [
          ...state.value,
          action.value
        ],
        error: ''
      };
    case SERIES_REMOVE:
      idx = state.value.findIndex((s) => s.id === action.value.id);
      return {
        status: SUCCESS,
        value: [
          ...state.value.slice(0, idx),
          ...state.value.slice(idx+1)
        ],
        error: ''
      };
    case SERIES_EDIT:
      idx = state.value.findIndex((s) => s.id === action.value.id);
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
