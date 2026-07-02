===============================
ToDo List Manager
===============================

Descrizione:
Applicazione web full-stack per la gestione di liste ToDo.
Permette di creare liste, aggiungere note, modificarle,
eliminarle e segnare le note come completate.


--------------------------------
Funzionalità
--------------------------------
- Creazione liste
- Modifica titolo e descrizione
- Eliminazione liste
- Aggiunta note
- Modifica note (inline)
- Eliminazione note
- Cambio stato note (todo/done)
- Tema dark/light con salvataggio


--------------------------------
Struttura progetto
--------------------------------

Frontend:
- index.html
- style.css
- main.js
- api.js (gestione chiamate API)

Backend:
- server.js (Express)
- db.js (SQLite)


--------------------------------
Database
--------------------------------

Tabelle:

liste:
- id (INTEGER, PK)
- titolo (TEXT, obbligatorio)
- descrizione (TEXT)

note:
- id (INTEGER, PK)
- testo (TEXT, obbligatorio)
- stato (TEXT: 'todo' o 'done')
- fk (INTEGER, riferimento lista)

Relazione:
- 1 lista → molte note


--------------------------------
API disponibili
--------------------------------

Liste:
GET    /liste
GET    /liste-note
POST   /lista
PUT    /lista/:id
DELETE /lista/:id

Note:
POST   /nota
PUT    /nota/:id
PUT    /nota-stato/:id
DELETE /nota/:id


--------------------------------
Avvio progetto
--------------------------------

1. Installare dipendenze:
npm install

2. Avviare server:
node server.js

Server attivo su:
http://localhost:3000

3. Aprire frontend:
Aprire index.html nel browser


--------------------------------
Compatibilità sistemi operativi
--------------------------------

Il progetto è stato sviluppato in ambiente Linux (Ubuntu).

Se si esegue su altri sistemi operativi (Windows/macOS),
è consigliato eliminare le seguenti cartelle/file prima
di installare le dipendenze:

- node_modules
- package-lock.json

Successivamente eseguire:
npm install


--------------------------------
Note tecniche
--------------------------------

- Rendering dinamico con JavaScript
- Uso di fetch tramite api.js
- Database SQLite
- JOIN tra liste e note
- Refresh dati con LoadListe()


--------------------------------
Autore: Vecchioni Tommaso
--------------------------------

Progetto a scopo didattico