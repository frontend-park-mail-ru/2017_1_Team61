/**
 * Created by tlakatlekutl on 06.03.17.
 */

/*global describe, it, beforeAll, expect */
/*global API:true, nickname:true, password:true, email:true */

describe('Проверка текущего пользователя', function() {

    const api = new API();

    beforeAll(done => {
        api.logout().then(done(true));
    });

    it('Получение данных неавторизованного пользователя 403', done => {
        api.getUser()
            .then(response => {
                expect(response.status).toBe(403);
                done(true);
            });

    });
    it('Авторизация пользователя 200', done => {
        const data = {
            'password': password,
            'login': nickname
        };
        api.login(data)
            .then(response => {
                expect(response.status).toBe(200);
                done(true);
            });

    });
    it('Получение данных авторизованного пользователя JSON==User', done => {
        const user = {
            'email': email,
            'login': nickname
        };
        api.getUser()
            .then(response => {
                return response.json();})
            .then(json => {
                const compare = json['login'] == user['login'] &&
                    json['email'] == user['email'];
                expect(compare).toBe(true);
                done(true);
            });
    });

});

