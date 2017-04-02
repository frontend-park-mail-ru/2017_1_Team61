/**
 * Created by tlakatlekutl on 31.03.17.
 */

/* global API:true */

(function getUserStatusFunc() {
  window.getUserStatus = () => new Promise((resolve, reject) => {
    const api = new API();
    api.getUser()
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else if (response.status === 403) {
            return { authorised: false };
          }
          throw new Error('User not authorized');
        })
        .then((json) => {
          resolve(json);
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
  });
}());
