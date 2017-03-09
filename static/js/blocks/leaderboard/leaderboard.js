/**
 * Created by tlakatlekutl on 09.03.17.
 */

/*exported LeaderBoard*/

(function () {
    'use strict';

    class LeaderBoard {

        constructor(data) {
            this.drawFunc = window.ldbd_tmpl;
            this.data = data || [];
        }

        // set Data(value) {
        //     this.data = value;
        // }
        //
        // get Data() {
        //     return this.data;
        // }

        render() {
            let parent = document.createElement('div');
            parent.class = 'rating_page';
            parent.id = 'rating_page';
            parent.innerHTML = this.drawFunc({'data':this.data})|| 'error';
            document.body.appendChild(parent);
        }
    }
    window.LeaderBoard = LeaderBoard;
})();