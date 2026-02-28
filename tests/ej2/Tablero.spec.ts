import { describe, it, expect, beforeEach, vi } from "vitest";
import { Celda, Tablero, Juego } from "../../src/ej2/Tablero"; 

describe("Conecta 4 - Pruebas Unitarias Detalladas", () => {
  
  describe("Celda", () => {
    it("debería estar vacía al nacer", () => {
      const celda = new Celda();
      expect(celda.valor).toBeUndefined();
      expect(celda.isOccupied()).toBe(false);
    });

    it("debería detectar cuando se ocupa", () => {
      const celda = new Celda();
      celda.valor = "X";
      expect(celda.isOccupied()).toBe(true);
    });
  });

  describe("Tablero", () => {
    let tablero: Tablero;
    beforeEach(() => { tablero = new Tablero(6, 7); });

    it("ponerFicha(): debería devolver la fila correcta y ocupar la celda", () => {
      const fila = tablero.ponerFicha(0, "X");
      expect(fila).toBe(5); 
      // Verificamos que no solo devuelve el número, sino que la ficha está ahí
      expect(tablero["_rejilla"][5][0].valor).toBe("X");
    });

    it("ponerFicha(): debería avisar y devolver -1 si la columna no existe", () => {
      const spy = vi.spyOn(console, "warn").mockImplementation(() => {});
      expect(tablero.ponerFicha(99, "X")).toBe(-1);
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });

    it("ponerFicha(): debería avisar y devolver -1 si la columna está llena", () => {
      for (let i = 0; i < 6; i++) tablero.ponerFicha(0, "X");
      const spy = vi.spyOn(console, "warn").mockImplementation(() => {});
      expect(tablero.ponerFicha(0, "O")).toBe(-1);
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });

    it("checkTableroLleno(): debería detectar cuando no caben más fichas", () => {
      // Llenamos solo la fila superior (que es la que comprueba el método)
      for (let c = 0; c < 7; c++) {
        for (let f = 0; f < 6; f++) tablero.ponerFicha(c, "X");
      }
      expect(tablero.checkTableroLleno()).toBe(true);
    });

    it("checkGanador(): debería detectar 4 en raya diagonal inversa", () => {
      // Creamos manualmente una diagonal /
      tablero.ponerFicha(3, "X"); // Base
      tablero.ponerFicha(2, "O"); tablero.ponerFicha(2, "X");
      tablero.ponerFicha(1, "O"); tablero.ponerFicha(1, "O"); tablero.ponerFicha(1, "X");
      tablero.ponerFicha(0, "O"); tablero.ponerFicha(0, "O"); tablero.ponerFicha(0, "O"); 
      const filaFin = tablero.ponerFicha(0, "X");

      expect(tablero.checkGanador(filaFin, 0)).toBe(true);
    });
  });

  describe("Juego", () => {
    let juego: Juego;
    beforeEach(() => { juego = new Juego("P1", "P2"); });

    it("jugarTurno(): debería cambiar el turno tras jugada válida", () => {
      const jugadorInicial = juego.turnoActual.nombre;
      juego.jugarTurno(3);
      expect(juego.turnoActual.nombre).not.toBe(jugadorInicial);
    });

    it("jugarTurno(): debería entrar en la lógica de victoria", () => {
      const spy = vi.spyOn(console, "log").mockImplementation(() => {});
      // Simulamos victoria vertical de P1
      juego.jugarTurno(0); juego.jugarTurno(1); // Fila 5
      juego.jugarTurno(0); juego.jugarTurno(1); // Fila 4
      juego.jugarTurno(0); juego.jugarTurno(1); // Fila 3
      juego.jugarTurno(0); // Fila 2 - GANA P1

      expect(juego.juegoTerminado).toBe(true);
      expect(spy).toHaveBeenCalledWith(expect.stringContaining("ha ganado"));
      spy.mockRestore();
    });

    it("jugarTurno(): debería cubrir el aviso de juego ya terminado", () => {
      // Forzamos que el juego termine
      juego["_juegoTerminado"] = true; 
      const spy = vi.spyOn(console, "log").mockImplementation(() => {});
      
      juego.jugarTurno(3);
      
      expect(spy).toHaveBeenCalledWith(expect.stringContaining("ya ha terminado"));
      spy.mockRestore();
    });

    it("jugarTurno(): debería cubrir el aviso de columna inválida/llena", () => {
      const spy = vi.spyOn(console, "log").mockImplementation(() => {});
      // Intentamos en columna inexistente
      juego.jugarTurno(99);
      
      expect(spy).toHaveBeenCalledWith(expect.stringContaining("Movimiento inválido"));
      spy.mockRestore();
    });

    it("jugarTurno(): debería cubrir el caso de empate", () => {
      // Usamos el patrón de empate (zigzag para no ganar)
      const movimientos = [
        0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0,
        2, 3, 2, 3, 2, 3, 3, 2, 3, 2, 3, 2,
        4, 5, 4, 5, 4, 5, 5, 4, 5, 4, 5, 4,
        6, 6, 6, 6, 6, 6
      ];
      const spy = vi.spyOn(console, "log").mockImplementation(() => {});
      
      movimientos.forEach(m => juego.jugarTurno(m));
      
      expect(juego.juegoTerminado).toBe(true);
      expect(spy).toHaveBeenCalledWith(expect.stringContaining("¡Empate!"));
      spy.mockRestore();
    });
  });
});

/**
Cheatsheet spy y mock
El Escenario

Imagina que tienes esta clase sencilla:
TypeScript

export class Calculadora {
  sumar(a: number, b: number): number {
    const resultado = a + b;
    console.log(`El resultado es: ${resultado}`); // <--- Queremos vigilar esto
    return resultado;
  }
}

El Test con Spy

Aquí tienes el ejemplo paso a paso para que lo copies y lo pruebes:
TypeScript

import { describe, it, expect, vi } from "vitest";
import { Calculadora } from "./Calculadora";

describe("Aprendiendo Spies", () => {
  it("debería registrar que se llamó al log con el resultado correcto", () => {
    // 1. PREPARACIÓN
    const calc = new Calculadora();
    
    // CREAMOS EL ESPÍA: "Vigila el objeto 'console' en su método 'log'"
    // .mockImplementation(() => {}) hace que el log NO salga por pantalla
    const miEspia = vi.spyOn(console, "log").mockImplementation(() => {});

    // 2. EJECUCIÓN
    calc.sumar(2, 3);

    // 3. ASERCIÓN (Las preguntas del detective)
    
    // ¿Se llamó al log?
    expect(miEspia).toHaveBeenCalled(); 
    
    // ¿Se llamó exactamente 1 vez?
    expect(miEspia).toHaveBeenCalledTimes(1); 
    
    // ¿El texto que se envió al log era el correcto?
    expect(miEspia).toHaveBeenCalledWith("El resultado es: 5");

    // 4. LIMPIEZA
    // Es vital quitar el espía para que los siguientes tests funcionen normal
    miEspia.mockRestore();
  });
});

¿Qué has aprendido aquí?

    vi.spyOn(objeto, "metodo"): Es como poner un micrófono oculto. El objeto sigue funcionando igual, pero tú te enteras de todo.

    .mockImplementation(() => {}): Es como poner un silenciador. El código cree que está imprimiendo en pantalla, pero tú has desviado esa salida a "la nada" para que tu terminal de tests esté limpia.

    toHaveBeenCalledWith(...): Es la parte más potente. No solo sabes que se habló, sino exactamente qué se dijo.
 */