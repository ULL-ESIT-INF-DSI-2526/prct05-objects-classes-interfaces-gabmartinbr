import { ElementoBibliografico } from "./ElementoBibliografico";

/**
 * clase que representa objeto articulo de revista con el metodo toIEEE con el correspondiente
 * formato requerido para este tipo de elemento bibliografico, añadiendo a la clase abstracta los 
 * atributos nombre de revista, volumen de revista y numero de revista
 */
export class ArticuloRevista extends ElementoBibliografico {
  constructor(
    // atributos clase padre
    titulo: string,
    autores: string[],
    palabrasClave: string[],
    resumen: string,
    fechaPublicacion: Date,
    nPaginas: string,
    editorial: string,

    // atributos especificos de articulo revista
    public readonly nombreRevista: string,
    public readonly volumen: number,
    public readonly nRevista: number,
  ) {
    // llamamos al constructor de la clase padre
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
   * requisitos IEEE para articulo revista, concatenar:
   * - unir en una sola cadena el array de autores, separados por comas: autor1,autor2...
   * - titulo de articulo entre comillas dobles, con una coma antes de cerrar comillas: "titulo,"
   * - nombre de la revista(en cursiva si se puede, con markdown _ o *)
   * - vol. seguido del numero de volumen
   * - no. seguido del numero de la edicion
   * - pp. seguida del rango de paginas separadas por guiones (pp. 12-15)
   * - usar obj Date, extraer el mes abrev con 3 letras con punto final (Jan o ene) y el año completo
   * - unir todo lo anterior con , y espacio, termina en . final
   *
   * Ejemplo de IEEE revista:
   * J. Pérez y M. García, "Avances en el procesamiento de lenguaje natural," Revista de Inteligencia Artificial Aplicada, vol. 12, no. 3, pp. 45-52, Mar. 2024.
   * @returns string de revista en formato ieee
  */
  toIEEE(): string {
    const autoresClean = this.autores.join(", ");
    const month = this.fechaPublicacion.toLocaleString("en-US", {
      month: "short",
    });
    const year = this.fechaPublicacion.getFullYear();
    
    return `${autoresClean}, "${this.titulo}," ${this.nombreRevista}, vol. ${this.volumen}, no. ${this.nRevista}, pp. ${this.nPaginas}, ${month}. ${year}.`;
  }
}
