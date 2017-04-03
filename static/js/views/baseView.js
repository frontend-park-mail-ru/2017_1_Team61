/**
 * Created by tlakatlekutl on 27.03.17.
 */


(function baseViewFunc() {
  class BaseView {
    constructor(classNames, drawFunc, parent = document.querySelector('main')) {
      const el = document.createElement('div');
      el.hidden = true;
      el.classList.add(...classNames);
      this.drawFunc = drawFunc;
      this.node = el;
      this.parent = parent;
      this.isModal = false;
    }
    render(data) {
      this.setContent(data);
      this.addElemToDOM();
      return this;
    }
    setContent(data) {
      this.node.innerHTML = this.drawFunc(data);
    }
    addElemToDOM() {
      this.parent.appendChild(this.node);
    }
    show() {
      this.node.hidden = false;
    }

    hide() {
      this.node.hidden = true;
    }
  }
  window.BaseView = BaseView;
}());
