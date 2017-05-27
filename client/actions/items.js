import {
  ITEMS_LOADING, ITEMS_SUCCESS, ITEMS_FAIL,
  ITEMS_ADD, ITEMS_REMOVE, ITEMS_EDIT
} from '../constants/actionsType';
import { clearToken } from './token';

export function getItemsOfSeries(token, id) {
  return function(dispatch) {
    dispatch(gettingItems());
    fetch(`/api/item/${id}`)
      .then((res) => {
        if (res.status === 200) {
          res.json().then((r) => dispatch(successfullyGetItems(r.items)));
        } else {
          res.json().then((r) => dispatch(failedGetItems(r.message)));
        }
      });
  };
}

export function addNewItem(token, formData) {
  return function(dispatch) {
    fetch('/api/item', {
      method: 'POST',
      headers: {
        'x-access-token': token
      },
      body: formData
    }).then((res) => {
      if (res.status === 201) {
        res.json().then((r) => dispatch({ type: ITEMS_ADD, value: r.item }));
      } else if (res.status === 403) {
        dispatch(clearToken());
      } else {
        res.json().then(alert);
      }
    });
  };
}

export function removeItem(token, id) {
  return function(dispatch) {
    fetch(`/api/item/${id}`, {
      method: 'DELETE',
      headers: { 'x-access-token': token }
    }).then((res) => {
      if (res.status === 200) {
        dispatch({ type: ITEMS_REMOVE, value: { id } });
      } else if (res.status === 403) {
        dispatch(clearToken());
      } else {
        res.json().then(alert);
      }
    });
  };
}

export function editItem(token, formData) {
  return function(dispatch) {
    fetch('/api/item', {
      method: 'PUT',
      headers: { 'x-access-token': token },
      body: formData
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((r) => dispatch({ type: ITEMS_EDIT, value: r.item }));
      } else if (res.status === 403) {
        dispatch(clearToken());
      } else {
        res.json().then(alert);
      }
    });
  };
}

function gettingItems() {
  return { type: ITEMS_LOADING };
}

function successfullyGetItems(value) {
  return { type: ITEMS_SUCCESS, value };
}

function failedGetItems(message) {
  return { type: ITEMS_FAIL, message };
}
