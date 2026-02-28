import { ElementoBibliografico } from "./ElementoBibliografico";

export class GestorBibliografico {
  private _inventario: ElementoBibliografico[] = [];

  // metodo para añadir cualquier cosa que herede de elembiblio
  addElement(elemento: ElementoBibliografico): void {
    this._inventario.push(elemento);
  }
  // metodo para eliminar elemento por indice
  deleteElement(index: number): void {
    if (index >= 0 && index < this._inventario.length) {
      this._inventario.splice(index, 1);
    } else {
      console.warn("el indice introducido no existe en el inventario.");
    }
  }
  // metodo para listar por consola con formato table
  showInventario(): void {
    if (this._inventario.length === 0) {
      console.log("El inventario está vacío");
      return;
    } else {
      console.table(this._inventario, ["titulo", "autores", "editorial"]);
    }
  }

  // exportar todo en formato ieee
  exportToIEEE(): string {
    if (this._inventario.length === 0) {
      return "El inventario está vacío";
    }

    return this._inventario
      .map((elemento, index) => `[${index + 1}] ${elemento.toIEEE()}`)
      .join("\n");
  }

  // busqueda por titulo
  searchByTitle(titulo: string): ElementoBibliografico[] {
    const busqueda = titulo.toLowerCase().trim();

    return this._inventario.filter((elemento) => {
      return elemento.titulo.toLocaleLowerCase().includes(busqueda);
    });
  }

  // busqueda por autor
  searchByAuthor(author: string): ElementoBibliografico[] {
    const busqueda = author.toLowerCase().trim();

    return this._inventario.filter((elemento) => {
      return elemento.autores.some((author) =>
        author.toLowerCase().includes(busqueda),
      );
    });
  }

  // buscar por fecha
  // searchByDate(year: number): ElementoBibliografico[] {
  //   return this._inventario.filter(
  //     (element) => element.fechaPublicacion.getFullYear() === year,
  //   );
  // }

  // buscar por editorial
  searchByEditorial(editorial: string): ElementoBibliografico[] {
    const busqueda = editorial.toLowerCase().trim();

    return this._inventario.filter((element) =>
      element.editorial.toLowerCase().includes(busqueda),
    );
  }
}
