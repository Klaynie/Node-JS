class Media {
  constructor(title) {
    this._title = title;
    this._isCheckedOut = false;
    this._ratings = [];
  }

  get title() {
    return this._title;
  }

  get isCheckedOut() {
    return this._isCheckedOut;
  }

  get ratings() {
    return this._ratings;
  }

  set isCheckedOut(status) {
    this._isCheckedOut = status;
  }

  toggleCheckoutStatus() {
    this.isCheckedOut = !this.isCheckedOut;
  }

  addRating(numberIn) {
    this.ratings.push(numberIn);
  }

  getAverageRating() {
    const totalRatings = this.ratings.reduce(
      (acc, val) => acc + val,
      0
    )
    const averageRating = Math.round(totalRatings / this.ratings.length * 10) / 10
    return averageRating
  }
}

class Book extends Media {
  constructor(title, author, pages) {
    super(title);
    this._author = author;
    this._pages = pages;
  }

  get author() {
    return this._author;
  }

  get pages() {
    return this._pages;
  }
}

class Movie extends Media {
  constructor(title, director, runTime) {
    super(title);
    this._director = director;
    this._runTime = runTime;
  }

  get director() {
    return this._director;
  }

  get runTime() {
    return this._runTime;
  }
}

const historyOfEverything = new Book('Bill Bryson', 'A Short History of Nearly Everything', 544)

historyOfEverything.toggleCheckoutStatus();
console.log(historyOfEverything.isCheckedOut);

historyOfEverything.addRating(4);
historyOfEverything.addRating(5);
historyOfEverything.addRating(5);
console.log(historyOfEverything.getAverageRating());

console.log(historyOfEverything);

const speed = new Movie('Jan de Bont', 'Speed', 116);

speed.toggleCheckoutStatus();
console.log(speed.isCheckedOut);

speed.addRating(1);
speed.addRating(1);
speed.addRating(5);
console.log(speed.getAverageRating());

console.log(speed);