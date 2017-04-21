/**
 * Created by tlakatlekutl on 04.04.17.
 */

import ModalView from './modalView';

import template from '../templates/about.pug';

export default class AboutModalView extends ModalView {
  constructor() {
    super('About', template);
  }
}

