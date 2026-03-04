import { Mascota, estadoSalud } from "./Mascota";

export type nivelesActividad = "bajo" | "medio" | "alto"
export type tiposPelaje = "largo" | "corto"

export class Perro extends Mascota {
    constructor(
        microChip: number,
        nombre: string,
        edad: number,
        peso: number,
        salud: estadoSalud,
        private _raza: string,
        private _pelaje: tiposPelaje,
        private _nivActividad: nivelesActividad
    ) {
        super(microChip, nombre, edad, peso, salud)
    }

    /**
     * getter del tipo de raza del perro
     * @returns string de raza 
     */
    get raza(): string {
        return this._raza
    }

    /**
     * setter de la raza del perro
     * @param raza - string de raza
     */
    set raza(raza: string) {
        this._raza = raza
    }

    /**
     * getter del tipo de pelaje del perro
     * @returns tipo de pelaje corto o largo
     */
    get pelaje(): tiposPelaje {
        return this._pelaje
    }

    /**
     * setter del tipo de pelaje
     * @param pelaje - tipo de pelaje
     */
    set pelaje(pelaje: tiposPelaje) {
        this._pelaje = pelaje
    }

    /**
     * getter del nivel de actividad del perro
     * @returns nivel de actividad alto medio o bajo
     */
    get nivActividad(): nivelesActividad {
        return this._nivActividad
    }

    /**
     * setter del nivel de actividad 
     * @param actividad - nivel de actividad
     */
    set nivActividad(actividad: nivelesActividad) {
        this._nivActividad = actividad
    }

    /**
     * metodo que devuelve la ficha del perro con su informacion
     * @returns string con los atributos del perro
     */
    obtenerFicha(): string {
        return `ID Animal: ${this.microChip}\br, 
        Nombre: ${this.nombre}\br, 
        Edad: ${this.edad}\br, 
        Peso: ${this.peso}\br, 
        Raza: ${this.raza}\br,
        Tipo Pelaje: ${this.pelaje}\br,
        Nivel de Actividad: ${this.nivActividad}\br,
        Estado de Salud: ${this.salud}`
    }
}