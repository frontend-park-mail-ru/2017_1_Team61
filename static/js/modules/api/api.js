/**
 * Created by tlakatlekutl on 05.03.17.
 */

;(function () {
    'use strict';

    const ALLOWED_METHODS = ['POST', 'GET', 'PUT'];

    class API {

        constructor(
            baseUrl = 'https://fastball-backend.herokuapp.com/api',
            headers = {'content-type': 'application/json; charset=utf-8'}) {

                if (API.__instance) {
                    return API.__instance;
                }

                this._headers = headers;
                this._baseUrl = baseUrl;

                this._fetchParams = {
                    method: '',
                    headers: this._headers,
                    mode: 'cors',
                    cache: 'default',
                    credentials: 'include'
                };

                API.__instance = this;
        }

        set Headers(value) {
            try {
                this._checkObjectString(value);
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

        post(url, data, onSucces) {
            const postParams = this._fetchParams;
            postParams.method = 'POST';

            if (data) {
                this._checkObjectString(data); //TODO check this
                postParams.body = JSON.stringify(data);
            }

            fetch(this._baseUrl + url, postParams)
                .then(response => {
                    if (response.status == 200) {
                        //console.log(response);
                        return response;
                    }
                    throw new Error('Server error');
                })
                .then(object => {
                    if (onSucces) {
                        if (typeof onSucces != 'function')
                            throw new TypeError('onSucces is not a function');
                        else
                            onSucces(object);
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        }

        get(url, onSucces) {
            const getParams = this._fetchParams;
            getParams.method = 'GET';

            //this._checkObjectString(data); //TODO check this

            //postParams.body = JSON.stringify(data);

            fetch(this._baseUrl + url, getParams)
                .then(response => {
                    if (response.status == 200) {
                        return response.json();
                    }
                    throw new Error('Server error');
                })
                .then(object => {
                    onSucces(object);
                })
                .catch(error => {
                    console.log(error);
                })
        }
        
        _checkObjectString(object) {
            if (!(object && ('' + object === '[object Object]'))) {
                throw new TypeError('Object must be a plain object');
            }
            const valid = Object.keys(object).every(key => typeof object[key] === 'string');
            if (!valid) {
                throw new TypeError('Object must contain strings values');
            }
        }
    }

    window.API = API;

})();