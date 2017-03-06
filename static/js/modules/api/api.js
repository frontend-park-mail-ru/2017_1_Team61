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
            } else
                postParams.body = null;

            this._fetchUrl(this._baseUrl + url, postParams, onSucces)
        }

        get(url, onSucces) {
            const getParams = this._fetchParams;
            getParams.method = 'GET';
            getParams.body = null;

            //this._checkObjectString(data); //TODO check this

             this._fetchUrl(this._baseUrl + url, getParams, onSucces);

        }

        _fetchUrl(url, params, onSucces) {
            fetch(url, params)
                .then(response => {
                    if (onSucces) {
                        if (typeof onSucces != 'function')
                            throw new TypeError('onSucces is not a function');
                        else
                            onSucces(response);
                    }
                })
                .catch(error => {
                    console.log(params);
                    console.log('Catch' + error);
                })
        }

        RespJSON(response, onSucces) {

            if (!response)
                throw new TypeError('response is null');
            if (response.status == 200) {
                response.json()
                    .then(json => {
                        if (onSucces) {
                            if (typeof onSucces != 'function')
                                throw new TypeError('onSucces is not a function');
                            else
                                onSucces(json);
                        }
                    })
                    .catch(error => {
                        console.error(error);
                    })
            }

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