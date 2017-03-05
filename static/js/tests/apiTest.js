/**
 * Created by tlakatlekutl on 05.03.17.
 */

 const rs = ('randomstring');



describe("Проверка регистрации", function() {

    const api = new API();

    const usernickname = rs.generate();

    beforeEach(done => {
        api.post('/logout');
        done(true);
    });

    it("Создание уникального пользователя 200", () => {
        let a = true;
        console.log(usernickname);
        expect(a).toBe(true);
    });
});


