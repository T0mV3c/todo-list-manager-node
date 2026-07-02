const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "../database/database.db");

const db = new sqlite3.Database(dbPath);

db.serialize(() => {

  db.run("PRAGMA foreign_keys = ON");

  db.run(`
    CREATE TABLE IF NOT EXISTS liste (
	    "id"	INTEGER,
	    "titolo"	TEXT NOT NULL,
	    "descrizione"	TEXT,
	    PRIMARY KEY("id" AUTOINCREMENT)
    );
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS note (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      testo TEXT NOT NULL,
      stato TEXT NOT NULL DEFAULT 'todo' CHECK(stato IN ('todo','done')),
      fk INTEGER NOT NULL,
      FOREIGN KEY (fk) REFERENCES liste(id) ON DELETE CASCADE
    );
  `);
});

module.exports = db;
