import { ElementoBibliografico } from "./ElementoBibliografico";

export class CapituloLibro extends ElementoBibliografico {
  constructor(
    titulo: string,
    autores: string[],
    palabrasClave: string[],
    resumen: string,
    fechaPublicacion: Date,
    nPaginas: string,
    editorial: string,

    public readonly tituloLibro: string,
    public readonly editor: string[],
    public readonly ciudad: string,
    public readonly pais: string,
  ) {
    super(
      titulo,
      autores,
      palabrasClave,
      resumen,
      fechaPublicacion,
      nPaginas,
      editorial,
    );
  }

  /**
   * requisitos de capitulo de libro en formato IEEE
   * Autor, "Titulo capitulo", en Titulo libro, Editor, ed. Ciudad, Pais: Editorial, Año, pp. pag1-pag10.
   * @returns string de capitulo de libro en formato ieeeº
   */
  toIEEE(): string {
    return `${this.autores.join(", ")}, "${this.titulo}," en ${this.tituloLibro}, ${this.editor.join(", ")}, ed. ${this.ciudad}, ${this.pais}: ${this.editorial}, ${this.fechaPublicacion.getFullYear()}, pp. ${this.nPaginas}.`;
  }
}
