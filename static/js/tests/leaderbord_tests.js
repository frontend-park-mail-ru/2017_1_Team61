/**
 * Created by tlakatlekutl on 06.03.17.
 */

describe("Получение рейтинга пользователей", function() {

    const api = new API();

    it("Получение даннных 200", done => {

        api.getLeaderBoard()
            .then(response => {
                expect(response.status).toBe(200);
                done(true);
            });
        })
});

