/**
 * Created by tlakatlekutl on 05.03.17.
 */

;(function () {
    'use strict';

    class Net {

        constructor(
            baseUrl = '',
            headers = {}) {

                if (Net.__instance) {
                    return Net.__instance;
                }

                this._headers = headers;
                this._baseUrl = baseUrl;

                // this._fetchParams = {
                //     method: '',
                //     headers: this._headers,
                //     mode: 'cors',
                //     cache: 'default',
                //     credentials: 'include'
                // };

                Net.__instance = this;
        }

        _getDefaultParams() {
            return {
                method: '',
                headers: this._headers,
                mode: 'cors',
                cache: 'default',
                credentials: 'include'
            };
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

        post(url, data) {
            const postParams = this._getDefaultParams();
            postParams.method = 'POST';

            if (data) {
                if (!this._checkObjectString(data))
                    throw new TypeError('Error data object');
                postParams.body = JSON.stringify(data);
            } else
                postParams.body = null;

            return this._fetchUrl(this._baseUrl + url, postParams);
        }

        get(url, onSucces) {
            const getParams = this._getDefaultParams();
            getParams.method = 'GET';
            getParams.body = null;

             return this._fetchUrl(this._baseUrl + url, getParams, onSucces);

        }

        _fetchUrl(url, params) {
            return fetch(url, params);
                // .then(response => {
                //     console.log('from fetch');
                //     return response.clone();
                // })
                // .catch(error => {
                //     console.log(params);
                //     console.log('Catch' + error);
                // })
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

    window.Net = Net;

})();