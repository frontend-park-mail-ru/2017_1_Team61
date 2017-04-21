/**
* Created by tlakatlekutl on 04.04.17.
*/

import API from '../modules/api/api';
import ModalView from './modalView';
import template from '../templates/leaderboard.pug';

const api = new API();

export default class LeaderBoardModal extends ModalView {
  constructor() {
    super('Leaderboard', template);
  }
  render() {
    api.getLeaderBoard()
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        throw new Error('error getting leaderboard');
      })
      .then((json) => {
        console.log(json);
        super.render({ data: json.users });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
