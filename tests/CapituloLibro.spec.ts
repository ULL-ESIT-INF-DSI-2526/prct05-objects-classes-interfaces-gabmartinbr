import { describe, it, expect } from 'vitest';
import { CapituloLibro } from '../src/CapituloLibro';

describe('Pruebas de Formato IEEE - Capítulo de Libro', () => {
  it('debería generar el string siguiendo el formato de capítulo de libro', () => {

    const autores = ["M. Ortega", "J. López"];
    const tituloCap = "Seguridad en Redes";
    const tituloLibro = "Manual de Ciberseguridad";
    const editor = ["G. Ruiz"];
    const ciudad = "Madrid";
    const pais = "España";
    const editorial = "Ra-Ma";
    const fecha = new Date("2024-05-20");
    const paginas = "102-115";

    const capitulo = new CapituloLibro(
      tituloCap, autores, ["seguridad"], "Resumen...", 
      fecha, paginas, editorial, tituloLibro, editor, ciudad, pais
    );

    const resultado = capitulo.toIEEE();

    const esperado = 'M. Ortega, J. López, "Seguridad en Redes," en Manual de Ciberseguridad, G. Ruiz, ed. Madrid, España: Ra-Ma, 2024, pp. 102-115.';
    
    expect(resultado).toBe(esperado);
  });
});