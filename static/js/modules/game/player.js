/**
 * Created by sergey on 22.04.17.
 */

export default class Player {
  constructor(nickname, score, rating) {
    this.nickname = nickname;
    this.score = score;
    this.rating = rating;
    this.isShield = true;
  }

  getNickname() {
    return this.nickname;
  }

  getScore() {
    return this.score;
  }

  setScore(score) {
    this.score = score;
  }

  getRating() {
    return this.rating;
  }

  checkShield() {
    return this.isShield;
  }

  setShield(shield) {
    this.isShield = shield;
  }

}
