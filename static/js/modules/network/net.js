/**
 * Created by tlakatlekutl on 05.03.17.
 */

/* global fetch*/

export default class Net {

  constructor(baseUrl = '', headers = {}) {
    if (Net.instance) {
      return Net.instance;
    }

    this._headers = headers;
    this._baseUrl = baseUrl;

    Net.instance = this;
  }

  _getDefaultParams() {
    return {
      method: '',
      headers: this._headers,
      mode: 'cors',
      cache: 'default',
      credentials: 'include',
    };
  }

  set Headers(value) {
    try {
      this.checkObjectString(value);
      this._headers = value;
    } catch (e) {
      console.log(e.message);
    }
  }

  get BaseUrl() {
    return this._baseUrl;
  }

  set BaseUrl(url) {
    if (typeof url === 'string') {
      this._baseUrl = url;
    } else {
      throw new TypeError('Url must be a string');
    }
  }

  post(url, data) {
    const postParams = this._getDefaultParams();
    postParams.method = 'POST';

    if (data) {
      if (!this.checkObjectString(data)) { throw new TypeError('Error data object'); }
      postParams.body = JSON.stringify(data);
    } else { postParams.body = null; }

    return fetch(this._baseUrl + url, postParams);
  }

  get(url, onSucces) {
    const getParams = this._getDefaultParams();
    getParams.method = 'GET';
    getParams.body = null;

    return fetch(this._baseUrl + url, getParams, onSucces);
  }


  checkObjectString(object) {
    if (!(object && (`${object}` === '[object Object]'))) {
      console.error('Object must be a plain object');
      return false;
    }
    const valid = Object.keys(object).every(key => typeof object[key] === 'string');
    if (!valid) {
      console.error('Object must contain strings values');
      return false;
    }
    return true;
  }
}

