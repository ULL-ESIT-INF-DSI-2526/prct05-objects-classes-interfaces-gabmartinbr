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
}

/**
 * 
 */
export class Receta {
  constructor(
    public readonly nombre: string,
    public readonly añoPub: number,
    public readonly pasos: Paso[]
  ) {}

  public numeroPasos(): number {
    return this.pasos.length
  }

  public tiempoBase(): number {
    let total = 0
    this.pasos.forEach(paso => {
      if(!paso.isOpcional)
      total += paso.duracion
    });
    return total
  }

  public tiempoOpcional(): number {
    let total = 0
    this.pasos.forEach(paso => {
      total += paso.duracion
    });
    return total
  }

  public tiempoTotal(): string | number {
    if(this.tiempoBase === this.tiempoOpcional) {
      return this.tiempoBase()
    } else {
      return `${this.tiempoBase}-${this.tiempoOpcional}`
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

  infoChef(): void {

  }
}

/**
 * 
 */
export class GestorRecetas {
  constructor(private chefs: Chef[]) {}
  
  public addChef(newChef: Chef): void{
    if(this.chefs.some(chef => chef.nombre === newChef.nombre)) {
      console.warn("Este chef ya esta en el sistema")
    } else this.chefs.push(newChef)
  }

  public showInfo(): void {

  }

  public buscarChef(nombre: string): void {
    const resultados = this.chefs.filter(c => c.nombre.toLowerCase().includes(nombre.toLowerCase()))

    if(resultados.length > 0) {
      console.table(resultados)
    } else {
      console.log(`No se ha encontrado ningun chef con el nombre ${nombre}`)
    }
  }

  public buscarReceta(): void {}

  public buscarPasos(): void {}
}