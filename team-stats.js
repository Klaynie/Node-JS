const team = {
    _players: [
        {
            firstName: 'Pablo',
            lastName: 'Sanchez',
            age: 11
        },
        {
            firstName: 'Larry',
            lastName: 'Fitzgerald',
            age: 10
        },
        {
            firstName: 'Robert',
            lastName: 'Woods',
            age: 12
        }
    ],
    _games: [
        {
            opponent: 'Broncos',
            teamPoints: 42,
            opponentPoints: 27
        },
        {
            opponent: 'Saints',
            teamPoints: 31,
            opponentPoints: 3
        },
        {
            opponent: 'Raiders',
            teamPoints: 32,
            opponentPoints: 31
        }
    ],
    get players() {
        return this._players;
    },
    get games() {
        return this._games;
    },
    addPlayer(firstName, lastName, age) {
        playerIn = {
            firstName: firstName,
            lastName: lastName,
            age: age
        };
        this._players.push(playerIn);
    },
    addGame(opponent, teamPoints, opponentPoints) {
        gameIn = {
            opponent: opponent,
            teamPoints: teamPoints,
            opponentPoints: opponentPoints
        };
        this._games.push(gameIn);
    }
};

team.addPlayer('Steph', 'Curry', 28);
team.addPlayer('Lisa', 'Leslie', 44);
team.addPlayer('Bugs', 'Bunny', 76);
console.log(team.players);

team.addGame('Dolphins', 20, 13);
team.addGame('Chiefs', 22, 16);
team.addGame('Bills', 19, 48);
console.log(team.games);