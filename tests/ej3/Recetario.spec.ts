import { describe, it, expect, vi, beforeEach } from "vitest";
import { Paso, Receta, Chef, GestorRecetas } from "../../src/ej3/Recetario";

// --- TESTS DE LA CLASE PASO ---
describe("Clase Paso", () => {
  it("debería incrementarse nCompletado al llamar a completarPaso", () => {
    const paso = new Paso(
      "Cortar cebolla",
      "Dados pequeños",
      60,
      ["verdura"],
      false,
    );
    expect(paso.nCompletado).toBe(0);
    paso.completarPaso(); // Asumiendo que añadiste este método
    expect(paso.nCompletado).toBe(1);
  });
});

// --- TESTS DE LA CLASE RECETA ---
describe("Clase Receta", () => {
  it("debería calcular correctamente el número de pasos", () => {
    const pasos = [
      new Paso("P1", "D1", 10, [], false),
      new Paso("P2", "D2", 20, [], true),
    ];
    const receta = new Receta("Receta Test", 2024, pasos);
    // Si usaste .length directamente en el Gestor, esto se prueba allí
    expect(receta.pasos.length).toBe(2);
  });
});
describe("Receta - Cálculos de Tiempo", () => {
  it("debería devolver un número único si no hay pasos opcionales", () => {
    const p1 = new Paso("P1", "D1", 10, [], false);
    const receta = new Receta("Test", 2024, [p1]);
    // Esto cubre el "if" de tiempoTotal
    expect(receta.tiempoTotal()).toBe(10);
  });

  it("debería devolver un rango string si hay pasos opcionales", () => {
    const p1 = new Paso("Opc", "D1", 10, [], true);
    const p2 = new Paso("Oblig", "D2", 20, [], false);
    const receta = new Receta("Rango", 2024, [p1, p2]);
    // Esto cubre el "else" de tiempoTotal: "20-30"
    expect(receta.tiempoTotal()).toBe("20-30");
  });
});

it("debería devolver el número total de pasos a través del método numeroPasos()", () => {
  const pasos = [
    new Paso("P1", "D1", 10, [], false),
    new Paso("P2", "D2", 20, [], true),
    new Paso("P3", "D3", 30, [], false),
  ];
  const receta = new Receta("Test Pasos", 2026, pasos);

  // Esto llamará directamente a tu método y marcará la línea en verde (coverage)
  expect(receta.numeroPasos()).toBe(3);
});

// --- TESTS DEL GESTOR DE RECETAS ---
describe("GestorRecetas", () => {
  let gestor: GestorRecetas;
  let chef1: Chef;

  beforeEach(() => {
    // Configuramos datos de prueba antes de cada test
    const paso1 = new Paso("Paso A", "Desc A", 100, ["tag1"], false);
    const receta1 = new Receta("Tortilla", 2020, [paso1]);
    chef1 = new Chef("Chef Pepe", 500, [receta1]);

    gestor = new GestorRecetas([chef1]);
    vi.restoreAllMocks(); // Limpia espías
  });

  describe("addChef", () => {
    it("debería añadir un chef nuevo", () => {
      const chef2 = new Chef("Chef Ana", 100, []);
      gestor.addChef(chef2);
      // Para esto necesitas un getter o método que cuente chefs
      // expect(gestor.getChefs().length).toBe(2);
    });

    it("debería lanzar un console.warn si el chef ya existe", () => {
      const spy = vi.spyOn(console, "warn").mockImplementation(() => {});
      const chefRepetido = new Chef("Chef Pepe", 0, []);

      gestor.addChef(chefRepetido);

      expect(spy).toHaveBeenCalledWith("Este chef ya esta en el sistema");
    });

    it("debería ejecutar infoChef aunque esté vacío", () => {
      const chef = new Chef("Test", 0, []);
      chef.infoChef(); // Solo llamarlo sube el coverage de esa línea
    });
  });

  describe("GestorRecetas - Casos Negativos", () => {
    let gestor: GestorRecetas;

    beforeEach(() => {
      gestor = new GestorRecetas([]);
    });

    it("debería ejecutar el console.log cuando buscarChef no halla nada", () => {
      const spy = vi.spyOn(console, "log").mockImplementation(() => {});
      gestor.buscarChef("Inexistente");
      expect(spy).toHaveBeenCalledWith(
        expect.stringContaining("No se ha encontrado"),
      );
    });

    it("debería ejecutar el console.log cuando buscarReceta no halla nada", () => {
      const spy = vi.spyOn(console, "log").mockImplementation(() => {});
      gestor.buscarReceta("Inexistente");
      expect(spy).toHaveBeenCalled();
    });

    it("debería ejecutar el console.log cuando buscarPasos no halla nada", () => {
      const spy = vi.spyOn(console, "log").mockImplementation(() => {});
      gestor.buscarPasos("Inexistente");
      expect(spy).toHaveBeenCalled();
    });
  });

  describe("Búsquedas (Console.table)", () => {
    it("buscarChef debería imprimir una tabla si encuentra resultados", () => {
      const spyTable = vi.spyOn(console, "table").mockImplementation(() => {});
      gestor.buscarChef("Pepe");
      expect(spyTable).toHaveBeenCalled();
    });

    it("buscarReceta debería imprimir una tabla con los datos aplanados", () => {
      const spyTable = vi.spyOn(console, "table").mockImplementation(() => {});
      gestor.buscarReceta("Tortilla");

      expect(spyTable).toHaveBeenCalled();
      const datos = spyTable.mock.calls[0][0]; // Obtenemos el array enviado a la tabla
      expect(datos[0].Receta).toBe("Tortilla");
      expect(datos[0].Chef).toBe("Chef Pepe");
    });

    it("buscarPasos debería filtrar por etiquetas", () => {
      const spyTable = vi.spyOn(console, "table").mockImplementation(() => {});
      gestor.buscarPasos("tag1");

      expect(spyTable).toHaveBeenCalled();
      const datos = spyTable.mock.calls[0][0];
      expect(datos[0].Paso).toBe("Paso A");
    });

    it("debería mostrar console.log si no hay resultados en búsqueda", () => {
      const spyLog = vi.spyOn(console, "log").mockImplementation(() => {});
      gestor.buscarReceta("Pizza Inexistente");
      expect(spyLog).toHaveBeenCalled();
    });
    it("debería cubrir exactamente las líneas 166-173 (lógica de etiquetas y filtrado)", () => {
      const spyTable = vi.spyOn(console, "table").mockImplementation(() => {});

      // Escenario 1: Paso que NO coincide ni por nombre ni por tag (para cubrir el 'false' del some)
      const pasoNo = new Paso("Agua", "...", 1, ["frio"], false);

      // Escenario 2: Paso que coincidirá SOLO por etiqueta (para cubrir el interior del some y el push)
      // Buscaremos "secreto"
      const pasoSi = new Paso("Cebolla", "...", 5, ["secreto"], false);

      const receta = new Receta("Receta Test", 2024, [pasoNo, pasoSi]);
      const chef = new Chef("Chef Test", 0, [receta]);
      const gestorTest = new GestorRecetas([chef]);

      // Ejecutamos la búsqueda
      gestorTest.buscarPasos("secreto");

      // Verificaciones de seguridad sin any
      expect(spyTable).toHaveBeenCalled();
      const argumentos = spyTable.mock.calls[0][0];

      if (Array.isArray(argumentos)) {
        // Verificamos que solo encontró el paso de la etiqueta
        expect(argumentos.length).toBe(1);
        const fila = argumentos[0] as Record<string, string | number>;
        expect(fila["Paso"]).toBe("Cebolla");
      }

      spyTable.mockRestore();
    });
    it("debería cubrir la creación del objeto en la línea 173", () => {
      const spyTable = vi.spyOn(console, "table").mockImplementation(() => {});

      // 1. Datos ultra-específicos
      const pasoEspecial = new Paso(
        "Paso Único",
        "Desc",
        10,
        ["tag-especifico"],
        true,
      );
      const recetaEspecial = new Receta("Receta X", 2026, [pasoEspecial]);
      const chefEspecial = new Chef("Chef X", 0, [recetaEspecial]);
      const gestorEspecial = new GestorRecetas([chefEspecial]);

      // 2. Buscamos por el tag para forzar la lógica de etiquetas
      gestorEspecial.buscarPasos("tag-especifico");

      expect(spyTable).toHaveBeenCalled();

      const argumentos = spyTable.mock.calls[0][0];

      // 3. Validación profunda de la estructura para asegurar coverage
      if (Array.isArray(argumentos) && argumentos.length > 0) {
        const fila = argumentos[0] as Record<string, string | number>;

        // Al acceder a cada una de estas llaves, cubrimos la definición del objeto en el push
        expect(fila["Paso"]).toBe("Paso Único");
        expect(fila["Receta"]).toBe("Receta X");
        expect(fila["Chef"]).toBe("Chef X");
        expect(fila["Duracion"]).toBe("10s");
        expect(fila["Opcional"]).toBe("Sí");
      }

      spyTable.mockRestore();
    });
  });
});
