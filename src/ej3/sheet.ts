/**
 * CHEAT SHEET: POO EN TYPESCRIPT
 */

// 1. CLASE ABSTRACTA (El molde base)
// No se puede hacer "new Vehiculo()". Solo sirve para ser heredada.
abstract class Vehiculo {
  // Constructor con atajo: define y asigna la propiedad 'marca' automáticamente
  constructor(public marca: string) {}

  // MÉTODO ABSTRACTO: Obliga a las clases hijas a escribir su propia versión
  abstract arrancar(): void;

  // MÉTODO NORMAL: Las hijas lo heredan tal cual
  detener(): void {
    console.log(`${this.marca} se ha detenido.`);
  }
}

// 2. HERENCIA Y MODIFICADORES DE ACCESO
class Coche extends Vehiculo {
  // Propiedades con modificadores de TypeScript (atajo en constructor)
  // public:   visto desde fuera
  // protected: visto solo por esta clase y sus hijas (como Deportivo)
  // private:   visto SOLO por esta clase
  
  // 3. HARD PRIVATE (#)
  // DEBE declararse fuera del constructor obligatoriamente.
  // Es privacidad REAL en JavaScript, no solo en TypeScript.
  #numeroBastidor: string; 

  private _velocidad: number = 0; // Propiedad interna para el Getter/Setter

  constructor(
    marca: string, 
    public modelo: string,      // Public
    protected tipoMotor: string, // Protected
    private precio: number,      // Private (TS)
    bastidor: string             // Parámetro normal para el #
  ) {
    super(marca); // Llama al constructor del padre (Vehiculo)
    this.#numeroBastidor = bastidor;
  }

  // Implementación obligatoria del método abstracto
  arrancar(): void {
    console.log(`Arrancando el ${this.marca} ${this.modelo} con motor ${this.tipoMotor}...`);
  }

  // 4. GETTERS Y SETTERS
  // Se usan cuando hay LÓGICA al leer o escribir (validaciones)
  
  // GETTER: Se usa como una propiedad: coche.velocidad
  get velocidad(): number {
    return this._velocidad;
  }

  // SETTER: Se usa como una asignación: coche.velocidad = 100
  set velocidad(valor: number) {
    if (valor < 0) {
      console.error("La velocidad no puede ser negativa.");
    } else if (valor > 250) {
      this._velocidad = 250; // Limitador lógico
      console.warn("Velocidad limitada a 250 por seguridad.");
    } else {
      this._velocidad = valor;
    }
  }

  // Método para demostrar el uso del Hard Private interno
  mostrarInfoSecreta(): void {
    console.log(`ID Interno: ${this.#numeroBastidor}`);
  }
}

// 5. CLASE NIETA (Para probar el 'protected')
class Deportivo extends Coche {
  constructor(marca: string, modelo: string, bastidor: string) {
    super(marca, modelo, "V8 Supercharged", 90000, bastidor);
  }

  testProtected(): void {
    // Puedo acceder a tipoMotor porque es 'protected' en el padre
    console.log(`Este deportivo usa: ${this.tipo}`)
  }
}


// tests

import { describe, it, expect, vi, beforeEach } from "vitest";
import { GestorRecetas, Chef, Receta, Paso } from "../../src/ej3/Recetario";

describe("Pruebas de Integración - GestorRecetas", () => {
  let gestor: GestorRecetas;

  // --- CONFIGURACIÓN Y LIMPIEZA ---
  beforeEach(() => {
    // 1. Creamos datos frescos para cada test
    const paso = new Paso("Paso 1", "Desc", 10, ["tag1"], false);
    const receta = new Receta("Tortilla", 2024, [paso]);
    const chef = new Chef("Pepe", 100, [receta]);

    gestor = new GestorRecetas([chef]);

    // 2. IMPORTANTE: Limpiamos todos los espías y mocks anteriores
    // Esto asegura que los contadores de llamadas vuelvan a 0
    vi.restoreAllMocks(); 
  });

  // --- TEST DE CAMINO FELIZ (console.table) ---
  it("debería mostrar una tabla cuando encuentra una receta", () => {
    // Espiamos console.table y evitamos que imprima en la terminal real
    const spyTable = vi.spyOn(console, "table").mockImplementation(() => {});

    gestor.buscarReceta("Tortilla");

    // Comprobamos que se llamó a la tabla
    expect(spyTable).toHaveBeenCalledTimes(1);

    // Recuperamos el primer argumento de la primera llamada: spyTable.mock.calls[vez][argumento]
    const datosTabla = spyTable.mock.calls[0][0];

    // Verificamos el contenido sin usar 'any'
    expect(Array.isArray(datosTabla)).toBe(true);
    if (Array.isArray(datosTabla)) {
      expect(datosTabla[0]).toMatchObject({
        Receta: "Tortilla",
        Chef: "Pepe"
      });
    }
  });

  // --- TEST DE BORDE / ERROR (console.log) ---
  it("debería mostrar un mensaje de error cuando NO encuentra nada", () => {
    // Espiamos console.log
    const spyLog = vi.spyOn(console, "log").mockImplementation(() => {});

    // Buscamos algo que no existe (el famoso "Inexistente")
    gestor.buscarReceta("Pizza de Piña");

    // Verificamos que NO se llamó a la tabla, sino al log de error
    expect(spyLog).toHaveBeenCalledWith(
      expect.stringContaining("No se encontraron recetas")
    );
  });

  // --- TEST DE COMPORTAMIENTO (vi.fn) ---
  it("debería demostrar cómo funciona un mock de función simple", () => {
    const miFuncionFalsa = vi.fn((x: number) => x * 2);

    miFuncionFalsa(5);
    
    expect(miFuncionFalsa).toHaveBeenCalledWith(5);
    expect(miFuncionFalsa).toHaveReturnedWith(10);
  });
});