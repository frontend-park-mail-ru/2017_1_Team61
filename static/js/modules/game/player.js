/**
 * Created by sergey on 22.04.17.
 */

export default class Player {
  constructor(nickname, score, rating) {
    this.nickname = nickname;
    this.score = score;
    this.rating = rating;
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
}