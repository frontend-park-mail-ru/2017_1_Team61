/**
 * Created by tlakatlekutl on 02.03.17.
 */

/*eslint no-console: ["error", {allow: ["log", "error"]}]*/
/*global API:true */
/*global profile_page:true, login_page:true, main_page:true*/
/*exported showUser*/

function showUser() {
    const api = new API();

    api.getUser()
        .then(response => {
            if (response.status == 200) {
                response.json()
                    .then(json => {
                        const name = document.getElementsByClassName('nickname__name')[0];
                        const email = document.getElementsByClassName('e-mail__name')[0];

                        name.innerHTML = json.login;
                        email.innerHTML = json.email;

                        let logoutButton = document.querySelector('#logout');

                        logoutButton.onclick = (event => {
                            event.preventDefault();

                            const api = new API();
                            api.logout()
                                .then(response => {
                                    if (response.status == 200) {
                                        profile_page.hidden = true;
                                        login_page.hidden = false;
                                    }
                                });
                        });
                        // profile_page.hidden = false;
                        main_page.hidden = false;
                    });
            } else if (response.status == 403) {
                login_page.hidden = false;
            }
            else {
                throw new Error('Error getting user data');
            }
        })
        .catch(error => {
            console.error(error);
        });
}