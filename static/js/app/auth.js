/**
 * Created by tlakatlekutl on 02.03.17.
 */

/* global API:true */
/* export signup */


function signup() {
  event.preventDefault();

  const form = document.getElementsByClassName('input-form')[0];
  const data = {
    email: form.elements[0].value,
    password: form.elements[2].value,
    login: form.elements[4].value,
  };

  const api = new API();

  api.signup(data)
        .then((response) => {
          if (response.status === 200) { window.location.replace(''); } // TODO fix it
        });
}

function login() {
  event.preventDefault();

  const form = document.getElementsByClassName('input-form')[0];
  const data = {
    login: form.elements[0].value,
    password: form.elements[1].value,
  };
  console.log(JSON.stringify(data));

  const api = new API();

  api.login(data)
        .then((response) => {
          if (response.status === 200) { window.location.replace(''); } // TODO fix it
        });
}

