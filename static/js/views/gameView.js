/**
 * Created by tlakatlekutl on 04.04.17.
 */

/* global BaseView:true */
/* global Router:true */
/* global UserModel:true */


(function gameWindowFunc() {
  const router = new Router();
  class GameView extends BaseView {
    constructor() {
      super(['game-window-container'], window.gameTemplate);
      this.alreadyInDOM = false;
    }
    render() {
      this.node.innerHTML = this.drawFunc();
      this.parent.appendChild(this.node);
      document.querySelector('.game-back-link').addEventListener('click', () => {
        router.go('/');
      });
      window.startGameFunc();
    }
    show() {
      if (!this.alreadyInDOM) {
        this.render();
        this.alreadyInDOM = true;
      }
      const game = document.querySelector('canvas');
      game.hidden = false;
      this.node.hidden = false;
    }
    hide() {
      if (this.alreadyInDOM) {
        // super.destruct();
        const game = document.querySelector('canvas');
        game.hidden = true;
      }
      super.hide();
    }

  }
  this.GameView = GameView;
}());
