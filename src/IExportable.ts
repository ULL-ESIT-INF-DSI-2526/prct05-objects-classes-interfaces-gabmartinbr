/**
 * interfaz que define las condiciones que deben seguir los
 * elementos bibliográficos que tenga que ser representado 
 * en formato IEEE
 */
export interface IExportIEEE {
  /**
   * genera una cadena de texto con la referencia bibliografica
   * siguiendo las normas del estandar IEEE
   * @returns string - referencia formateada
   */
  toIEEE(): string
}