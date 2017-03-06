/**
 * Created by tlakatlekutl on 05.03.17.
 */


describe("Проверка входа в систему", function() {

    const api = new API();

    beforeAll(done => {
        api.post('/logout', null, response => {
            // console.log(response.status);
            done(true);
        });
    });

    it("Вход в систему пользователя 200", done => {
        const data = {
            'password': password,
            'login': nickname
        };
        api.post('/login', data, response => {
            expect(response.status).toBe(200);
            done(true);
        });

    });
    it("Попытка входа, будучи авторизованным 403", done => {
        const data = {
            'password': password,
            'login': nickname
        };
        api.post('/login', data, response => {
            expect(response.status).toBe(403);
            done(true);
        });

    });
    it("Logout после ошибки 200", done => {
        api.post('/logout', null, response => {
            expect(response.status).toBe(200);
            done(true);
        });
    });

    it("Вход с невалидными данными 400", done => {
        const data = {
            'password': '',
            'login': nickname
        };
        api.post('/login', data, response => {
            expect(response.status).toBe(400);
            done(true);
        });
    });
    it("Попытка входа с неправильной комбинацией 401", done => {
        const data = {
            'password': password+'erwer',
            'login': nickname
        };
        api.post('/login', data, response => {
            expect(response.status).toBe(401);
            done(true);
        });

    });
    it("Попытка входа несуществующего пользователя 401", done => {
        const data = {
            'password': password,
            'login': nickname+'asfasf'
        };
        api.post('/login', data, response => {
            // console.log(response.status);
            expect(response.status).toBe(404);
            done(true);
        });

    });


});


