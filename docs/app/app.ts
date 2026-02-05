import {
  Component,
  HostBinding,
  HostListener,
  ElementRef,
  signal,
  ChangeDetectorRef,
  ViewChild,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import PLAYERS from './players';
import { FormsModule } from '@angular/forms';
import { SQUADRE } from './squadre';
import { NgIf, NgForOf, CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, NgIf, NgForOf],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  protected readonly title = signal('first_interfaccia');

  trackBySquadra(index: number, squadra: { nomeSquadra: string }) {
    return squadra.nomeSquadra;
  }

  trackByGiocatore(index: number, giocatore: string) {
    return giocatore;
  }

  input = '';
  playerLive = '---Seleziona Un Giocatore---';
  giocatori: string[] = [];
  squadre: {
    nomeSquadra: string;
    giocatoriPerRuolo: { P: string[]; D: string[]; C: string[]; A: string[] };
    contatore: number;
    creditiIniziali: number;
  }[] = SQUADRE;
  selezionato = false;
  contatore = 0;
  timer = 5;
  attivo = true;
  intervallo: number | null = null;
  aggiunto = false;
  showCard = false;
  contatorePlayer: Record<string, number> = {};

  result = PLAYERS.map((p) => {
    if (typeof p !== 'string') return null;

    // normalizza e split
    const cleaned = p.trim().replace(/\s+/g, ' ');
    const tokens = cleaned.split(' ');

    // estrai team se è l'ultimo token tipo "(CRE)" o "CRE"
    let team = '';
    const last = tokens[tokens.length - 1];
    if (last && (/^\(.+\)$/.test(last) || /^[A-Z]{2,5}$/.test(last))) {
      team = last.replace(/[()]/g, '');
      tokens.pop();
    }

    // token "significativi" (scarta iniziali singole)
    const significant = tokens.filter((t) => t.length > 1);

    // regola: se ci sono più di 3 token originali prendi prime 2 parole, altrimenti prendi 1 (o 2 se ci sono 2 significative)
    let displaySurname = '';
    if (tokens.length > 3) {
      displaySurname = tokens.slice(0, 2).join(' ');
    } else if (significant.length >= 3) {
      displaySurname = significant.slice(0, 1).join(' ');
    } else {
      displaySurname = significant[0] || tokens[0] || '';
    }

    return { original: p, displaySurname: displaySurname.trim(), team };
  });

  playerMap: Record<
    string,
    { original: string; first: string; team: string; displaySurname?: string }
  > = {};

  mappaRuolo = PLAYERS.map((p) => {
    const original = String(p);
    const match = original.match(/\(([PDCA])\)/i); // cerca "(P)", "(D)" ecc.
    const ruolo = match ? (match[1].toUpperCase() as 'P' | 'D' | 'C' | 'A') : undefined;
    return { original: ruolo };
  });

  readonly ruolo: Record<'P' | 'D' | 'C' | 'A', string> = {
    P: 'PORTIERI',
    D: 'DIFENSORI',
    C: 'CENTROCAMPISTI',
    A: 'ATTACCANTI',
  };

  readonly roleLimits: Record<string, number> = { P: 3, D: 8, C: 8, A: 6 };
  roleOrder: ('P' | 'D' | 'C' | 'A')[] = ['P', 'D', 'C', 'A'];

  // apre/chiude il dropdown

  @ViewChild('menuEl', { static: false }) menuEl?: ElementRef;
  @ViewChild('toggleEl', { static: false }) toggleEl?: ElementRef;

  @HostBinding('attr.aria-expanded') ariaExpanded = false;

  toggleSquadre(event?: MouseEvent) {
    event?.preventDefault();
    event?.stopPropagation();
    this.ariaExpanded = !this.ariaExpanded;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    // percorso evento (compatibile con shadow DOM / portali)
    const path: EventTarget[] | undefined = (event as any).composedPath?.();

    const clickedInside = !!(path
      ? (this.menuEl && path.includes(this.menuEl.nativeElement)) ||
        (this.toggleEl && path.includes(this.toggleEl.nativeElement))
      : (this.menuEl && this.menuEl.nativeElement.contains(event.target as Node)) ||
        (this.toggleEl && this.toggleEl.nativeElement.contains(event.target as Node)));

    if (!clickedInside) {
      this.ariaExpanded = false;
    }
  }

  mostra() {
    this.giocatori = PLAYERS.filter((giocatore) =>
      giocatore.toLowerCase().includes(this.input.toLowerCase())
    ).slice(0, 5);
  }

  seleziona(giocatore: string) {
    this.playerLive = giocatore;
    this.input = '';
    this.giocatori = [];
    this.selezionato = true;
    console.log('roleLimits', this.roleLimits);
  }

  cancella() {
    if (this.playerLive != '') {
      this.playerLive = '---Seleziona Un Giocatore---';
      this.input = '';
      this.giocatori = [];
      this.contatore = 0;
    }
  }

  aumenta() {
    this.contatore++;
    this.timer = 5;
  }

  aumentaDieci() {
    this.contatore += 10;
    this.timer = 5;
  }

  diminuisci() {
    this.contatore--;
  }

  start() {
    if (this.intervallo) {
      clearInterval(this.intervallo);
      this.contatore = 0;
    }
    this.attivo = true;
    this.intervallo = setInterval(() => {
      this.timer = Number(this.timer - 1);
      if (this.timer == -1) {
        clearInterval(Number(this.intervallo));
        this.attivo = false;
        this.timer = 5;
        this.showCard = true;
      }
    }, 1000);
  }

  stop() {
    if (this.intervallo) {
      clearInterval(this.intervallo);
    }
  }

  inserisci(nomeSquadra: string, giocatore: string) {
    // ricava il ruolo dal nome del giocatore
    const ruolo = this.playerRoleMap[giocatore];
    this.contatorePlayer[giocatore] = this.contatore;
    const costo = this.contatorePlayer[giocatore];

    if (!ruolo) {
      console.warn('Ruolo non definito per il giocatore:', giocatore);
      return;
    }

    const squadra = this.squadre.find((s) => s.nomeSquadra === nomeSquadra);
    if (!squadra) {
      console.warn('Squadra non trovata:', nomeSquadra);
      return;
    }
    if (squadra.creditiIniziali < costo) {
      alert('pochi crediti');
      return;
    }
    squadra.creditiIniziali -= costo;

    // verifica limite ruolo
    const limite = this.roleLimits[ruolo];
    if (squadra.giocatoriPerRuolo[ruolo].length >= limite) {
      console.warn(`Ruolo ${ruolo} pieno in squadra ${nomeSquadra}`);
      return;
    }

    // aggiungi il giocatore nel ruolo corretto
    squadra.giocatoriPerRuolo[ruolo].push(giocatore);

    // 2) Rimuovi il giocatore dall'array dei giocatori disponibili (PLAYERS)
    //    e aggiorna le strutture derivate (result, playerMap, playerRoleMap).
    //    Se hai normalizzato le chiavi, usa la stessa normalizzazione.
    const idx = PLAYERS.findIndex((p) => p === giocatore);
    if (idx > -1) {
      PLAYERS.splice(idx, 1);
    }

    // assegna punteggio e pulizia stato
    this.contatorePlayer[giocatore] = this.contatore;
    this.contatore = 0;
    this.showCard = false;
    this.giocatori = [];
    this.selezionato = false;
    this.playerLive = '---Seleziona Un Giocatore---';
  }

  close() {
    this.showCard = false;
  }

  aggiudica() {
    // apre l'overlay: ferma il timer e mostra la modal per scegliere la squadra
    if (!this.selezionato || !this.playerLive || this.playerLive === '---Seleziona Un Giocatore---')
      return;

    if (this.intervallo) {
      clearInterval(this.intervallo);
      this.intervallo = null;
    }
    if (this.contatorePlayer[this.playerLive] == undefined) {
      this.contatorePlayer[this.playerLive] = this.contatore;
    }

    this.attivo = false;
    this.showCard = true;
    this.timer = 5;
  }

  ngOnInit() {
    for (const r of this.result) {
      if (!r) continue;
      this.playerMap[r.original] = {
        first: r.displaySurname ?? '',
        displaySurname: r.displaySurname ?? '',
        team: r.team ?? '',
        original: r.original,
      };
    }
    this.mappaRuoloGiocatore();
  }

  createRange(n: number): number[] {
    const count = Math.max(0, Math.floor(Number(n) || 0));
    const result: number[] = [];
    for (let i = 0; i < count; i++) {
      result.push(i);
    }
    return result;
  }

  playerRoleMap: Record<string, 'P' | 'D' | 'C' | 'A' | undefined> = {};

  mappaRuoloGiocatore() {
    for (let i = 0; i < PLAYERS.length; i++) {
      const p = PLAYERS[i];
      const key = (p ?? '').toString().trim();
      const match = key.match(/\(([PDCA])\)/i);
      const value = match ? (match[1].toUpperCase() as 'P' | 'D' | 'C' | 'A') : undefined;
      this.playerRoleMap[key] = value;
    }
  }
}
