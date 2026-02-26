import { describe, it, expect } from "vitest";
import { ArticuloRevista } from "../src/ArticuloRevista";

describe("Prueba de IEEE con articulo de revista", () => {
  it("prueba articulo revista 1", () => {
    const revistaTest = new ArticuloRevista(
      "Sistemas Distribuidos en TS", // titulo
      ["García, A.", "López, B."], // autores
      ["TS", "Cloud"], // palabrasClave
      "Resumen del artículo...", // resumen
      new Date("2024-05-15"), // fechaPublicacion (Mayo)
      "120-135", // paginas
      "IEEE Press", // editorial
      "Journal of Software Engineering", // nombreRevista
      15, // volumen
      3, // numero
    );

    const resultIEEE = revistaTest.toIEEE();

    expect(resultIEEE).toBe(
      'García, A., López, B., "Sistemas Distribuidos en TS," Journal of Software Engineering, vol. 15, no. 3, pp. 120-135, May. 2024.',
    );
  });
});
