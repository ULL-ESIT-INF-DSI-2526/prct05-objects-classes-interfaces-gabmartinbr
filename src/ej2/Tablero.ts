// tipos
export type Ficha = "X" | "O";
export type ContenidoCelda = Ficha | undefined;

export interface Jugador {
  nombre: string;
  ficha: Ficha;
}
export interface ICel {
  valor: ContenidoCelda;
  isOccupied(): boolean;
}

export class Celda implements ICel {
  public valor: ContenidoCelda = undefined;
  isOccupied(): boolean {
    return this.valor !== undefined;
  }
}

export interface ITablero {
  mostrarTablero(): void;
  ponerFicha(colNum: number, ficha: Ficha): number;
  checkGanador(fil: number, col: number): boolean;
  checkTableroLleno(): boolean;
}

export class Tablero implements ITablero {
  private _rejilla: Celda[][];

  constructor(
    private readonly _filas = 6,
    private readonly _columnas = 7,
  ) {
    this._rejilla = Array.from({ length: this._filas }, () =>
      Array.from({ length: this._columnas }, () => new Celda()),
    );
  }

  // mostrar tablero
  public mostrarTablero(): void {
    this._rejilla.forEach((fila) => {
      const linea = fila.map((celda) => celda.valor || " ").join(" | ");
      console.log(`| ${linea} |`);
    });
    console.log("  0   1   2   3   4   5   6  ");
  }

  // poner ficha
  public ponerFicha(colNum: number, ficha: Ficha): number {
    let filaLibre: number = 5;

    if (colNum < this._columnas && colNum >= 0) {
      while (this._rejilla[filaLibre][colNum].isOccupied()) {
        filaLibre--;
        if (filaLibre < 0) {
          console.warn(`Error: la columna ${colNum} esta llena`);
          return -1; // codigo error para volver a seleccionar columna valida
        }
      }
    } else {
      console.warn(`Error: la columna ${colNum} no es valida`);
      return -1;
    }

    this._rejilla[filaLibre][colNum].valor = ficha;
    return filaLibre;
  }

  public checkTableroLleno(): boolean {
    return this._rejilla[0].every((celda) => celda.isOccupied());
  }

  private contarEnDirecciones(
    fil: number,
    col: number,
    dirFil: number,
    dirCol: number,
  ): number {
    const fichaInicial = this._rejilla[fil][col].valor;
    let contador = 0;
    let f = fil + dirFil;
    let c = col + dirCol;

    while (
      f >= 0 &&
      f < this._filas &&
      c >= 0 &&
      c < this._columnas &&
      this._rejilla[f][c].valor == fichaInicial
    ) {
      contador++;
      f += dirFil;
      c += dirCol;
    }
    return contador;
  }

  public checkGanador(fil: number, col: number): boolean {
    const ejes = [
      { f: 0, c: 1 }, // Horizontal (Derecha/Izquierda)
      { f: 1, c: 0 }, // Vertical (Abajo/Arriba)
      { f: 1, c: 1 }, // Diagonal \ (Abajo-Der / Arriba-Izq)
      { f: 1, c: -1 }, // Diagonal / (Abajo-Izq / Arriba-Der)
    ];
    for (const eje of ejes) {
      const ladoA = this.contarEnDirecciones(fil, col, eje.f, eje.c);

      // 2. Contamos hacia el lado opuesto (ej: izquierda) usando el negativo
      const ladoB = this.contarEnDirecciones(fil, col, -eje.f, -eje.c);

      // 3. Sumamos: Lado A + Lado B + La ficha que acabamos de poner (1)
      if (ladoA + ladoB + 1 >= 4) {
        return true;
      }
    }
    return false;
  }
}

export class Juego {
  private _tablero: Tablero;
  private _jugadores: [Jugador, Jugador];
  private _turno: number;
  private _juegoTerminado: boolean;

  constructor(nombre1: string = "Jugador 1", nombre2: string = "Jugador 2") {
    this._tablero = new Tablero();
    this._jugadores = [
      { nombre: nombre1, ficha: "X" },
      { nombre: nombre2, ficha: "O" },
    ];
    this._turno = 0;
    this._juegoTerminado = false;
  }

  public get turnoActual(): Jugador {
    return this._jugadores[this._turno];
  }

  public get juegoTerminado(): boolean {
    return this._juegoTerminado;
  }

  public jugarTurno(columna: number): void {
    if (this._juegoTerminado) {
      console.log("El juego ya ha terminado. No se pueden realizar más movimientos.");
      return;
    }

    const jugador = this.turnoActual;
    console.log(`Intentando jugada: ${jugador.nombre} (${jugador.ficha}) en columna ${columna}`);

    const fila = this._tablero.ponerFicha(columna, jugador.ficha);

    if (fila === -1) {
      console.log(`Movimiento inválido en la columna ${columna}. Intenta otra.`);
      return;
    }

    this._tablero.mostrarTablero();

    if (this._tablero.checkGanador(fila, columna)) {
      console.log(`¡Felicidades! ${jugador.nombre} ha ganado la partida.`);
      this._juegoTerminado = true;
      return;
    }

    if (this._tablero.checkTableroLleno()) {
      console.log("¡Empate! El tablero está lleno.");
      this._juegoTerminado = true;
      return;
    }

    this._turno = this._turno === 0 ? 1 : 0;
    console.log(`Turno cambiado. Ahora le toca a: ${this.turnoActual.nombre}`);
  }
}