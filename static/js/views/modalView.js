/**
 * Created by tlakatlekutl on 31.03.17.
 */

/* global Router:true */


(function ModalViewFunc() {
  const router = new Router();
  class ModalView {
    constructor(headerText, drawFunc, parent = document.querySelector('main')) {
      this.isModal = true;
      this.parent = parent;
      this.drawFunc = drawFunc;
      this.alreadyInDOM = false;
      this.headerText = headerText;
      // this.generateBase();
    }
    generateBase() {
      this.modal = document.createElement('div');
      this.modal.className = 'modal';

      const content = document.createElement('div');
      content.className = 'modal-content';
      this.modal.appendChild(content);

      const header = document.createElement('div');
      header.className = 'modal-header';
      content.appendChild(header);

      this.close = document.createElement('span');
      this.close.className = 'close';
      this.close.innerHTML = '&times;';
      header.appendChild(this.close);

      const title = document.createElement('h2');
      title.className = 'modal-header-title';
      title.innerHTML = this.headerText;
      header.appendChild(title);

      this.bodyModal = document.createElement('div');
      this.bodyModal.className = 'modal-body';
      content.appendChild(this.bodyModal);
    }
    render(data) {
      this.alreadyInDOM = true;
      this.generateBase();
      this.onClose(() => { router.go('/'); });
      this.bodyModal.innerHTML = this.drawFunc(data);
      this.parent.appendChild(this.modal);
      return this;
    }
    destruct() {
      this.alreadyInDOM = false;
      this.parent.removeChild(this.modal);
    }
    onClose(func) {
      this.close.addEventListener('click', func);
      this.close.addEventListener('click', () => {
        this.modal.style.display = 'none';
      });
      return this;
    }
    show(data) {
      if (!this.alreadyInDOM) {
        this.render(data);
      }
      this.modal.style.display = 'block';
    }
    hide() {
      this.modal.style.display = 'none';
    }
  }
  this.ModalView = ModalView;
}());
