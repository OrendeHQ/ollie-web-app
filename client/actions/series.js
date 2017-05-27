import {
  SERIES_LOADING, SERIES_SUCCESS, SERIES_FAIL,
  SERIES_ADD, SERIES_REMOVE, SERIES_EDIT
} from '../constants/actionsType';
import { clearToken } from './token';

export function getSeries(token) {
  return function(dispatch) {
    dispatch(gettingSeries());
    fetch('/api/series/all', {
      method: 'GET',
      headers: { 'x-access-token': token }
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((r) => dispatch(successfullyGetSeries(r.series)));
      } else if (res.status === 403) {
        dispatch(clearToken());
      } else {
        res.json().then((r) => dispatch(failedGetSeries(r.message)));
      }
    });
  };
}

export function addSeries(token, name) {
  return function(dispatch) {
    fetch('/api/series', {
      method: 'POST',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name })
    }).then((res) => {
      if (res.status === 201) {
        res.json().then((r) => dispatch({ type: SERIES_ADD, value: r.series }));
      } else if (res.status === 403) {
        dispatch(clearToken());
      } else {
        res.json().then(alert);
      }
    });
  };
}

export function removeSeries(token, id) {
  return function(dispatch) {
    fetch(`/api/series/${id}`, {
      method: 'DELETE',
      headers: { 'x-access-token': token }
    }).then((res) => {
      if (res.status === 200) {
        dispatch({ type: SERIES_REMOVE, value: { id } });
      } else if (res.status === 403) {
        dispatch(clearToken());
      } else {
        res.json().then(alert);
      }
    });
  };
}

export function editSeries(token, seriesObj) {
  return function(dispatch) {
    fetch('/api/series', {
      method: 'PUT',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(seriesObj)
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((r) => dispatch({ type: SERIES_EDIT, value: r.series }));
      } else if (res.status === 403) {
        dispatch(clearToken());
      } else {
        res.json().then(alert);
      }
    });
  };
}

function gettingSeries() {
  return { type: SERIES_LOADING };
}

function successfullyGetSeries(value) {
  return { type: SERIES_SUCCESS, value };
}

function failedGetSeries(message) {
  return { type: SERIES_FAIL, message };
}
