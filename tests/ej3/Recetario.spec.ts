import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Paso, Receta, Chef, GestorRecetas } from '../../src/ej3/Recetario';

// --- TESTS DE LA CLASE PASO ---
describe('Clase Paso', () => {
  it('debería incrementarse nCompletado al llamar a completarPaso', () => {
    const paso = new Paso("Cortar cebolla", "Dados pequeños", 60, ["verdura"], false);
    expect(paso.nCompletado).toBe(0);
    paso.completarPaso(); // Asumiendo que añadiste este método
    expect(paso.nCompletado).toBe(1);
  });
});

// --- TESTS DE LA CLASE RECETA ---
describe('Clase Receta', () => {
  it('debería calcular correctamente el número de pasos', () => {
    const pasos = [
      new Paso("P1", "D1", 10, [], false),
      new Paso("P2", "D2", 20, [], true)
    ];
    const receta = new Receta("Receta Test", 2024, pasos);
    // Si usaste .length directamente en el Gestor, esto se prueba allí
    expect(receta.pasos.length).toBe(2);
  });
});

// --- TESTS DEL GESTOR DE RECETAS ---
describe('GestorRecetas', () => {
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

  describe('addChef', () => {
    it('debería añadir un chef nuevo', () => {
      const chef2 = new Chef("Chef Ana", 100, []);
      gestor.addChef(chef2);
      // Para esto necesitas un getter o método que cuente chefs
      // expect(gestor.getChefs().length).toBe(2); 
    });

    it('debería lanzar un console.warn si el chef ya existe', () => {
      const spy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const chefRepetido = new Chef("Chef Pepe", 0, []);
      
      gestor.addChef(chefRepetido);
      
      expect(spy).toHaveBeenCalledWith("Este chef ya esta en el sistema");
    });
  });

  describe('Búsquedas (Console.table)', () => {
    it('buscarChef debería imprimir una tabla si encuentra resultados', () => {
      const spyTable = vi.spyOn(console, 'table').mockImplementation(() => {});
      gestor.buscarChef("Pepe");
      expect(spyTable).toHaveBeenCalled();
    });

    it('buscarReceta debería imprimir una tabla con los datos aplanados', () => {
      const spyTable = vi.spyOn(console, 'table').mockImplementation(() => {});
      gestor.buscarReceta("Tortilla");
      
      expect(spyTable).toHaveBeenCalled();
      const datos = spyTable.mock.calls[0][0]; // Obtenemos el array enviado a la tabla
      expect(datos[0].Receta).toBe("Tortilla");
      expect(datos[0].Chef).toBe("Chef Pepe");
    });

    it('buscarPasos debería filtrar por etiquetas', () => {
      const spyTable = vi.spyOn(console, 'table').mockImplementation(() => {});
      gestor.buscarPasos("tag1");
      
      expect(spyTable).toHaveBeenCalled();
      const datos = spyTable.mock.calls[0][0];
      expect(datos[0].Paso).toBe("Paso A");
    });

    it('debería mostrar console.log si no hay resultados en búsqueda', () => {
      const spyLog = vi.spyOn(console, 'log').mockImplementation(() => {});
      gestor.buscarReceta("Pizza Inexistente");
      expect(spyLog).toHaveBeenCalled();
    });
  });
});