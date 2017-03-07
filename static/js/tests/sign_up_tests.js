/**
 * Created by tlakatlekutl on 05.03.17.
 */


describe("Проверка регистрации", function() {

    const api = new API();

    beforeAll(done => {
        api.logout().then(done(true));
    });

    it("Создание уникального пользователя 200", done => {
        const data = {
            'email': email,
            'password': password,
            'login': nickname
        };
        api.signup(data)
            .then(response=>{
                expect(response.status).toBe(200);
                done(true);
            });

    });
    it("Попытка регистрации, будучи авторизованным 403", done => {
        const data = {
            'email': email,
            'password': password,
            'login': nickname
        };
        api.signup(data)
            .then(response=>{
                expect(response.status).toBe(403);
                done(true);
            });

    });

    it("Logout после ошибки 200", done => {
        //до
        api.logout()
            .then(response => {
                    expect(response.status).toBe(200);
                    done(true);
                });
    });


    it("Logout незарегистрированного пользователя 403", done => {
        api.logout()
            .then(response => {
                expect(response.status).toBe(403);
                done(true);
            });
    });
    it("Регистрация с невалидными данными 400", done => {
        const data = {
            'email': email,
            'password': '',
            'login': nickname
        };
        api.signup(data)
            .then(response=>{
                expect(response.status).toBe(400);
                done(true);
            });
    });
    it("Попытка регистрации с существующем login 409", done => {
        const data = {
            'email': email,
            'password': password,
            'login': nickname
        };
        api.signup(data)
            .then(response=>{
                expect(response.status).toBe(409);
                done(true);
            });

    });


});


