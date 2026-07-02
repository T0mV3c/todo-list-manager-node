const host = "http://localhost:3000";
let modListaId = null;
const getListeResult = document.getElementById("elenco-liste");
const postListaTitolo = document.getElementById("titoloLista");
const postListaDescrizione = document.getElementById("descrizioneLista");
const postLista = document.getElementById("post-lista");
const updateListaTitolo = document.getElementById("titoloUpdateLista");
const updateListaDescrizione = document.getElementById(
  "descrizioneUpdateLista",
);

const updateLista = document.getElementById("update-lista");

function LoadListe() {
  apiRequest(host + "/liste-note", "GET", {})
    .then((data) => {
      console.log(data);
      getListeResult.innerHTML = "";
      for (const lista of data) {
        const div = document.createElement("div");
        div.classList.add("lista");

        const header = document.createElement("div");
        header.classList.add("lista-header");

        const titolo = document.createElement("h3");
        titolo.innerText = lista.titolo;

        const menu = document.createElement("div");
        menu.classList.add("menu");

        const menuBtn = document.createElement("button");
        menuBtn.classList.add("menu-btn");
        menuBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="25px" height="25px"><path fill="var(--menu)" d="M320 208C289.1 208 264 182.9 264 152C264 121.1 289.1 96 320 96C350.9 96 376 121.1 376 152C376 182.9 350.9 208 320 208zM320 432C350.9 432 376 457.1 376 488C376 518.9 350.9 544 320 544C289.1 544 264 518.9 264 488C264 457.1 289.1 432 320 432zM376 320C376 350.9 350.9 376 320 376C289.1 376 264 350.9 264 320C264 289.1 289.1 264 320 264C350.9 264 376 289.1 376 320z"/></svg>';

        menuBtn.addEventListener("click", function (e) {
          e.stopPropagation();
          dropdown.classList.toggle("show");
        });

        const dropdown = document.createElement("div");
        dropdown.classList.add("menu-dropdown");

        const descrizione = document.createElement("p");
        descrizione.innerText = lista.descrizione;

        header.appendChild(titolo);
        div.appendChild(header);
        div.appendChild(descrizione);

        // TASTO ELIMINA LISTA
        const eliminaListaButton = document.createElement("button");
        eliminaListaButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="25px" height="25px"><path fill="rgb(228, 29, 29)" d="M262.2 48C248.9 48 236.9 56.3 232.2 68.8L216 112L120 112C106.7 112 96 122.7 96 136C96 149.3 106.7 160 120 160L520 160C533.3 160 544 149.3 544 136C544 122.7 533.3 112 520 112L424 112L407.8 68.8C403.1 56.3 391.2 48 377.8 48L262.2 48zM128 208L128 512C128 547.3 156.7 576 192 576L448 576C483.3 576 512 547.3 512 512L512 208L464 208L464 512C464 520.8 456.8 528 448 528L192 528C183.2 528 176 520.8 176 512L176 208L128 208zM288 280C288 266.7 277.3 256 264 256C250.7 256 240 266.7 240 280L240 456C240 469.3 250.7 480 264 480C277.3 480 288 469.3 288 456L288 280zM400 280C400 266.7 389.3 256 376 256C362.7 256 352 266.7 352 280L352 456C352 469.3 362.7 480 376 480C389.3 480 400 469.3 400 456L400 280z"/></svg>';
        eliminaListaButton.addEventListener("click", function () {
          const conferma = confirm ("Sei sicuro di voler eliminare questa lista?");

          if(!conferma) return;

          eliminaLista(lista.id);
        });

        dropdown.appendChild(eliminaListaButton);

        menu.appendChild(menuBtn);
        menu.appendChild(dropdown);
        header.appendChild(menu);

        // TASTO MODIFICA LISTA
        const modificaListaButton = document.createElement("button");
        modificaListaButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="rgb(0, 127, 227)" d="M505 122.9L517.1 135C526.5 144.4 526.5 159.6 517.1 168.9L488 198.1L441.9 152L471 122.9C480.4 113.5 495.6 113.5 504.9 122.9zM273.8 320.2L408 185.9L454.1 232L319.8 366.2C316.9 369.1 313.3 371.2 309.4 372.3L250.9 389L267.6 330.5C268.7 326.6 270.8 323 273.7 320.1zM437.1 89L239.8 286.2C231.1 294.9 224.8 305.6 221.5 317.3L192.9 417.3C190.5 425.7 192.8 434.7 199 440.9C205.2 447.1 214.2 449.4 222.6 447L322.6 418.4C334.4 415 345.1 408.7 353.7 400.1L551 202.9C579.1 174.8 579.1 129.2 551 101.1L538.9 89C510.8 60.9 465.2 60.9 437.1 89zM152 128C103.4 128 64 167.4 64 216L64 488C64 536.6 103.4 576 152 576L424 576C472.6 576 512 536.6 512 488L512 376C512 362.7 501.3 352 488 352C474.7 352 464 362.7 464 376L464 488C464 510.1 446.1 528 424 528L152 528C129.9 528 112 510.1 112 488L112 216C112 193.9 129.9 176 152 176L264 176C277.3 176 288 165.3 288 152C288 138.7 277.3 128 264 128L152 128z"/></svg>';
        modificaListaButton.addEventListener("click", function () {
          modListaId = lista.id;
          updateListaTitolo.value = lista.titolo;
          updateListaDescrizione.value = lista.descrizione;

          toggleUpdateForm();
        });

        dropdown.appendChild(modificaListaButton);

        getListeResult.appendChild(div);

        // CREAZIONE NOTA
        const divNote = document.createElement("div");

        const testoNote = document.createElement("input");
        testoNote.placeholder = "Aggiungi Nota";

        const bottoneAddNota = document.createElement("button");
        bottoneAddNota.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="20px" height="20px"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="rgb(164, 255, 155)" d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z"/></svg>';

        bottoneAddNota.addEventListener("click", function () {
          addNota(lista.id, testoNote.value);
        });

        divNote.appendChild(testoNote);
        divNote.appendChild(bottoneAddNota);

        div.appendChild(divNote);

        // VISUALIZZA NOTE NELLA LISTA
        const listaNote = document.createElement("ul");
        if (lista.note && lista.note.length > 0) {
          lista.note.forEach((nota) => {
            const elNote = document.createElement("li");

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";

            const testoSpan = document.createElement("span");
            testoSpan.innerText = nota.testo;

            if (nota.stato === "done") {
              checkbox.checked = true;
              testoSpan.classList.add("nota-completata");
            }

            checkbox.addEventListener("change", function () {

              if (checkbox.checked) {
                testoSpan.classList.add("nota-completata");
              } else {
                testoSpan.classList.remove("nota-completata");
              }


              const body = {
                stato: checkbox.checked ? "done" : "todo",
              };

              apiRequest(host + "/nota-stato/" + nota.id, "PUT", body)
                .then(() => LoadListe())
                .catch((err) => console.error(err));
            });

            

            elNote.appendChild(checkbox);
            elNote.appendChild(testoSpan);

            //UPDATE NOTA INLINE
            const modificaNotaButton = document.createElement("button");
            modificaNotaButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="25px" height="25px"><path fill="rgb(0, 127, 227)" d="M505 122.9L517.1 135C526.5 144.4 526.5 159.6 517.1 168.9L488 198.1L441.9 152L471 122.9C480.4 113.5 495.6 113.5 504.9 122.9zM273.8 320.2L408 185.9L454.1 232L319.8 366.2C316.9 369.1 313.3 371.2 309.4 372.3L250.9 389L267.6 330.5C268.7 326.6 270.8 323 273.7 320.1zM437.1 89L239.8 286.2C231.1 294.9 224.8 305.6 221.5 317.3L192.9 417.3C190.5 425.7 192.8 434.7 199 440.9C205.2 447.1 214.2 449.4 222.6 447L322.6 418.4C334.4 415 345.1 408.7 353.7 400.1L551 202.9C579.1 174.8 579.1 129.2 551 101.1L538.9 89C510.8 60.9 465.2 60.9 437.1 89zM152 128C103.4 128 64 167.4 64 216L64 488C64 536.6 103.4 576 152 576L424 576C472.6 576 512 536.6 512 488L512 376C512 362.7 501.3 352 488 352C474.7 352 464 362.7 464 376L464 488C464 510.1 446.1 528 424 528L152 528C129.9 528 112 510.1 112 488L112 216C112 193.9 129.9 176 152 176L264 176C277.3 176 288 165.3 288 152C288 138.7 277.3 128 264 128L152 128z"/></svg>';

            modificaNotaButton.addEventListener("click", function () {
              const input = document.createElement("input");
              input.value = nota.testo;
              input.classList.add("modifica-nota-input");

              const salvaButton = document.createElement("button");
              salvaButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" height="25px" width="25px"><path fill="rgb(17, 178, 0)" d="M160 144C151.2 144 144 151.2 144 160L144 480C144 488.8 151.2 496 160 496L480 496C488.8 496 496 488.8 496 480L496 237.3C496 233.1 494.3 229 491.3 226L416 150.6L416 240C416 257.7 401.7 272 384 272L224 272C206.3 272 192 257.7 192 240L192 144L160 144zM240 144L240 224L368 224L368 144L240 144zM96 160C96 124.7 124.7 96 160 96L402.7 96C419.7 96 436 102.7 448 114.7L525.3 192C537.3 204 544 220.3 544 237.3L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 160zM256 384C256 348.7 284.7 320 320 320C355.3 320 384 348.7 384 384C384 419.3 355.3 448 320 448C284.7 448 256 419.3 256 384z"/></svg>';
              salvaButton.classList.add("salva-nota-btn");

              salvaButton.addEventListener("click", function () {
                const body = {
                  testo: input.value,
                };

                apiRequest(host + "/nota/" + nota.id, "PUT", body)
                  .then((data) => {
                    console.log(data);
                    LoadListe();
                  })
                  .catch((err) => console.error(err));
              });

              elNote.innerHTML = "";
              elNote.appendChild(input);
              elNote.appendChild(salvaButton);
            });

            // DELETE NOTA
            const eliminaNotaButton = document.createElement("button");
            eliminaNotaButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="25px" height="25px"><path fill="rgb(228, 29, 29)" d="M262.2 48C248.9 48 236.9 56.3 232.2 68.8L216 112L120 112C106.7 112 96 122.7 96 136C96 149.3 106.7 160 120 160L520 160C533.3 160 544 149.3 544 136C544 122.7 533.3 112 520 112L424 112L407.8 68.8C403.1 56.3 391.2 48 377.8 48L262.2 48zM128 208L128 512C128 547.3 156.7 576 192 576L448 576C483.3 576 512 547.3 512 512L512 208L464 208L464 512C464 520.8 456.8 528 448 528L192 528C183.2 528 176 520.8 176 512L176 208L128 208zM288 280C288 266.7 277.3 256 264 256C250.7 256 240 266.7 240 280L240 456C240 469.3 250.7 480 264 480C277.3 480 288 469.3 288 456L288 280zM400 280C400 266.7 389.3 256 376 256C362.7 256 352 266.7 352 280L352 456C352 469.3 362.7 480 376 480C389.3 480 400 469.3 400 456L400 280z"/></svg>';
            eliminaNotaButton.addEventListener("click", function () {
              const conferma = confirm("Sei sicuro di voler eliminare questa nota?");
              
              if(!conferma) return;
              
              eliminaNota(nota.id);
            });

            elNote.appendChild(modificaNotaButton);
            elNote.appendChild(eliminaNotaButton);
            listaNote.appendChild(elNote);
          });
        }
        div.appendChild(listaNote);
      }
    })
    .catch((error) => console.error(error));
}

LoadListe();

// POST LISTA
postLista.addEventListener("click", () => {
  if (postListaTitolo.value === "") return;

  const body = {
    titolo: postListaTitolo.value,
    descrizione: postListaDescrizione.value,
  };
  apiRequest(host + "/lista", "POST", body)
    .then((data) => {
      console.log(data);
      postListaTitolo.value = "";
      postListaDescrizione.value = "";

      toggleForm();
      LoadListe();
    })
    .catch((error) => console.error(error));
});

// DELETE LISTA E NOTA
function eliminaLista(id) {
  apiRequest(host + "/lista/" + id, "DELETE", {})
    .then((data) => {
      console.log(data);
      LoadListe();
    })
    .catch((error) => console.error(error));
}

function eliminaNota(notaId) {
  apiRequest(host + "/nota/" + notaId, "DELETE", {})
    .then((data) => {
      console.log(data);
      LoadListe();
    })
    .catch((error) => console.error(error));
}

// UPDATE LISTA
updateLista.addEventListener("click", () => {
  if (!modListaId) return;
  if (updateListaTitolo.value === "") return;

  const body = {
    titolo: updateListaTitolo.value,
    descrizione: updateListaDescrizione.value,
  };

  apiRequest(host + "/lista/" + modListaId, "PUT", body)
    .then((data) => {
      updateListaTitolo.value = "";
      updateListaDescrizione.value = "";

      modListaId = null;

      toggleUpdateForm();
      LoadListe();

      console.log(data);
    })
    .catch((error) => console.error(error));
});

// POST NOTA
function addNota(fk, testo) {
  if (!testo) return;

  const body = { fk, testo };

  apiRequest(host + "/nota", "POST", body)
    .then((data) => {
      console.log("Nota aggiunta:", data);
      LoadListe();
    })
    .catch((err) => console.error(err));
}

//Funzionalità stilistiche

function toggleForm() {
  document.getElementById("containerForm").classList.toggle("show");
  document.getElementById("background-scuro").classList.toggle("show");
  document.getElementById("background-scuro").addEventListener("click", function () {
  toggleForm();
  });
}

function toggleUpdateForm() {
  document.getElementById("containerUpdateForm").classList.toggle("show");
  document.getElementById("background-scuro").classList.toggle("show");
  document.getElementById("background-scuro").addEventListener("click", function () {
  toggleUpdateForm();
  });
}

const themeToggle = document.getElementById("theme-toggle");

function updateIcon(theme) {
  themeToggle.innerHTML = theme === "dark" ? '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="40px" height="40px"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="var(--menu)" d="M320 32C328.4 32 336.3 36.4 340.6 43.7L396.1 136.3L500.9 110C509.1 108 517.8 110.4 523.7 116.3C529.6 122.2 532 131 530 139.1L503.7 243.8L596.4 299.3C603.6 303.6 608.1 311.5 608.1 319.9C608.1 328.3 603.7 336.2 596.4 340.5L503.7 396.1L530 500.8C532 509 529.6 517.7 523.7 523.6C517.8 529.5 509 532 500.9 530L396.2 503.7L340.7 596.4C336.4 603.6 328.5 608.1 320.1 608.1C311.7 608.1 303.8 603.7 299.5 596.4L243.9 503.7L139.2 530C131 532 122.4 529.6 116.4 523.7C110.4 517.8 108 509 110 500.8L136.2 396.1L43.6 340.6C36.4 336.2 32 328.4 32 320C32 311.6 36.4 303.7 43.7 299.4L136.3 243.9L110 139.1C108 130.9 110.3 122.3 116.3 116.3C122.3 110.3 131 108 139.2 110L243.9 136.2L299.4 43.6L301.2 41C305.7 35.3 312.6 31.9 320 31.9zM320 176C240.5 176 176 240.5 176 320C176 399.5 240.5 464 320 464C399.5 464 464 399.5 464 320C464 240.5 399.5 176 320 176zM320 416C267 416 224 373 224 320C224 267 267 224 320 224C373 224 416 267 416 320C416 373 373 416 320 416z"/></svg>' : '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="40px" height="40px"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="var(--menu)" d="M320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576C388.8 576 451.3 548.8 497.3 504.6C504.6 497.6 506.7 486.7 502.6 477.5C498.5 468.3 488.9 462.6 478.8 463.4C473.9 463.8 469 464 464 464C362.4 464 280 381.6 280 280C280 207.9 321.5 145.4 382.1 115.2C391.2 110.7 396.4 100.9 395.2 90.8C394 80.7 386.6 72.5 376.7 70.3C358.4 66.2 339.4 64 320 64z"/></svg>';
}

themeToggle.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");

  const newTheme = currentTheme === "dark" ? "light" : "dark";

  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);

  updateIcon(newTheme);
});

const savedTheme = localStorage.getItem("theme") || "dark";

document.documentElement.setAttribute("data-theme", savedTheme);
updateIcon(savedTheme);
