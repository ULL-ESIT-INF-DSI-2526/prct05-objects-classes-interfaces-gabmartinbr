/**
 *
 */
export interface IPaso {
  nombre: string;
  descripcion: string;
  duracion: number;
  etiquetas: string[];
  isOpcional: boolean;
  nCompletado: number;
}

export interface IRecetaTabla {
  Receta: string;
  Chef: string;
  Año: number;
  Pasos: number;
}

interface IPasoTabla {
  Paso: string;
  Receta: string;
  Chef: string;
  Duracion: string; // Ejemplo: "60s"
  Opcional: string; // "Sí" o "No"
}

/**
 *
 */
export class Paso implements IPaso {
  public nCompletado: number = 0;

  constructor(
    public readonly nombre: string,
    public readonly descripcion: string,
    public readonly duracion: number,
    public readonly etiquetas: string[],
    public readonly isOpcional: boolean,
  ) {}

  public completarPaso(): void {
    this.nCompletado++;
  }
}

/**
 *
 */
export class Receta {
  constructor(
    public readonly nombre: string,
    public readonly añoPub: number,
    public readonly pasos: Paso[],
  ) {}

  public numeroPasos(): number {
    return this.pasos.length;
  }

  public tiempoBase(): number {
    let total = 0;
    this.pasos.forEach((paso) => {
      if (!paso.isOpcional) total += paso.duracion;
    });
    return total;
  }

  public tiempoOpcional(): number {
    let total = 0;
    this.pasos.forEach((paso) => {
      total += paso.duracion;
    });
    return total;
  }

  public tiempoTotal(): string | number {
    if (this.tiempoBase() === this.tiempoOpcional()) {
      return this.tiempoBase();
    } else {
      return `${this.tiempoBase()}-${this.tiempoOpcional()}`;
    }
  }
}

/**
 *
 */
export class Chef {
  constructor(
    public readonly nombre: string,
    public readonly seguidores: number,
    public readonly recetario: Receta[],
  ) {}

  infoChef(): void {}
}

/**
 *
 */
export class GestorRecetas {
  constructor(private chefs: Chef[]) {}

  public addChef(newChef: Chef): void {
    if (this.chefs.some((chef) => chef.nombre === newChef.nombre)) {
      console.warn("Este chef ya esta en el sistema");
    } else this.chefs.push(newChef);
  }

  public showInfo(): void {}

  public buscarChef(nombre: string): void {
    const resultados = this.chefs.filter((c) =>
      c.nombre.toLowerCase().includes(nombre.toLowerCase()),
    );

    if (resultados.length > 0) {
      console.table(resultados);
    } else {
      console.log(`No se ha encontrado ningun chef con el nombre ${nombre}`);
    }
  }

  public buscarReceta(nombreBuscar: string): void {
    const resultados: IRecetaTabla[] = [];
    const termino = nombreBuscar.toLowerCase();

    this.chefs.forEach((chef) => {
      chef.recetario.forEach((receta) => {
        if (receta.nombre.toLowerCase().includes(termino)) {
          const fila: IRecetaTabla = {
            Receta: receta.nombre,
            Chef: chef.nombre,
            Año: receta.añoPub,
            Pasos: receta.pasos.length,
          };
          resultados.push(fila);
        }
      });
    });

    if (resultados.length > 0) {
      console.table(resultados);
    } else {
      console.log(`No se encontraron recetas con el nombre: ${nombreBuscar}`);
    }
  }

  public buscarPasos(termino: string): void {
    const resultados: IPasoTabla[] = [];
    const busqueda = termino.toLowerCase();

    // Bucle 1: Recorremos los Chefs
    this.chefs.forEach((chef) => {
      // Bucle 2: Recorremos sus Recetas
      chef.recetario.forEach((receta) => {
        // Bucle 3: Recorremos los Pasos de cada receta
        receta.pasos.forEach((paso) => {
          // Lógica de filtrado: nombre del paso O alguna de sus etiquetas
          const coincideNombre = paso.nombre.toLowerCase().includes(busqueda);
          const coincideTag = paso.etiquetas.some((tag) =>
            tag.toLowerCase().includes(busqueda),
          );

          if (coincideNombre || coincideTag) {
            // Aplanamos la información para la tabla
            resultados.push({
              Paso: paso.nombre,
              Receta: receta.nombre,
              Chef: chef.nombre,
              Duracion: `${paso.duracion}s`,
              Opcional: paso.isOpcional ? "Sí" : "No",
            });
          }
        });
      });
    });

    // Mostrar resultados
    if (resultados.length > 0) {
      console.table(resultados);
    } else {
      console.log(
        `No se encontraron pasos o etiquetas que coincidan con: "${termino}"`,
      );
    }
  }
}
