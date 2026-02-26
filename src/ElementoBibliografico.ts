import { IExportIEEE } from './IExportable'


export abstract class ElementoBibliografico implements IExportIEEE {
  // atributos public para que tanto las clases hijas y la clase
  // GestorBibliografico puedan acceder a ellos
  /**
   * 
   * @param titulo - cadena de texto del titulo del elemento bibliografico
   * @param autores - array de cadenas de autores
   * @param palabrasClave - palabras clave que describan el elemento bibliografico
   * @param resumen - string resumiendo el elemento bibliografico
   * @param fechaPublicacion - fecha de publicacion de tipo "Date" de typescript para mantener
   * formato de fecha correcto
   * @param nPaginas - cadena que representa el numero de paginas, pudiendo ser un numero o
   * un rango de paginas del elemento bibliografico
   * @param editorial - cadena del nombre de la editorial que llevo a cabo la publicacion
   */
  constructor(
    public readonly titulo: string,
    public readonly autores: string[],
    public readonly palabrasClave: string[],
    public readonly resumen: string, 
    public readonly fechaPublicacion: Date,
    public readonly nPaginas: string,
    public readonly editorial: string
  ) {}

  /**
   * metodo abstracto con el que se obliga a que las clases hijas lo implementen
   * en su formato especifico
   */
  abstract toIEEE(): string
}