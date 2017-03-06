/**
 * Created by tlakatlekutl on 06.03.17.
 */

describe("Проверка смены пароля", function() {

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
    it("Попытка смены пароля с пустыми полями 400", done => {
        const data = {
            'old-password': '',
            'password': ''
        };
        api.post('/change-password', data, response => {
            expect(response.status).toBe(400);
            done(true);
        });

    });
    it("Попытка смены пароля с неверным старым паролем 403", done => {
        const data = {
            'old-password': password+'asd',
            'password': 'new_password'
        };
        console.log(data);
        api.post('/change-password', data, response => {
            expect(response.status).toBe(403);
            done(true);
        });

    });
    it("Смена пароля 200", done => {
        const data = {
            'old-password': password,
            'password': rs.generate()
        };
        console.log(data);
        window.password = data['password'];
        api.post('/change-password', data, response => {
            expect(response.status).toBe(200);
            done(true);
        });

    });

    it("Выход из системы 200", done => {
        api.post('/logout', null, response => {
            expect(response.status).toBe(200);
            done(true);
        });
    });

    it("Вход с новым паролем 200", done => {
        const data = {
            'password': password,
            'login': nickname
        };
        api.post('/login', data, response => {
            expect(response.status).toBe(200);
            done(true);
        });
    });


});

