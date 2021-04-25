class School {
    constructor(name, level, numberOfStudents) {
        this._name = name;
        this._level = level;
        this._numberOfStudents = numberOfStudents;
    }

    get name() {
        return this._name;
    }
    get level() {
        return this._level;
    }
    get numberOfStudents() {
        return this._numberOfStudents;
    }

    set numberOfStudents(number) {
      if (typeof number === 'number') {
        this.numberOfStudents = number;
      } else {
          console.log('Invalid input: numberOfStudents must be set to a Number.');
      }
    }

    quickFacts() {
        console.log(`${this.name} educates ${this.numberOfStudents} students at the ${this.level} school level.`)
    }

    static pickSubstituteTeacher(substituteTeachers) {
        const index = Math.floor(substituteTeachers.length * Math.random());
        return substituteTeachers[index];
    }
}

class PrimarySchool extends School{
    constructor(name, numberOfStudents, pickupPolicy) {
        super(name, 'primary', numberOfStudents);
        this._pickupPolicy = pickupPolicy;
    }

    get pickupPolicy() {
        return this._pickupPolicy;
    }
}

class HighSchool extends School{
    constructor(name, numberOfStudents, sportsTeams) {
        super(name, 'high', numberOfStudents);
        this._sportsTeams = sportsTeams;
    }

    get sportsTeams() {
        console.log(this._sportsTeams);
        return this._sportsTeams;
    }

}

const lorraineHansbury = new PrimarySchool('Lorrain Hansbury', 514, 'Students must be picked up by a parent, guardian, or a family member over the age of 13');
lorraineHansbury.quickFacts();
console.log(School.pickSubstituteTeacher(['Jamal Crawford', 'Lou Williams', 'J. R. Smith', 'James Harden', 'Jason Terry', 'Manu Ginobli']));

const alSmith = new HighSchool('Ale E. Smith', 415, ['Baseball', 'Basketball', 'Volleyball', 'Track and Field']);
alSmith.sportsTeams;