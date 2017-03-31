/**
 * Created by tlakatlekutl on 06.03.17.
 */

/* global describe, it, beforeAll, expect */
/* global API:true, nickname:true, password:true*/
/* global rs:true*/

describe('Проверка смены пароля', () => {
  const api = new API();

  beforeAll((done) => {
    api.logout().then(done(true));
  });

  it('Вход в систему пользователя 200', (done) => {
    const data = {
      password,
      login: nickname,
    };
    api.login(data)
            .then((response) => {
              expect(response.status).toBe(200);
              done(true);
            });
  });

  it('Попытка смены пароля с пустыми полями 400', (done) => {
    const data = {
      'old-password': '',
      password: '',
    };
    api.changePass(data)
            .then((response) => {
              expect(response.status).toBe(400);
              done(true);
            });
  });
  it('Попытка смены пароля с неверным старым паролем 403', (done) => {
    const data = {
      'old-password': `${password}asd`,
      password: 'new_password',
    };
    api.changePass(data)
            .then((response) => {
              expect(response.status).toBe(403);
              done(true);
            });
  });
  it('Смена пароля 200', (done) => {
    const data = {
      'old-password': password,
      password: rs.generate(),
    };
    window.password = data.password;
    api.changePass(data)
            .then((response) => {
              expect(response.status).toBe(200);
              done(true);
            });
  });

  it('Выход из системы 200', (done) => {
    api.logout()
            .then((response) => {
              expect(response.status).toBe(200);
              done(true);
            });
  });

  it('Вход с новым паролем 200', (done) => {
    const data = {
      password,
      login: nickname,
    };
    api.login(data)
            .then((response) => {
              expect(response.status).toBe(200);
              done(true);
            });
  });
});

