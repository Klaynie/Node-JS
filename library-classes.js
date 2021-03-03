class Catalog {
  constructor() {
    this._items = [];
  }

  get items() {
    return this._items;
  }

  set items(items) {
    this._items = items;
  }

  addMedia(media) {
    this._items.push(media);
  }

  removeMedia(guid) {
    let newItems = [];
    this._items.forEach(item => {
      if (item._guid !== guid) {
        newItems.push(item);
      };
    });
    this.items = newItems;
  }
}

class Media {
  constructor(title) {
    this._guid = Media.createGuid();
    this._title = title;
    this._isCheckedOut = false;
    this._ratings = [];
  }

  get guid() {
    return this._guid;
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

  static createGuid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }


  toggleCheckoutStatus() {
    this.isCheckedOut = !this.isCheckedOut;
  }

  addRating(numberIn) {
    let number = Number(numberIn);
    if (isNaN(number)) {
      console.log("Please provide a valid number between 1 and 5");
    } else {
      if (number >= 1 && number <= 5) {
        this.ratings.push(numberIn);
      } else {
        console.log("Rating must be between 1 and 5");
      }
    }
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

class CD extends Media {
  constructor(title, artist, songs) {
    super(title);
    this._artist = artist;
    this._songs = songs;
  }

  get artist() {
    return this._artist;
  }

  get songs() {
    return this._songs;
  }

  shuffle() {
    return this._songs[Math.floor(Math.random() * this._songs.length)];
  }
}

const historyOfEverything = new Book('Bill Bryson', 'A Short History of Nearly Everything', 544)

historyOfEverything.toggleCheckoutStatus();
// console.log(historyOfEverything.isCheckedOut);

historyOfEverything.addRating(4);
historyOfEverything.addRating(5);
historyOfEverything.addRating(5);
historyOfEverything.addRating(10);
historyOfEverything.addRating('A');
// console.log(historyOfEverything.getAverageRating());

const speed = new Movie('Jan de Bont', 'Speed', 116);

speed.toggleCheckoutStatus();
// console.log(speed.isCheckedOut);

speed.addRating(1);
speed.addRating(1);
speed.addRating(5);
// console.log(speed.getAverageRating());

const theGreatWar = new CD(
  'The Great War',
  'Sabaton',
  [
    'The Future of Warfare',
    'Seven Pillars of Wisdom',
    '82nd All the Way',
    'The Attack of the Dead Men',
    'Devil Dogs',
    'The Red Baron',
    'Great War',
    'A Ghost in the Trenches',
    'Fields of Verdun',
    'The End of the War to End All Wars',
    'In Flanders Fields'
  ]
)

console.log(theGreatWar.shuffle());

const my_catalog = new Catalog();

my_catalog.items = [historyOfEverything, speed, theGreatWar];
// my_catalog.removeMedia(speed.guid);
// console.log(my_catalog);
// console.log(historyOfEverything);
// console.log(speed);