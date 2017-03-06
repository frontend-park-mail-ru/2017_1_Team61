/**
 * Created by tlakatlekutl on 06.03.17.
 */

describe("Проверка текущего пользователя", function() {

    const api = new API();

    beforeAll(done => {
        api.post('/logout', null, response => {
            done(true);
        });
    });

     it("Получение данных неавторизованного пользователя 403", done => {
        // console.log(nickname);
        // console.log(email);
        api.get('/user', response => {
            expect(response.status).toBe(403);
            done(true);
        });

    });
    it("Авторизация пользователя 200", done => {
        const data = {
            'password': password,
            'login': nickname
        };
        api.post('/login', data, response => {
            expect(response.status).toBe(200);
            done(true);
        });

    });
    it("Получение данных авторизованного пользователя JSON==User", done => {
        const user = {
            'email': email,
            'login': nickname
        };
        api.get('/user', response => {
            // expect(response.status).toBe(200);
            api.RespJSON(response, json => {
                const compare = json['login'] == user['login'] &&
                                json['email'] == user['email'];
                expect(compare).toBe(true);
                done(true);
            });
        });

    });

});

