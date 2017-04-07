/**
 * Created by tlakatlekutl on 24.03.17.
 */

/* global describe, it, beforeAll, expect */
/* global Router:true */

describe('Проверка роутинга', () => {
  const router = new Router();

  beforeAll(() => {
    router.addRoute(/signup$/, () => { });
    router.addRoute(/game$/, () => { });
    router.addRoute(/leaderboard$/, () => { });
    router.addRoute(/level\/(\d+)$/, () => { });
    router.addRoute(/login$/, () => { });
  });
  it('Проверка определения сложного роута', (done) => {
    expect(router.checkPathExists('/level/22')).toBe(3);
    done(true);
  });
  it('Проверка отсутсвия роута роута', (done) => {
    expect(router.checkPathExists('/level/22a')).toBe(-1);
    done(true);
  });
  it('Проверка not found', (done) => {
    router.set404(() => { console.log('page not found 404'); });
    expect(router.navigate('/logiad')).toBe(router);
    done(true);
  });
});

