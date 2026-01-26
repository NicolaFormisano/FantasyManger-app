export const SQUADRE: {
  nomeSquadra: string;
  giocatoriPerRuolo: Record<'P' | 'D' | 'C' | 'A', string[]>;
  contatore: number;
  creditiIniziali: number;
}[] = [
  {
    nomeSquadra: 'Ninety-Nine',
    giocatoriPerRuolo: { P: [], D: [], C: [], A: [] },
    contatore: 0,
    creditiIniziali: 500,
  },
  {
    nomeSquadra: 'Astonbirra',
    giocatoriPerRuolo: { P: [], D: [], C: [], A: [] },
    contatore: 0,
    creditiIniziali: 500,
  },
  {
    nomeSquadra: 'Axel Team',
    giocatoriPerRuolo: { P: [], D: [], C: [], A: [] },
    contatore: 0,
    creditiIniziali: 500,
  },
  {
    nomeSquadra: 'Man City',
    giocatoriPerRuolo: { P: [], D: [], C: [], A: [] },
    contatore: 0,
    creditiIniziali: 500,
  },
  {
    nomeSquadra: 'Corallino 76',
    giocatoriPerRuolo: { P: [], D: [], C: [], A: [] },
    contatore: 0,
    creditiIniziali: 500,
  },
  {
    nomeSquadra: 'Hellas Verona',
    giocatoriPerRuolo: { P: [], D: [], C: [], A: [] },
    contatore: 0,
    creditiIniziali: 500,
  },
  {
    nomeSquadra: 'I Draghi Di Komodo',
    giocatoriPerRuolo: { P: [], D: [], C: [], A: [] },
    contatore: 0,
    creditiIniziali: 500,
  },
  {
    nomeSquadra: 'Il Professore',
    giocatoriPerRuolo: { P: [], D: [], C: [], A: [] },
    contatore: 0,
    creditiIniziali: 500,
  },
  {
    nomeSquadra: 'La Bombonera',
    giocatoriPerRuolo: { P: [], D: [], C: [], A: [] },
    contatore: 0,
    creditiIniziali: 500,
  },
  {
    nomeSquadra: 'Rebels',
    giocatoriPerRuolo: { P: [], D: [], C: [], A: [] },
    contatore: 0,
    creditiIniziali: 500,
  },
  {
    nomeSquadra: 'Scimmietta Impazzita',
    giocatoriPerRuolo: { P: [], D: [], C: [], A: [] },
    contatore: 0,
    creditiIniziali: 500,
  },
  {
    nomeSquadra: 'Tuborg Strong 100',
    giocatoriPerRuolo: { P: [], D: [], C: [], A: [] },
    contatore: 0,
    creditiIniziali: 500,
  },
];

/* input = '';
  playersLive = '--Scegli Calciatore--';
  playerOn = '';
  players: string[] = [];
  squadre: { nomeSquadra: string; giocatori: string[] }[] = SQUADRE;

  contatore: number = 0;
  timer: number = 5;
  intervallo: number | null = null;
  attivo = false;
  show = false;

  ricerca() {
    if (this.input != '') {
      this.players = PLAYERS.filter((giocatore) =>
        giocatore.toLowerCase().includes(this.input.toLowerCase())
      ).slice(0, 5);
    } else {
      this.players = [];
    }
  }

  cancella() {
    this.input = '';
    this.playersLive = '--Scegli Calciatore--';
  }

  seleziona(giocatore: string) {
    this.playersLive = giocatore.toUpperCase();
    this.input = '';
    this.players = [];
    this.timer = 5;
    this.contatore = 0;
  }

  aggiungi() {
    this.contatore++;
    if ((this.attivo = true)) {
      this.timer = 5;
    }
  }

  diminuisci() {
    this.contatore--;
  }

  start() {
    if (this.intervallo) {
      clearInterval(this.intervallo);
    }
    this.attivo = true;
    this.intervallo = setInterval(() => {
      this.timer = Number(this.timer) - 1;
      if (this.timer == -1) {
        clearInterval(Number(this.intervallo));
        this.attivo = false;
        this.timer = 5;
      }
      if (this.timer == 0) {
        this.show = true;
      }
    }, 1000);
  }

  stop() {
    clearInterval(Number(this.intervallo));
    this.timer = 5;
    this.contatore = 0;
  }

  choseTeam(nomeSquadra: string, giocatori: string) {
    const squadra = this.squadre.find((s) => s.nomeSquadra === nomeSquadra);
    if (squadra) {
      squadra.giocatori.push(giocatori + ' (' + this.contatore + ')');
    }
    clearInterval(Number(this.intervallo));
    this.input = '';
    this.players = [];
    this.timer = 5;
    this.contatore = 0;
    this.show = false;
  }

  close() {
    this.show = false;
  }
}*/

/*<div class="container" style="max-width: 1000px">
  <div class="d-flex flex-row gap-4 w-100 align-items-start mt-4">
    <!-- INPUT GROUP -->
    <div class="flex-fill">
      <div class="input-group">
        <span
          class="input-group-text flex-shrink-0"
          id="inputGroup-sizing-default"
          style="width: 130px"
        >
          Cerca Giocatore
        </span>
        <input
          type="text"
          class="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-default"
          [(ngModel)]="input"
          (input)="ricerca()"
        />
        <button
          (click)="cancella()"
          class="btn btn-primary flex-shrink-0"
          style="background-color: black; width: 120px"
        >
          Cancella X
        </button>
      </div>
      <!-- Lista giocatori sotto l'input -->
      <ul class="list-group mt-2">
        @for (player of players; track players) {
        <li (click)="seleziona(player)" class="list-group-item">{{ player }}</li>
        }
      </ul>
    </div>
    <!-- CARD AFFIANCATA -->
    <div class="flex-fill">
      <div class="card text-center">
        <h5 class="card-title p-3 fs-2">{{ playersLive }}</h5>
        <div class="card-body d-flex flex-row gap-3 justify-content-center">
          <div class="border rounded p-3 bg-light flex-fill" style="width: 200px">
            <p class="card-text mb-2 fw-bold">CONTATORE</p>
            <p class="card-text mb-2 fs-1">{{ contatore }}</p>
            <div class="d-flex gap-2 justify-content-center">
              <button (click)="aggiungi()" class="btn btn-outline-primary">+</button>
              <button (click)="diminuisci()" class="btn btn-outline-primary">-</button>
              <button class="btn btn-outline-primary">Aggiudica</button>
            </div>
          </div>
          <div class="border rounded p-3 bg-light flex-fill" style="width: 200px">
            <p class="card-text mb-2 fw-bold">TIMER</p>
            <p class="card-text mb-2 fs-1">{{ timer }}</p>
            <div class="d-flex gap-2 justify-content-center">
              <button (click)="start()" class="btn btn-success">Start</button>
              <button (click)="stop()" class="btn btn-danger">Stop</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- CARD SQUADRE -->
<div class="card text-center mt-3 mx-3">
  <h5 class="card-title p-3 fs-2">SQUADRE</h5>
  <div class="card-body d-flex flex-row gap-3 justify-content-center">
    @for (squadra of squadre; track squadre) {
    <div
      class="border rounded pt-3 bg-light d-flex flex-column align-items-center justify-content-center fw-bold fs-6"
      style="width: 200px"
    >
      <div class="mb-2">{{ squadra.nomeSquadra }}</div>
      <div class="card-title p-1 align-items-center justify-content-center">
        @for (giocatore of squadra.giocatori; track giocatore) {
        <ul class="list-group">
          <li
            class="list-group-item align-items-center text-center"
            style="font-size: x-small; list-style: none"
          >
            {{ giocatore.split(' ').slice(1).join(' ') }}
          </li>
        </ul>

        }
      </div>
    </div>
    }
  </div>
</div>

<!-- MODAL OVERLAY -->
<div class="d-flex justify-content-center align-items-center modal-overlay" *ngIf="show">
  <div
    class="card text-center mt-3 mx-3 d-flex justify-content-center align-items-center"
    style="max-width: 700px"
  >
    <div class="position-relative">
      <button
        (click)="close()"
        type="button"
        class="btn-close mt-2 position-absolute"
        style="top: 10px; right: -320px; font-size: large"
      ></button>
    </div>
    <h5 class="card-title p-3 fs-2">SQUADRE</h5>
    <div class="card-body">
      <div class="row">
        @for (squadra of squadre; track squadre) {
        <div class="col-4 mb-3">
          <button
            (click)="choseTeam(squadra.nomeSquadra, playersLive)"
            class="btn btn-outline-primary w-100"
          >
            {{ squadra.nomeSquadra }}
          </button>
        </div>
        }
      </div>
    </div>
  </div>
</div>*/
