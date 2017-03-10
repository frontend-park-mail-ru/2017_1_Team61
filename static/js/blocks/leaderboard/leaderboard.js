/**
 * Created by tlakatlekutl on 09.03.17.
 */

/*exported LeaderBoard*/
/*global API:true*/

(function () {
    'use strict';

    class LeaderBoard {

        constructor(data) {
            this.drawFunc = window.ldbd_tmpl;
            this.data = data || [];
        }

        render() {
            let parent = document.createElement('div');
            parent.class = 'rating_page';
            parent.id = 'rating_page';
            parent.innerHTML = this.drawFunc({'data':this.data})|| 'error';
            document.body.appendChild(parent);
        }
        _getData() {
            const api = new API();
            api.getLeaderBoard()
                .then(response => {
                    return response.json();
                })
                .then(json => {
                    this.data = json;

                    parent.innerHTML = this.drawFunc({'data':this.data})|| 'error';

                })
                .catch(error => {
                    console.error(error);
                });
        }

    }
    window.LeaderBoard = LeaderBoard;
})();