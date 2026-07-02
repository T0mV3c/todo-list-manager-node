const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

// GET LISTE E NOTE
app.get("/liste", (req, res) => {
  console.log("GET request received on /liste");
  db.all("SELECT * FROM liste", (err, rows) => {
    if (err) {
      console.log("Error on db: "+ err);
      return res.status(500).json(err);
    }
    res.json(rows);
  });
});

app.get("/liste-note", (req, res) => {
  console.log("GET request received on /liste-note");

  const query = `
    SELECT liste.id AS listaId, liste.titolo, liste.descrizione,
           note.id AS notaId, note.testo, note.stato
    FROM liste
    LEFT JOIN note ON note.fk = liste.id
    ORDER BY liste.id, note.id
  `;

  db.all(query, [], (err, rows) => {
    if (err) {
      console.log("Error on db: "+ err);
      return res.status(500).json(err);
    }

    const result = [];

    rows.forEach(row => {
      let lista = result.find(l => l.id === row.listaId);

      if (!lista) {
        lista = {
          id: row.listaId,
          titolo: row.titolo,
          descrizione: row.descrizione,
          note: []
        };
        result.push(lista);
      }

      if (row.notaId) {
        lista.note.push({
          id: row.notaId,
          testo: row.testo,
          stato: row.stato
        });
      }
    });
    res.json(result);
  });
});

// POST LISTE E NOTE
app.post("/lista", (req, res) => {
  console.log("POST request received on /lista");
  const { titolo } = req.body;
  const { descrizione } = req.body;

  db.run(
    "INSERT INTO liste(titolo, descrizione) VALUES(?, ?)",
    [titolo, descrizione],
    function (err) {
      if (err) return res.status(500).json(err);

      res.json({
        id: this.lastID,
        titolo, descrizione
      });
    }
  );
});

app.post("/nota", (req, res) => {
  console.log("POST request received on /nota");
  const { fk } = req.body;
  const { testo } = req.body;

  db.run(
    "INSERT INTO note(testo, fk) VALUES(?, ?)",
    [testo, fk],
    function (err) {
      if (err) return res.status(500).json(err);

      res.json({
        id: this.lastID,
        testo, fk
      });
    }
  );
})

// DELETE LISTE E NOTE
app.delete("/lista/:id", (req, res) => {
  console.log("DELETE request received on /lista");

  const { id } = req.params;

  db.run("DELETE FROM liste WHERE id = ?", [id], (err) => {
    if (err) {
      console.log("Error on db: "+ err);
      return res.status(500).json(err);
    }
    res.json({deleted: this.changes});
  });
});

app.delete("/nota/:id", (req, res) => {
  console.log("DELETE request received on /nota");

  const { id } = req.params;

  db.run("DELETE FROM note WHERE id = ?", [id], (err) => {
    if (err) {
      console.log("Error on db: "+ err);
      return res.status(500).json(err);
    }
    res.json({deleted: this.changes});
  });
});

// PUT LISTE, NOTE E STATO
app.put("/lista/:id", (req, res) => {
  console.log("PUT request received on /lista");

  const { id } = req.params;
  const { titolo } = req.body;
  const { descrizione } = req.body;

  if (!titolo || titolo === "") {
    return res.status(400).json({err:"Titolo obbligatorio"});
  }

  db.run("UPDATE liste SET titolo = ?, descrizione = ? WHERE id = ?", [titolo, descrizione, id], (err) => {
    
    if (err) {
      console.log("Error on db: "+ err);
      return res.status(500).json(err);
    }
    res.json({updated: this.changes});
  });
});

app.put("/nota/:id", (req, res) => {
  console.log("PUT request received on /nota");

  const { id } = req.params;
  const { testo } = req.body;

  if (!testo || testo === "") {
    return res.status(400).json({err:"Testo obbligatorio"});
  }

  db.run("UPDATE note SET testo = ? WHERE id = ?", [testo, id], (err) => {
    
    if (err) {
      console.log("Error on db: "+ err);
      return res.status(500).json(err);
    }
    res.json({updated: this.changes});
  });
});

app.put("/nota-stato/:id", (req, res) => {
  console.log("PUT request received on /nota-stato");

  const { id } = req.params;
  const { stato } = req.body;

  db.run("UPDATE note SET stato = ? WHERE id = ?", [stato, id], (err) => {
    
    if (err) {
      console.log("Error on db: "+ err);
      return res.status(500).json(err);
    }
    res.json({updated: this.changes});
  });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});