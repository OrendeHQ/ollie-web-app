import { TOKEN_LOADING, TOKEN_SUCCESS, TOKEN_FAIL, TOKEN_CLEAR } from '../constants/actionsType';
import { push } from 'react-router-redux';

export function getToken(username, password) {
  return function(dispatch) {
    dispatch(gettingToken());
    fetch('/api/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    }).then((res) => {
      if (res.status === 200) {
        res.json()
          .then((r) => dispatch(successfullyGetToken(r.token)))
          .then(() => dispatch(push('/')));
      } else {
        res.json().then((r) => dispatch(failedGetToken(r.message)));
      }
    });
  };
}

export function clearToken() {
  return function(dispatch) {
    dispatch(removeToken());
    dispatch(push('/login'));
  };
}

function gettingToken() {
  return { type: TOKEN_LOADING };
}

function successfullyGetToken(token) {
  return { type: TOKEN_SUCCESS, token };
}

function failedGetToken(message) {
  return { type: TOKEN_FAIL, message };
}

function removeToken() {
  return { type: TOKEN_CLEAR };
}
