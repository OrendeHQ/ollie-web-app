import { TOKEN_LOADING, TOKEN_SUCCESS, TOKEN_FAIL, TOKEN_CLEAR } from '../constants/actionsType';
import { NONE, LOADING, SUCCESS, FAIL } from '../constants/ajaxStatus';

export default function token(state={}, action) {
  switch (action.type) {
    case TOKEN_LOADING:
      return { status: LOADING };
    case TOKEN_SUCCESS:
      localStorage.setItem('token', action.token);
      return { status: SUCCESS, value: action.token, error: '' };
    case TOKEN_FAIL:
      return { status: FAIL, error: action.message, value: '' };
    case TOKEN_CLEAR:
      localStorage.removeItem('token');
      return { status: NONE, value: '', error: '' };
    default:
      return state;
  }
}
