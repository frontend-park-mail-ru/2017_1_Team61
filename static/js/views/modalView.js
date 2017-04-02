/**
 * Created by tlakatlekutl on 31.03.17.
 */

/* global BaseView:true */


(function ModalViewFunc() {
  class ModalView {
    constructor(headerText, drawFunc, parent = document.querySelector('main')) {
      this.isModal = true;
      this.parent = parent;
      this.drawFunc = drawFunc;
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
      title.innerHTML = headerText;
      header.appendChild(title);

      const bodyModal = document.createElement('div');
      bodyModal.className = 'modal-body';
      bodyModal.innerHTML = drawFunc() || 'error';
      content.appendChild(bodyModal);
    }
    render() {
      this.parent.appendChild(this.modal);
      return this;

    }
    onClose(func) {
      this.close.addEventListener('click', func);
      this.close.addEventListener('click', () => {
        this.modal.style.display = 'none';
      });
      return this;
    }
    show() {
      this.modal.style.display = 'block';
    }
    hide() {
      this.modal.style.display = 'none';
    }
  }
  this.ModalView = ModalView;
}());
