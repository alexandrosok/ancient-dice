const sqlite3 = require('sqlite3').verbose();

// testing

const db = new sqlite3.Database('dice-bet');

db.serialize(() => {
    db.run(`
    CREATE TABLE User (
      id INTEGER PRIMARY KEY,
      name TEXT,
      balance REAL
    )
  `);

    db.run(`
    CREATE TABLE Bet (
      id INTEGER PRIMARY KEY,
      userId INTEGER,
      betAmount REAL,
      chance REAL,
      payout REAL,
      win INTEGER,
      FOREIGN KEY (userId) REFERENCES User(id)
    )
  `);
});

db.close();
